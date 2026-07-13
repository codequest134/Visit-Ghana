import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../../components/BottomNav';
import BASE_URL from '../../utils/api';


const FILTERS = [
  'All', 'Historical', 'Wildlife',
  'Beach', 'Cultural', 'Religious', 'Nature',
];

const MapScreen = ({ navigation }) => {
  const [sites, setSites]               = useState([]);
  const [restaurants, setRestaurants]   = useState([]);
  const [loading, setLoading]           = useState(true);
  const [location, setLocation]         = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showRestaurants, setShowRestaurants] = useState(true);

  useEffect(() => {
    loadSites();
    loadRestaurants();
    getLocation();
  }, []);

  const loadSites = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/sites`);
      const data = await response.json();
      setSites(data);
    } catch (err) {
      console.error('Error loading sites:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadRestaurants = async () => {
    try {
      const response = await fetch(`${BASE_URL}/restaurants`);
      const data = await response.json();
      setRestaurants(data);
    } catch (err) {
      console.error('Error loading restaurants:', err);
    }
  };

  const getLocation = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setLocation(loc.coords);
      }
    } catch (err) {
      console.log('Location error:', err);
    }
  };

  const filteredSites = sites.filter((site) =>
    activeFilter === 'All' || site.category === activeFilter
  );

  // Center the map on Ghana by default
  const initialRegion = {
    latitude: 7.9465,
    longitude: -1.0232,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Map & Navigation</Text>
          <Text style={styles.headerSubtitle}>
            {filteredSites.length} sites · {restaurants.length} restaurants
          </Text>
        </View>
      </View>

      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                activeFilter === item && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(item)}
            >
              <Text style={[
                styles.filterChipText,
                activeFilter === item &&
                  styles.filterChipTextActive,
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* The Real Map */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#006B3F" />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
            mapPadding={{ bottom: 80, top: 0, left: 0, right: 0 }}
          >
            {/* Tourist Site Markers */}
            {filteredSites.map((site) => (
              <Marker
                key={`site-${site.siteId}`}
                coordinate={{
                  latitude: parseFloat(site.latitude),
                  longitude: parseFloat(site.longitude),
                }}
                title={site.name}
                description={site.region}
                pinColor={site.color}
                onCalloutPress={() =>
                  navigation.navigate('SiteDetail', { site })}
              />
            ))}

            {/* Restaurant Markers (orange) */}
            {showRestaurants && restaurants.map((restaurant) => (
              <Marker
                key={`restaurant-${restaurant.restaurantId}`}
                coordinate={{
                  latitude: parseFloat(restaurant.latitude),
                  longitude: parseFloat(restaurant.longitude),
                }}
                title={restaurant.name}
                description={`${restaurant.cuisine} · ${restaurant.priceRange}`}
                pinColor="#E65100"
              />
            ))}
          </MapView>

          {/* Restaurant toggle button */}
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowRestaurants(!showRestaurants)}
          >
            <Ionicons
              name="restaurant"
              size={18}
              color={showRestaurants ? '#ffffff' : '#E65100'}
            />
            <Text style={[
              styles.toggleText,
              { color: showRestaurants ? '#ffffff' : '#E65100' },
            ]}>
              {showRestaurants ? 'Hide' : 'Show'} Restaurants
            </Text>
          </TouchableOpacity>

          {/* Info badge */}
          <View style={styles.mapBadge}>
            <Ionicons name="information-circle" size={14} color="#ffffff" />
            <Text style={styles.mapBadgeText}>
              Green = Sites · Orange = Restaurants
            </Text>
          </View>
        </View>
      )}

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} activeRoute="Map" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#006B3F',
    paddingTop: 55,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FCD116',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  filterContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: '#ffffff',
  },
  filterChipActive: {
    backgroundColor: '#006B3F',
    borderColor: '#006B3F',
  },
  filterChipText: {
    fontSize: 13,
    color: '#555555',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#888888',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E65100',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
  },
  mapBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    justifyContent: 'center',
  },
  mapBadgeText: {
    color: '#ffffff',
    fontSize: 12,
  },
});

export default MapScreen;