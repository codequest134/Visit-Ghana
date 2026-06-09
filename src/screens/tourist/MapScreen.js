import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';

// ── Dummy site data with coordinates ──────────────────────
const SITES = [
  {
    id: '1',
    name: 'Cape Coast Castle',
    region: 'Central Region',
    category: 'Historical',
    color: '#1A4A6B',
    latitude: 5.1054,
    longitude: -1.2466,
    distance: '2.3 km',
  },
  {
    id: '2',
    name: 'Kakum National Park',
    region: 'Central Region',
    category: 'Wildlife',
    color: '#2D6A4F',
    latitude: 5.3500,
    longitude: -1.3833,
    distance: '5.1 km',
  },
  {
    id: '3',
    name: 'Elmina Castle',
    region: 'Central Region',
    category: 'Historical',
    color: '#6B1A1A',
    latitude: 5.0849,
    longitude: -1.3499,
    distance: '3.7 km',
  },
  {
    id: '4',
    name: 'Labadi Beach',
    region: 'Greater Accra',
    category: 'Beach',
    color: '#C0873F',
    latitude: 5.5571,
    longitude: -0.1426,
    distance: '8.2 km',
  },
  {
    id: '5',
    name: 'Mole National Park',
    region: 'Northern Region',
    category: 'Wildlife',
    color: '#6B4A1A',
    latitude: 9.2617,
    longitude: -1.8560,
    distance: '12.4 km',
  },
];

const NEARBY_PLACES = [
  {
    id: '1',
    name: 'Elmina Bay Resort',
    type: 'Hotel',
    distance: '0.8 km',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Baobab Restaurant',
    type: 'Restaurant',
    distance: '1.2 km',
    rating: 4.3,
  },
  {
    id: '3',
    name: 'Cape View Lodge',
    type: 'Hotel',
    distance: '2.1 km',
    rating: 4.6,
  },
  {
    id: '4',
    name: 'The Fish Pot',
    type: 'Restaurant',
    distance: '1.8 km',
    rating: 4.2,
  },
  {
    id: '5',
    name: 'Hans Cottage Botel',
    type: 'Hotel',
    distance: '3.4 km',
    rating: 4.4,
  },
];

const FILTERS = ['All', 'Historical', 'Wildlife', 'Beach', 'Cultural'];

