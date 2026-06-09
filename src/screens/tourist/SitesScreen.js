import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';

// ── Dummy Data ─────────────────────────────────────────────
const ALL_SITES = [
  {
    id: '1',
    name: 'Cape Coast Castle',
    region: 'Central Region',
    category: 'Historical',
    rating: 4.8,
    reviews: 320,
    color: '#1A4A6B',
    verified: true,
    description: 'A UNESCO World Heritage Site and one of the most important slave castles built along the Ghanaian coast.',
  },
  {
    id: '2',
    name: 'Kakum National Park',
    region: 'Central Region',
    category: 'Wildlife',
    rating: 4.7,
    reviews: 210,
    color: '#2D6A4F',
    verified: true,
    description: 'Famous for its canopy walkway suspended 30 metres above the forest floor.',
  },
  {
    id: '3',
    name: 'Mole National Park',
    region: 'Northern Region',
    category: 'Wildlife',
    rating: 4.6,
    reviews: 180,
    color: '#6B4A1A',
    verified: true,
    description: "Ghana's largest wildlife sanctuary, home to elephants, buffalo, and over 300 bird species.",
  },
  {
    id: '4',
    name: 'Elmina Castle',
    region: 'Central Region',
    category: 'Historical',
    rating: 4.7,
    reviews: 290,
    color: '#6B1A1A',
    verified: true,
    description: 'The oldest European building in sub-Saharan Africa, built by the Portuguese in 1482.',
  },
  {
    id: '5',
    name: 'Labadi Beach',
    region: 'Greater Accra',
    category: 'Beach',
    rating: 4.3,
    reviews: 150,
    color: '#C0873F',
    verified: true,
    description: 'The most popular beach in Accra, known for its lively atmosphere and weekend entertainment.',
  },
  {
    id: '6',
    name: 'Larabanga Mosque',
    region: 'Northern Region',
    category: 'Religious',
    rating: 4.5,
    reviews: 95,
    color: '#4A1A6B',
    verified: true,
    description: 'One of the oldest mosques in West Africa, built in the Sudanese architectural style.',
  },
  {
    id: '7',
    name: 'Wli Waterfalls',
    region: 'Volta Region',
    category: 'Nature',
    rating: 4.8,
    reviews: 175,
    color: '#1A6B5A',
    verified: true,
    description: 'The highest waterfall in West Africa, located near the border with Togo.',
  },
  {
    id: '8',
    name: 'Manhyia Palace',
    region: 'Ashanti Region',
    category: 'Cultural',
    rating: 4.6,
    reviews: 140,
    color: '#8B6914',
    verified: true,
    description: 'The official residence of the Asantehene, the paramount chief of the Ashanti people.',
  },
];

const FILTERS = [
  'All', 'Historical', 'Wildlife',
  'Beach', 'Cultural', 'Religious', 'Nature',
];

// ── Component ──────────────────────────────────────────────
const SitesScreen = ({ navigation }) => {
  const [searchText, setSearchText]       = useState('');
  const [activeFilter, setActiveFilter]   = useState('All');

  // Filter sites based on search and category
  const filteredSites = ALL_SITES.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchText.toLowerCase()) ||
      site.region.toLowerCase().includes(searchText.toLowerCase());

    const matchesFilter =
      activeFilter === 'All' || site.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // ── Site Card ────────────────────────────────
  const renderSiteCard = ({ item }) => (
    <TouchableOpacity
      style={styles.siteCard}
      onPress={() => navigation.navigate('SiteDetail', { site: item })}
    >
      {/* Colour banner */}
      <View style={[styles.cardBanner, { backgroundColor: item.color }]}>
        {item.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓ Verified</Text>
          </View>
        )}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{item.category}</Text>
        </View>
      </View>

      {/* Card content */}
      <View style={styles.cardContent}>
        <Text style={styles.siteName}>{item.name}</Text>

        <Text style={styles.siteRegion}>📍 {item.region}</Text>

        <Text style={styles.siteDescription} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>
              ({item.reviews} reviews)
            </Text>
          </View>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate('SiteDetail', { site: item })
            }
          >
            <Text style={styles.viewButtonText}>View →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tourist Sites</Text>
        <Text style={styles.siteCount}>
          {filteredSites.length} sites
        </Text>
      </View>

      {/* ── Search ── */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search sites or regions..."
            placeholderTextColor="#aaaaaa"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ── Category Filters ── */}
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
              <Text
                style={[
                  styles.filterText,
                  activeFilter === item && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* ── Sites List ── */}
      {filteredSites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>No sites found</Text>
          <Text style={styles.emptySubtitle}>
            Try a different search or filter
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredSites}
          keyExtractor={(item) => item.id}
          renderItem={renderSiteCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backArrow: {
    fontSize: 24,
    color: '#ffffff',
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

  // ── Search ───────────────────────────────────
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
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
  },
  clearText: {
    fontSize: 14,
    color: '#888888',
    paddingHorizontal: 4,
  },

  // ── Filters ──────────────────────────────────
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

  // ── List ─────────────────────────────────────
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },

  // ── Site Card ────────────────────────────────
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
  siteRegion: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 8,
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
  },
  starIcon: {
    color: '#FCD116',
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#888888',
  },
  viewButton: {
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

  // ── Empty State ───────────────────────────────
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
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