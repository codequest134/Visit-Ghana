import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';

// ⬇️ Your backend address
const BASE_URL = 'http://192.168.100.4:8081/api';

const CATEGORIES = [
  { id: '1', name: 'All',        icon: '🌍' },
  { id: '2', name: 'Historical', icon: '🏛️' },
  { id: '3', name: 'Wildlife',   icon: '🐘' },
  { id: '4', name: 'Beach',      icon: '🏖️' },
  { id: '5', name: 'Cultural',   icon: '🎭' },
  { id: '6', name: 'Religious',  icon: '🕌' },
];

const RECENT_PHOTOS = [
  { id: '1', site: 'Cape Coast Castle',   uploader: 'Kwame A.', color: '#1A4A6B' },
  { id: '2', site: 'Kakum National Park', uploader: 'Ama S.',   color: '#2D6A4F' },
  { id: '3', site: 'Labadi Beach',        uploader: 'Kofi M.',  color: '#C0873F' },
  { id: '4', site: 'Elmina Castle',       uploader: 'Abena T.', color: '#6B1A1A' },
];

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [featuredSites, setFeaturedSites]   = useState([]);
  const [loading, setLoading]               = useState(true);

  useEffect(() => {
    loadFeaturedSites();
  }, []);

  const loadFeaturedSites = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/sites`);
      const data = await response.json();
      setFeaturedSites(data.slice(0, 5));
    } catch (err) {
      console.error('Error loading sites:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good day! 👋</Text>
              <Text style={styles.headerTitle}>Explore Ghana</Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.profileInitial}>T</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('Sites')}
            activeOpacity={0.7}
          >
            <Text style={styles.searchIcon}>🔍</Text>
            <Text style={styles.searchInputPlaceholder}>
              Search tourist sites...
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Categories ── */}
        <View style={styles.sectionContainer}>
          <FlatList
            data={CATEGORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  activeCategory === item.name &&
                    styles.categoryChipActive,
                ]}
                onPress={() => {
                  setActiveCategory(item.name);
                  navigation.navigate('Sites');
                }}
              >
                <Text style={styles.categoryIcon}>{item.icon}</Text>
                <Text style={[
                  styles.categoryText,
                  activeCategory === item.name &&
                    styles.categoryTextActive,
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* ── Featured Sites ── */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Sites</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Sites')}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#006B3F"
              style={{ marginVertical: 40 }}
            />
          ) : (
            <FlatList
              data={featuredSites}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.siteId.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.siteCard,
                    { backgroundColor: item.color || '#1A4A6B' }]}
                  onPress={() => navigation.navigate('SiteDetail',
                    { site: item })}
                >
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>
                      {item.category}
                    </Text>
                  </View>
                  <Text style={styles.siteName}>{item.name}</Text>
                  <View style={styles.siteFooter}>
                    <Text style={styles.siteRegion}>
                      📍 {item.region}
                    </Text>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>
                        ★ {item.rating}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* ── Quick Stats ── */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {featuredSites.length > 0 ? '11+' : '...'}
            </Text>
            <Text style={styles.statLabel}>Tourist Sites</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Community Photos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>16</Text>
            <Text style={styles.statLabel}>Regions</Text>
          </View>
        </View>

        {/* ── Community Photos ── */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Community Photos
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.photosGrid}>
            {RECENT_PHOTOS.map((photo) => (
              <TouchableOpacity
                key={photo.id}
                style={[styles.photoCard,
                  { backgroundColor: photo.color }]}
              >
                <View style={styles.photoOverlay}>
                  <Text style={styles.photoSite}>
                    {photo.site}
                  </Text>
                  <Text style={styles.photoUploader}>
                    by {photo.uploader}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Upcoming Events ── */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Upcoming Events
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.eventCard}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDay}>24</Text>
              <Text style={styles.eventMonth}>AUG</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventName}>Homowo Festival</Text>
              <Text style={styles.eventLocation}>
                📍 Greater Accra Region
              </Text>
              <View style={styles.eventBadge}>
                <Text style={styles.eventBadgeText}>Cultural</Text>
              </View>
            </View>
            <Text style={styles.eventArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.eventCard}>
            <View style={[styles.eventDate,
              { backgroundColor: '#1A4A6B' }]}>
              <Text style={styles.eventDay}>12</Text>
              <Text style={styles.eventMonth}>SEP</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventName}>
                Chale Wote Festival
              </Text>
              <Text style={styles.eventLocation}>
                📍 Accra, James Town
              </Text>
              <View style={[styles.eventBadge,
                { backgroundColor: '#E3F0FF' }]}>
                <Text style={[styles.eventBadgeText,
                  { color: '#1A4A6B' }]}>
                  Arts
                </Text>
              </View>
            </View>
            <Text style={styles.eventArrow}>›</Text>
          </TouchableOpacity>

        </View>

        <View style={{ height: 100 }} />

      </ScrollView>

      {/* ── Bottom Navigation ── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>🏠</Text>
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Sites')}
        >
          <Text style={styles.navIcon}>🏛️</Text>
          <Text style={styles.navLabel}>Sites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.navIcon}>🗺️</Text>
          <Text style={styles.navLabel}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Upload')}
        >
          <Text style={styles.navIcon}>📸</Text>
          <Text style={styles.navLabel}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#006B3F',
    paddingTop: 55,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FCD116',
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FCD116',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInputPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: '#aaaaaa',
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  seeAllText: {
    fontSize: 13,
    color: '#006B3F',
    fontWeight: '600',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  categoryChipActive: {
    backgroundColor: '#006B3F',
    borderColor: '#006B3F',
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 13,
    color: '#555555',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  siteCard: {
    width: 220,
    height: 140,
    borderRadius: 16,
    marginRight: 14,
    padding: 16,
    justifyContent: 'space-between',
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  categoryBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  siteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 22,
  },
  siteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  siteRegion: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
  },
  ratingBadge: {
    backgroundColor: '#FCD116',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006B3F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#888888',
    textAlign: 'center',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoCard: {
    width: '48%',
    height: 110,
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
  photoOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 8,
  },
  photoSite: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  photoUploader: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
  eventDate: {
    backgroundColor: '#006B3F',
    borderRadius: 10,
    width: 48,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  eventDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCD116',
    lineHeight: 22,
  },
  eventMonth: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 6,
  },
  eventBadge: {
    backgroundColor: '#E8F5EE',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  eventBadgeText: {
    fontSize: 11,
    color: '#006B3F',
    fontWeight: '600',
  },
  eventArrow: {
    fontSize: 22,
    color: '#CCCCCC',
    marginLeft: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 22,
    marginBottom: 3,
    opacity: 0.4,
  },
  navIconActive: {
    fontSize: 22,
    marginBottom: 3,
  },
  navLabel: {
    fontSize: 10,
    color: '#888888',
  },
  navLabelActive: {
    fontSize: 10,
    color: '#006B3F',
    fontWeight: '600',
  },
});

export default HomeScreen;