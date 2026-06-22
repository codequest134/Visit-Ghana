import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../../components/BottomNav';

const BASE_URL = 'http://192.168.100.4:8081/api';

const FILTERS = [
  'All', 'Historical', 'Wildlife',
  'Beach', 'Cultural', 'Religious', 'Nature',
];

const SitesScreen = ({ navigation }) => {
  const [searchText, setSearchText]     = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sites, setSites]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/sites`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setSites(data);
      setError(null);
    } catch (err) {
      setError('Could not load sites. Check your connection and make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const filteredSites = sites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (site.region &&
        site.region.toLowerCase()
          .includes(searchText.toLowerCase()));
    const matchesFilter =
      activeFilter === 'All' || site.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const renderSiteCard = ({ item }) => (
    <TouchableOpacity
      style={styles.siteCard}
      onPress={() =>
        navigation.navigate('SiteDetail', { site: item })}
    >
      <View style={[styles.cardBanner,
        { backgroundColor: item.color || '#1A4A6B' }]}>
        {item.isVerified && (
          <View style={styles.verifiedBadge}>
            <Ionicons
              name="checkmark-circle"
              size={12}
              color="#ffffff"
            />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>
            {item.category}
          </Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.siteName}>{item.name}</Text>
        <View style={styles.siteRegionRow}>
          <Ionicons
            name="location-sharp"
            size={13}
            color="#888888"
          />
          <Text style={styles.siteRegion}>{item.region}</Text>
        </View>
        <Text style={styles.siteDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#FCD116" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>
              ({item.reviewCount} reviews)
            </Text>
          </View>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate('SiteDetail', { site: item })}
          >
            <Text style={styles.viewButtonText}>View</Text>
            <Ionicons
              name="arrow-forward"
              size={14}
              color="#006B3F"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        {navigation.canGoBack() ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
        <Text style={styles.headerTitle}>Tourist Sites</Text>
        <Text style={styles.siteCount}>
          {filteredSites.length} sites
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={18}
            color="#888888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search sites or regions..."
            placeholderTextColor="#aaaaaa"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons
                name="close-circle"
                size={18}
                color="#888888"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                activeFilter === item && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(item)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === item && styles.filterTextActive,
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#006B3F" />
          <Text style={styles.loadingText}>
            Loading sites from server...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Ionicons
            name="warning"
            size={48}
            color="#CE1126"
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadSites}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : filteredSites.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons
            name="search"
            size={48}
            color="#CCCCCC"
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.emptyTitle}>No sites found</Text>
          <Text style={styles.emptySubtitle}>
            Try a different search or filter
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredSites}
          keyExtractor={(item) => item.siteId.toString()}
          renderItem={renderSiteCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} activeRoute="Sites" />
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FCD116',
  },
  siteCount: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  searchContainer: {
    backgroundColor: '#006B3F',
    paddingHorizontal: 20,
    paddingBottom: 16,
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
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
  },
  filterContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    marginRight: 8,
    backgroundColor: '#ffffff',
  },
  filterChipActive: {
    backgroundColor: '#006B3F',
    borderColor: '#006B3F',
  },
  filterText: {
    fontSize: 13,
    color: '#555555',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  siteCard: {
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
  cardBanner: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  verifiedText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  categoryBadge: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  cardContent: {
    padding: 14,
  },
  siteName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  siteRegionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  siteRegion: {
    fontSize: 13,
    color: '#888888',
  },
  siteDescription: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 19,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  reviewCount: {
    fontSize: 12,
    color: '#888888',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5EE',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  viewButtonText: {
    color: '#006B3F',
    fontSize: 13,
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
    lineHeight: 20,
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
  },
});

export default SitesScreen;