// ── Component ──────────────────────────────────────────────
const MapScreen = ({ navigation }) => {
  const [location, setLocation]         = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab]       = useState('Sites');
  const [selectedSite, setSelectedSite] = useState(null);

  // Get user location on mount
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    setLoadingLocation(true);

    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Location Permission',
        'Allow location access to see sites near you.',
        [{ text: 'OK' }]
      );
      setLoadingLocation(false);
      return;
    }

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    setLocation(loc.coords);
    setLoadingLocation(false);
  };

  // Filter sites by category
  const filteredSites = SITES.filter((site) =>
    activeFilter === 'All' || site.category === activeFilter
  );

  // ── Site List Item ───────────────────────────
  const renderSiteItem = (site) => (
    <TouchableOpacity
      key={site.id}
      style={[
        styles.siteItem,
        selectedSite?.id === site.id && styles.siteItemSelected,
      ]}
      onPress={() => setSelectedSite(site)}
    >
      <View style={[styles.siteColorDot,
        { backgroundColor: site.color }]}
      />
      <View style={styles.siteItemInfo}>
        <Text style={styles.siteItemName}>{site.name}</Text>
        <Text style={styles.siteItemRegion}>
          📍 {site.region}
        </Text>
        <View style={styles.siteItemBadgeRow}>
          <View style={[styles.categoryBadge,
            { backgroundColor: site.color + '22' }]}>
            <Text style={[styles.categoryBadgeText,
              { color: site.color }]}>
              {site.category}
            </Text>
          </View>
          <Text style={styles.distanceText}>
            🚶 {site.distance}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.directionsBtn}
        onPress={() => navigation.navigate(
          'SiteDetail', { site }
        )}
      >
        <Text style={styles.directionsBtnText}>View</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // ── Nearby Place Item ────────────────────────
  const renderNearbyItem = (place) => (
    <TouchableOpacity key={place.id} style={styles.nearbyItem}>
      <View style={[styles.nearbyIconBox, {
        backgroundColor:
          place.type === 'Hotel' ? '#E8F5EE' : '#FFF3E0',
      }]}>
        <Text style={styles.nearbyItemIcon}>
          {place.type === 'Hotel' ? '🏨' : '🍽️'}
        </Text>
      </View>
      <View style={styles.nearbyItemInfo}>
        <Text style={styles.nearbyItemName}>{place.name}</Text>
        <View style={styles.nearbyItemRow}>
          <Text style={styles.nearbyItemType}>{place.type}</Text>
          <Text style={styles.nearbyItemDot}>·</Text>
          <Text style={styles.nearbyItemRating}>
            ★ {place.rating}
          </Text>
        </View>
      </View>
      <Text style={styles.nearbyItemDistance}>
        {place.distance}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Map & Navigation</Text>
          <Text style={styles.headerSubtitle}>
            {loadingLocation
              ? 'Getting your location...'
              : location
              ? '📍 Location found'
              : '📍 Location unavailable'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={getLocation}
        >
          {loadingLocation ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.locationButtonIcon}>🎯</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* ── Map Placeholder ── */}
      <View style={styles.mapPlaceholder}>
        {loadingLocation ? (
          <View style={styles.mapLoading}>
            <ActivityIndicator color="#006B3F" size="large" />
            <Text style={styles.mapLoadingText}>
              Getting your location...
            </Text>
          </View>
        ) : (
          <View style={styles.mapContent}>
            <Text style={styles.mapIcon}>🗺️</Text>
            <Text style={styles.mapPlaceholderTitle}>
              Interactive Map
            </Text>
            <Text style={styles.mapPlaceholderSubtitle}>
              {location
                ? `Your location: ${location.latitude.toFixed(4)}°N, ${location.longitude.toFixed(4)}°E`
                : 'Enable location to see sites near you'}
            </Text>
            {selectedSite && (
              <View style={styles.selectedSitePin}>
                <Text style={styles.selectedSitePinText}>
                  📌 {selectedSite.name}
                </Text>
              </View>
            )}
            <Text style={styles.mapNote}>
              Full interactive map loads when connected to backend
            </Text>
          </View>
        )}
      </View>

      {/* ── Filter Chips ── */}
      <View style={styles.filterRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterChipText,
                activeFilter === filter &&
                  styles.filterChipTextActive,
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ── Tabs ── */}
      <View style={styles.tabsRow}>
        {['Sites', 'Nearby'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.tabActive,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.tabTextActive,
            ]}>
              {tab === 'Sites'
                ? `Sites (${filteredSites.length})`
                : `Nearby (${NEARBY_PLACES.length})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── List ── */}
      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {activeTab === 'Sites'
          ? filteredSites.map(renderSiteItem)
          : NEARBY_PLACES.map(renderNearbyItem)}
        <View style={{ height: 30 }} />
      </ScrollView>

    </View>
  );
};

// ── Styles ─────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  // ── Header ───────────────────────────────────
  header: {
    backgroundColor: '#006B3F',
    paddingTop: 55,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  locationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButtonIcon: {
    fontSize: 22,
  },

  // ── Map Placeholder ───────────────────────────
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#D4EAD0',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C0DFC0',
  },
  mapLoading: {
    alignItems: 'center',
    gap: 12,
  },
  mapLoadingText: {
    fontSize: 14,
    color: '#006B3F',
  },
  mapContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 6,
  },
  mapIcon: {
    fontSize: 40,
    marginBottom: 4,
  },
  mapPlaceholderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  mapPlaceholderSubtitle: {
    fontSize: 12,
    color: '#2D6A4F',
    textAlign: 'center',
  },
  selectedSitePin: {
    backgroundColor: '#006B3F',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 4,
  },
  selectedSitePinText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  mapNote: {
    fontSize: 11,
    color: '#888888',
    marginTop: 4,
  },

  // ── Filters ──────────────────────────────────
  filterRow: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
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

  // ── Tabs ─────────────────────────────────────
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#006B3F',
  },
  tabText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#006B3F',
    fontWeight: '700',
  },

  // ── List ─────────────────────────────────────
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },

  // ── Site Item ────────────────────────────────
  siteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  siteItemSelected: {
    borderColor: '#006B3F',
    backgroundColor: '#F0F9F4',
  },
  siteColorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  siteItemInfo: {
    flex: 1,
    gap: 3,
  },
  siteItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  siteItemRegion: {
    fontSize: 12,
    color: '#888888',
  },
  siteItemBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  distanceText: {
    fontSize: 11,
    color: '#888888',
  },
  directionsBtn: {
    backgroundColor: '#E8F5EE',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  directionsBtnText: {
    fontSize: 12,
    color: '#006B3F',
    fontWeight: '600',
  },

  // ── Nearby Item ──────────────────────────────
  nearbyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  nearbyIconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nearbyItemIcon: { fontSize: 22 },
  nearbyItemInfo: { flex: 1 },
  nearbyItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 3,
  },
  nearbyItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nearbyItemType: {
    fontSize: 12,
    color: '#888888',
  },
  nearbyItemDot: {
    fontSize: 12,
    color: '#888888',
  },
  nearbyItemRating: {
    fontSize: 12,
    color: '#FCA116',
    fontWeight: '600',
  },
  nearbyItemDistance: {
    fontSize: 12,
    color: '#006B3F',
    fontWeight: '600',
  },
});

export default MapScreen;