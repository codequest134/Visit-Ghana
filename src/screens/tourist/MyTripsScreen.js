import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BASE_URL from '../../utils/api';
import { getCurrentUser } from '../../utils/currentUser';

const MyTripsScreen = ({ navigation }) => {
  const [trips, setTrips]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // For now userId is hardcoded as 1
  const user = getCurrentUser();
  const userId = user?.userId || 1;

  useEffect(() => {
    loadTrips();

    // Reload trips whenever the screen comes back into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadTrips();
    });
    return unsubscribe;
  }, [navigation]);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/trips/${userId}`
      );
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      // Show newest first
      setTrips(data.reverse());
      setError(null);
    } catch (err) {
      setError('Could not load your trips.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = (tripId, siteName) => {
    Alert.alert(
      'Remove Trip',
      `Remove ${siteName} from your planned trips?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `${BASE_URL}/trips/${tripId}`,
                { method: 'DELETE' }
              );
              if (response.ok) {
                // Remove it from the list on screen
                setTrips(trips.filter((t) => t.tripId !== tripId));
              } else {
                Alert.alert('Error', 'Could not remove trip.');
              }
            } catch (err) {
              Alert.alert('Error', 'Check your connection.');
            }
          },
        },
      ]
    );
  };

  // Format the date nicely (e.g. "15 Aug 2025")
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-GB', options);
    } catch {
      return dateStr;
    }
  };

  const renderTrip = ({ item }) => (
    <View style={styles.tripCard}>
      {/* Colored left strip */}
      <View style={[styles.tripColorStrip,
        { backgroundColor: item.siteColor || '#1A4A6B' }]}
      />

      <View style={styles.tripContent}>
        <View style={styles.tripTop}>
          <View style={styles.tripInfo}>
            <Text style={styles.tripSiteName}>
              {item.siteName}
            </Text>
            <View style={styles.tripRegionRow}>
              <Ionicons
                name="location-sharp"
                size={13}
                color="#888888"
              />
              <Text style={styles.tripRegion}>
                {item.siteRegion}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => deleteTrip(item.tripId, item.siteName)}
            style={styles.deleteBtn}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color="#CE1126"
            />
          </TouchableOpacity>
        </View>

        {/* Visit date */}
        <View style={styles.dateRow}>
          <Ionicons
            name="calendar"
            size={16}
            color="#006B3F"
          />
          <Text style={styles.dateText}>
            Planned visit: {formatDate(item.visitDate)}
          </Text>
        </View>

        {/* Status badge */}
        <View style={styles.statusBadge}>
          <Ionicons
            name="checkmark-circle"
            size={13}
            color="#006B3F"
          />
          <Text style={styles.statusText}>Planned</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Trips</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#006B3F" />
          <Text style={styles.loadingText}>
            Loading your trips...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Ionicons
            name="warning"
            size={56}
            color="#CE1126"
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadTrips}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : trips.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons
            name="calendar-outline"
            size={56}
            color="#CCCCCC"
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.emptyTitle}>No trips planned</Text>
          <Text style={styles.emptySubtitle}>
            Plan a visit to a site and it will appear here
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Sites')}
          >
            <Text style={styles.browseText}>
              Browse Sites
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.tripId.toString()}
          renderItem={renderTrip}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCD116',
  },
  listContent: {
    padding: 16,
  },
  tripCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  tripColorStrip: {
    width: 8,
  },
  tripContent: {
    flex: 1,
    padding: 16,
  },
  tripTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tripInfo: {
    flex: 1,
  },
  tripSiteName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  tripRegionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tripRegion: {
    fontSize: 13,
    color: '#888888',
  },
  deleteBtn: {
    padding: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E8F5EE',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#006B3F',
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5EE',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#006B3F',
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 14,
    color: '#888888',
    marginTop: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#CE1126',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#006B3F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 24,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#006B3F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  browseText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MyTripsScreen;