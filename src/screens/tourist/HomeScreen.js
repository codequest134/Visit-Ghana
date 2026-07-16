import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../../components/BottomNav';

// ⬇️ Your backend address
const BASE_URL = 'https://visitghana-api.onrender.com/api';

const CATEGORIES = [
  { id: '1', name: 'All' },
  { id: '2', name: 'Historical' },
  { id: '3', name: 'Wildlife' },
  { id: '4', name: 'Beach' },
  { id: '5', name: 'Cultural' },
  { id: '6', name: 'Religious' },
];

const FESTIVALS = [
  {
    id: '1',
    name: 'Homowo Festival',
    day: '24',
    month: 'AUG',
    fullDate: '24 August 2025',
    location: 'Greater Accra Region',
    duration: '1 Day',
    category: 'Cultural',
    color: '#006B3F',
    description:
      'Homowo is a harvest festival celebrated by the Ga people of Greater Accra. The name means "hooting at hunger" and commemorates a time when the Ga people overcame a great famine. It is one of the most vibrant and meaningful celebrations in Ghana, marked by the sprinkling of kpokpoi (a traditional festival food) and joyful processions through the streets.',
    highlights: [
      'Traditional kpokpoi food sharing',
      'Colorful street processions and drumming',
      'Twin celebrations and family reunions',
      'Traditional Ga durbar of chiefs',
    ],
    tip: 'Arrive early in the morning to witness the traditional rituals. Dress respectfully and ask permission before taking photos of the chiefs.',
  },
  {
    id: '2',
    name: 'Chale Wote Festival',
    day: '12',
    month: 'SEP',
    fullDate: '12 September 2025',
    location: 'Accra, James Town',
    duration: '1 Week',
    category: 'Arts',
    color: '#1A4A6B',
    description:
      'Chale Wote Street Art Festival is an annual alternative arts festival that takes place in the historic James Town district of Accra. It brings together painting, graffiti, photography, music, dance, street performances, and fashion. The festival transforms the streets into an open-air gallery and is a celebration of African creativity and urban culture.',
    highlights: [
      'Live street art and graffiti murals',
      'Music performances and DJ sets',
      'Fashion shows and art installations',
      'Food vendors and local craft markets',
    ],
    tip: 'Wear comfortable shoes as you will be walking a lot. Bring cash for the food stalls and local art you may want to buy.',
  },
];

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [featuredSites, setFeaturedSites]   = useState([]);
  const [loading, setLoading]               = useState(true);
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    loadFeaturedSites();
    loadFestivals();
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

  const loadFestivals = async () => {
  try {
    const response = await fetch(`${BASE_URL}/festivals`);
    const data = await response.json();
    setFestivals(data);
  } catch (err) {
    console.error('Error loading festivals:', err);
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
              <Text style={styles.greeting}>Good day!</Text>
              <Text style={styles.headerTitle}>Explore Ghana</Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Ionicons name="person" size={20} color="#006B3F" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('Sites')}
            activeOpacity={0.7}
          >
            <Ionicons
              name="search"
              size={18}
              color="#888888"
              style={styles.searchIcon}
            />
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
                  style={styles.siteCard}
                  onPress={() => navigation.navigate('SiteDetail',
                    { site: item })}
                >
                   <ImageBackground
                     source={{ uri: item.imageUrl }}
                     style={[styles.siteCardBg,
                      { backgroundColor: item.color || '#1A4A6B' }]}
                     imageStyle={styles.siteCardImage}
                    >
                      <View style={styles.siteCardOverlay}>
                        <View style={styles.categoryBadge}>
                          <Text style={styles.categoryBadgeText}>
                            {item.category}
                          </Text>
                        </View>
                        <Text style={styles.siteName}>{item.name}</Text>
                        <View style={styles.siteFooter}>
                         <View style={styles.siteRegionRow}>
                           <Ionicons
                              name="location-sharp"
                              size={12}
                              color="rgba(255,255,255,0.85)"
                            />
                            <Text style={styles.siteRegion}>
                              {item.region}
                            </Text>
                          </View>
                          <View style={styles.ratingBadge}>
                            <Ionicons name="star" size={11} color="#1A1A1A" />
                            <Text style={styles.ratingText}>
                              {item.rating}
                            </Text>
                          </View>
                        </View>
                      </View>  
                    </ImageBackground>  
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
            <Text style={styles.statNumber}>1K+</Text>
            <Text style={styles.statLabel}>Community Photos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>16</Text>
            <Text style={styles.statLabel}>Regions</Text>
          </View>
        </View>

        {/* ── Upcoming Events ── */}
<View style={styles.sectionContainer}>
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>
      Upcoming Events
    </Text>
  </View>

  {festivals.length === 0 ? (
    <ActivityIndicator size="small" color="#006B3F" />
  ) : (
    festivals.map((festival) => (
      <TouchableOpacity
        key={festival.festivalId}
        style={styles.eventCard}
        onPress={() => navigation.navigate('FestivalDetail',
          { festival: {
            ...festival,
            fullDate: festival.startDate,
            highlights: festival.highlights
              ? festival.highlights.split('|')
              : [],
          }})}
      >
        <View style={[styles.eventDate,
          { backgroundColor: festival.color || '#006B3F' }]}>
          <Text style={styles.eventDay}>{festival.day}</Text>
          <Text style={styles.eventMonth}>{festival.month}</Text>
        </View>
        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>{festival.name}</Text>
          <View style={styles.eventLocationRow}>
            <Ionicons
              name="location-sharp"
              size={12}
              color="#888888"
            />
            <Text style={styles.eventLocation}>
              {festival.location}
            </Text>
          </View>
          <View style={styles.eventBadge}>
            <Text style={styles.eventBadgeText}>
              {festival.category}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#CCCCCC" />
      </TouchableOpacity>
      ))
     )}
    </View>

        <View style={{ height: 100 }} />

      </ScrollView>

      {/* ── Bottom Navigation ── */}
      <BottomNav navigation={navigation} activeRoute="Home" />

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
    overflow:'hidden',
  },
  siteCardBg: {
  flex: 1,
},
siteCardImage: {
  resizeMode: 'cover',
},
siteCardOverlay: {
  flex: 1,
  padding: 16,
  justifyContent: 'space-between',
  backgroundColor: 'rgba(0,0,0,0.25)',
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
  siteRegionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flex: 1,
  },
  siteRegion: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
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
  eventLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 6,
  },
  eventLocation: {
    fontSize: 12,
    color: '#888888',
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
});

export default HomeScreen;