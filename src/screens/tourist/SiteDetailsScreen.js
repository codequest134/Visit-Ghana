import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
  Image,
  ActivityIndicator,
  Share,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getCurrentUser } from '../../utils/currentUser';

// backend address
const BASE_URL = 'http://192.168.100.4:8081/api';

const SiteDetailScreen = ({ route, navigation }) => {
  const { site } = route.params;
  const [activeTab, setActiveTab] = useState('About');
  const [saved, setSaved] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [savingTrip, setSavingTrip] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(false);

  const TABS = ['About', 'History', 'Photos', 'Reviews'];

  useEffect(() => {
    if (activeTab === 'Photos') {
      loadPhotos();
    }
  }, [activeTab]);

  useEffect(() => {
   loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
  try {
    setRestaurantsLoading(true);
    const response = await fetch(
      `${BASE_URL}/restaurants/site/${site.siteId}`
    );
    const data = await response.json();
    setRestaurants(data);
  } catch (err) {
    console.error('Error loading restaurants:', err);
  } finally {
    setRestaurantsLoading(false);
  }
 };

  const loadPhotos = async () => {
    try {
      setPhotosLoading(true);
      const response = await fetch(
        `${BASE_URL}/photos/${site.siteId}/approved`
      );
      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      console.error('Error loading photos:', err);
    } finally {
      setPhotosLoading(false);
    }
  };

  const openDirections = () => {
    const url =
      `https://www.google.com/maps/dir/?api=1&destination=${site.latitude},${site.longitude}`;
    Linking.openURL(url);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          `Check out ${site.name} in ${site.region}, Ghana! ` +
          `${site.description} ` +
          `Discover it on the VisitGhana app.`,
      });
    } catch (err) {
      Alert.alert('Error', 'Could not share this site.');
    }
  };

  // Called as the user scrolls the spinner — just track the chosen date
  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  // Called when the user taps Confirm — close the modal and save
  const confirmDate = () => {
    setShowDatePicker(false);
    const formattedDate = tempDate.toISOString().split('T')[0];
    saveTrip(formattedDate);
  };

  const saveTrip = async (visitDate) => {
    setSavingTrip(true);
    try {
      const user = getCurrentUser();
      const userId = user?.userId || 1;
      const response = await fetch(`${BASE_URL}/trips/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          siteId: site.siteId,
          siteName: site.name,
          siteRegion: site.region,
          siteColor: site.color,
          visitDate: visitDate,
        }),
      });

      if (response.ok) {
        Alert.alert(
          'Trip Planned!',
          `${site.name} has been added to your trips for ${visitDate}.`,
          [
            { text: 'OK' },
            {
              text: 'View My Trips',
              onPress: () => navigation.navigate('MyTrips'),
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Could not save your trip. Please try again.');
      }
    } catch (err) {
      Alert.alert('Connection Error', 'Check your network and try again.');
    } finally {
      setSavingTrip(false);
    }
  };

  // Dummy reviews
  const REVIEWS = [
    {
      id: '1',
      name: 'Kwame Asante',
      rating: 5,
      date: 'June 2025',
      comment:
        'Absolutely breathtaking experience. The history here is deeply moving and the guides are very knowledgeable.',
    },
    {
      id: '2',
      name: 'Sophie Lambert',
      rating: 4,
      date: 'May 2025',
      comment:
        'A must visit when in Ghana. The architecture is stunning and the story behind it is unforgettable.',
    },
    {
      id: '3',
      name: 'Ama Serwaa',
      rating: 5,
      date: 'April 2025',
      comment:
        'I have visited twice and each time it feels like a completely different experience. Highly recommended.',
    },
  ];

  // ── Tab content renderer ──────────────────────
  const renderTabContent = () => {
    switch (activeTab) {

      // ── About Tab ──────────────────────────────
      case 'About':
        return (
          <View>
            <Text style={styles.tabSectionTitle}>Overview</Text>
            <Text style={styles.descriptionText}>
              {site.description}{'\n\n'}
              This remarkable site stands as a testament to Ghana's rich
              and complex history. Visitors from around the world come
              to experience its unique blend of architecture, culture,
              and historical significance that cannot be found anywhere
              else on the African continent.
            </Text>

            {/* Info cards */}
            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Ionicons name="time-outline" size={24} color="#006B3F" />
                <Text style={styles.infoLabel}>Opening Hours</Text>
                <Text style={styles.infoValue}>8:00 AM – 5:00 PM</Text>
              </View>
              <View style={styles.infoCard}>
                <Ionicons name="ticket-outline" size={24} color="#006B3F" />
                <Text style={styles.infoLabel}>Entry Fee</Text>
                <Text style={styles.infoValue}>GHS 40 / Adult</Text>
              </View>
              <View style={styles.infoCard}>
                <Ionicons name="location-outline" size={24} color="#006B3F" />
                <Text style={styles.infoLabel}>Region</Text>
                <Text style={styles.infoValue}>{site.region}</Text>
              </View>
              <View style={styles.infoCard}>
                <Ionicons name="pricetag-outline" size={24} color="#006B3F" />
                <Text style={styles.infoLabel}>Category</Text>
                <Text style={styles.infoValue}>{site.category}</Text>
              </View>
            </View>

            {/* Virtual Tour Button */}
            <TouchableOpacity
              style={styles.virtualTourButton}
              onPress={() => navigation.navigate('VirtualTour', { site })}
            >
              <Ionicons name="globe-outline" size={24} color="#006B3F" />
              <View style={styles.featureBtnTextWrap}>
                <Text style={styles.virtualTourTitle}>
                  360° Virtual Tour
                </Text>
                <Text style={styles.virtualTourSubtitle}>
                  Explore via Google Street View
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#006B3F" />
            </TouchableOpacity>

            {/* Audio Guide Button */}
            <TouchableOpacity style={styles.audioButton}>
              <Ionicons name="headset-outline" size={24} color="#E65100" />
              <View style={styles.featureBtnTextWrap}>
                <Text style={styles.audioTitle}>Audio Guide</Text>
                <Text style={styles.audioSubtitle}>
                  Listen to the full site history
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#FFA000" />
            </TouchableOpacity>

            {/* Nearby Section */}
            {/* Nearby Restaurants Section */}
<Text style={styles.tabSectionTitle}>
  Nearby Restaurants
</Text>

{restaurantsLoading ? (
  <ActivityIndicator
    size="small"
    color="#006B3F"
    style={{ marginVertical: 20 }}
  />
) : restaurants.length === 0 ? (
  <Text style={styles.noRestaurantsText}>
    No restaurants listed near this site yet.
  </Text>
) : (
  restaurants.map((place) => (
    <View key={place.restaurantId} style={styles.nearbyCard}>
      <View style={[styles.nearbyIcon, {
        backgroundColor: place.type === 'Cafe'
          ? '#FFF8E1' : '#FFF3E0',
      }]}>
        <Ionicons
          name={place.type === 'Cafe' ? 'cafe-outline' : 'restaurant-outline'}
          size={20}
          color="#E65100"
        />
      </View>
      <View style={styles.nearbyInfo}>
        <Text style={styles.nearbyName}>{place.name}</Text>
        <Text style={styles.nearbyType}>
          {place.cuisine}
        </Text>
        <View style={styles.restaurantMetaRow}>
          <Ionicons name="star" size={12} color="#FCD116" />
          <Text style={styles.restaurantRating}>
            {place.rating}
          </Text>
          <Text style={styles.restaurantPrice}>
            · {place.priceRange}
          </Text>
        </View>
      </View>
      <Text style={styles.nearbyDistance}>
        {place.distance}
      </Text>
    </View>
  ))
 )}
          </View>
        );

      // ── History Tab ────────────────────────────
      case 'History':
        return (
          <View>
            <Text style={styles.tabSectionTitle}>
              Historical Background
            </Text>
            <Text style={styles.descriptionText}>
              {site.name} holds a profound place in the history of
              Ghana and the African continent as a whole. Its origins
              date back centuries, representing a convergence of
              indigenous Ghanaian culture and the complex forces of
              trade, colonialism, and resistance that shaped West
              Africa.{'\n\n'}
              The site was first established as a strategic location
              due to its geographical advantages. Over the decades it
              evolved into one of the most significant landmarks in
              the region.{'\n\n'}
              Today it stands as a symbol of Ghana's enduring spirit
              and its people's ability to preserve their heritage
              through generations of change.
            </Text>

            {/* Timeline */}
            <Text style={styles.tabSectionTitle}>Timeline</Text>
            {[
              { year: '1482', event: 'Site first established' },
              { year: '1700s', event: 'Expanded under new administration' },
              { year: '1850', event: 'Transitioned to new purpose' },
              { year: '1957', event: 'Ghana Independence — site preserved' },
              { year: '1979', event: 'Declared UNESCO World Heritage Site' },
              { year: '2024', event: 'Major restoration completed' },
            ].map((item, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineYear}>{item.year}</Text>
                  <Text style={styles.timelineEvent}>{item.event}</Text>
                </View>
              </View>
            ))}
          </View>
        );

      // ── Photos Tab (REAL PHOTOS) ───────────────
      case 'Photos':
        return (
          <View>
            <View style={styles.photosHeader}>
              <Text style={styles.tabSectionTitle}>
                Community Photos
              </Text>
              <TouchableOpacity
                style={styles.uploadPhotoButton}
                onPress={() => navigation.navigate('Upload',
                  { site: site })}
              >
                <Text style={styles.uploadPhotoText}>
                  + Add Photo
                </Text>
              </TouchableOpacity>
            </View>

            {photosLoading ? (
              <ActivityIndicator
                size="large"
                color="#006B3F"
                style={{ marginVertical: 40 }}
              />
            ) : photos.length === 0 ? (
              <View style={styles.noPhotosContainer}>
                <Ionicons
                  name="camera-outline"
                  size={48}
                  color="#CCCCCC"
                  style={{ marginBottom: 12 }}
                />
                <Text style={styles.noPhotosTitle}>
                  No photos yet
                </Text>
                <Text style={styles.noPhotosText}>
                  Be the first to share a photo of this site
                </Text>
                <TouchableOpacity
                  style={styles.firstPhotoButton}
                  onPress={() => navigation.navigate('Upload',
                    { site: site })}
                >
                  <Text style={styles.firstPhotoText}>
                    Add First Photo
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={styles.photosSubtitle}>
                  {photos.length} photo{photos.length !== 1 ? 's' : ''} from visitors
                </Text>
                <View style={styles.realPhotosGrid}>
                  {photos.map((photo) => (
                    <View
                      key={photo.photoId}
                      style={styles.realPhotoTile}
                    >
                      <Image
                        source={{ uri: photo.imageUrl }}
                        style={styles.realPhotoImage}
                      />
                      {photo.caption ? (
                        <Text
                          style={styles.realPhotoCaption}
                          numberOfLines={1}
                        >
                          {photo.caption}
                        </Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        );

      // ── Reviews Tab ────────────────────────────
      case 'Reviews':
        return (
          <View>
            {/* Rating summary */}
            <View style={styles.ratingSummary}>
              <Text style={styles.bigRating}>{site.rating}</Text>
              <View style={styles.ratingDetails}>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Ionicons
                      key={n}
                      name={n <= Math.round(site.rating) ? 'star' : 'star-outline'}
                      size={18}
                      color="#FCD116"
                    />
                  ))}
                </View>
                <Text style={styles.ratingSubtext}>
                  Based on {site.reviewCount} reviews
                </Text>
              </View>
            </View>

            {/* Rating breakdown */}
            {[
              { label: 'History',       score: 4.9 },
              { label: 'Scenery',       score: 4.7 },
              { label: 'Accessibility', score: 4.2 },
              { label: 'Value',         score: 4.5 },
            ].map((item) => (
              <View key={item.label} style={styles.ratingBar}>
                <Text style={styles.ratingBarLabel}>
                  {item.label}
                </Text>
                <View style={styles.ratingBarTrack}>
                  <View style={[styles.ratingBarFill, {
                    width: `${(item.score / 5) * 100}%`,
                  }]} />
                </View>
                <Text style={styles.ratingBarScore}>
                  {item.score}
                </Text>
              </View>
            ))}

            <Text style={styles.tabSectionTitle}>
              Visitor Reviews
            </Text>

            {REVIEWS.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>
                      {review.name.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.reviewMeta}>
                    <Text style={styles.reviewName}>
                      {review.name}
                    </Text>
                    <Text style={styles.reviewDate}>
                      {review.date}
                    </Text>
                  </View>
                  <View style={styles.reviewStarsRow}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Ionicons
                        key={i}
                        name="star"
                        size={14}
                        color="#FCD116"
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewComment}>
                  {review.comment}
                </Text>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  // ── Main render ───────────────────────────────
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero Banner */}
        <View style={[styles.heroBanner,
          { backgroundColor: site.color }]}>
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={22} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => setSaved(!saved)}
            >
              <Ionicons
                name={saved ? 'heart' : 'heart-outline'}
                size={22}
                color={saved ? '#CE1126' : '#ffffff'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.heroContent}>
            <View style={styles.heroBadgeRow}>
              <View style={styles.heroCategoryBadge}>
                <Text style={styles.heroCategoryText}>
                  {site.category}
                </Text>
              </View>
              <View style={styles.heroVerifiedBadge}>
                <Ionicons
                  name="checkmark-circle"
                  size={12}
                  color="#FCD116"
                />
                <Text style={styles.heroVerifiedText}>
                  Verified
                </Text>
              </View>
            </View>
            <Text style={styles.heroSiteName}>{site.name}</Text>
            <View style={styles.heroRegionRow}>
              <Ionicons
                name="location-sharp"
                size={14}
                color="rgba(255,255,255,0.85)"
              />
              <Text style={styles.heroRegion}>{site.region}</Text>
            </View>
            <View style={styles.heroRatingRow}>
              <Ionicons name="star" size={15} color="#FCD116" />
              <Text style={styles.heroRating}>{site.rating}</Text>
              <Text style={styles.heroReviews}>
                ({site.reviewCount} reviews)
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={openDirections}
          >
            <Ionicons name="navigate-outline" size={24} color="#006B3F" />
            <Text style={styles.actionBtnText}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => navigation.navigate('BuyTicket', { site })}
          >
            <Ionicons name="ticket-outline" size={24} color="#006B3F" />
            <Text style={styles.actionBtnText}>Buy Ticket</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleShare}
          >
            <Ionicons name="share-social-outline" size={24} color="#006B3F" />
            <Text style={styles.actionBtnText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={24} color="#006B3F" />
            <Text style={styles.actionBtnText}>Plan Trip</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab,
                activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText,
                activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {renderTabContent()}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Pick a Visit Date
              </Text>
              <Text style={styles.modalSubtitle}>
                When would you like to visit {site.name}?
              </Text>
            </View>

            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              minimumDate={new Date()}
              onChange={onDateChange}
              style={styles.picker}
              textColor="#1A1A1A"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={confirmDate}
                disabled={savingTrip}
              >
                {savingTrip ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Text style={styles.modalConfirmText}>
                    Confirm
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  heroBanner: {
    height: 280,
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
  picker: {
    height: 180,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555555',
  },
  modalConfirmBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#006B3F',
    alignItems: 'center',
  },
  modalConfirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: { gap: 6 },
  heroBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  heroCategoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  heroCategoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  heroVerifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(252,209,22,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  heroVerifiedText: {
    color: '#FCD116',
    fontSize: 12,
    fontWeight: '600',
  },
  heroSiteName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 34,
  },
  heroRegionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroRegion: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  heroRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroRating: {
    fontSize: 15,
    color: '#FCD116',
    fontWeight: 'bold',
  },
  heroReviews: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
  },
  actionButtons: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionBtn: { alignItems: 'center', gap: 4 },
  actionBtnText: {
    fontSize: 11,
    color: '#555555',
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: '#006B3F' },
  tabText: {
    fontSize: 13,
    color: '#888888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#006B3F',
    fontWeight: '700',
  },
  tabContent: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  tabSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    marginTop: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 22,
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  infoCard: {
    width: '47%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 6,
  },
  infoLabel: {
    fontSize: 11,
    color: '#888888',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  virtualTourButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5EE',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: '#006B3F',
  },
  featureBtnTextWrap: {
    flex: 1,
  },
  virtualTourTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  virtualTourSubtitle: {
    fontSize: 12,
    color: '#888888',
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: '#FFA000',
  },
  audioTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E65100',
  },
  audioSubtitle: {
    fontSize: 12,
    color: '#888888',
  },
  nearbyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  nearbyIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nearbyInfo: { flex: 1 },
  nearbyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  nearbyType: { fontSize: 12, color: '#888888' },
  nearbyDistance: {
    fontSize: 12,
    color: '#006B3F',
    fontWeight: '600',
  },
  noRestaurantsText: {
    fontSize: 13,
    color: '#888888',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  restaurantMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 3,
  },
  restaurantRating: {
    fontSize: 12,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  restaurantPrice: {
    fontSize: 12,
    color: '#888888',
  },
  photosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  uploadPhotoButton: {
    backgroundColor: '#006B3F',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  uploadPhotoText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  photosSubtitle: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 14,
  },
  noPhotosContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noPhotosTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  noPhotosText: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 20,
    textAlign: 'center',
  },
  firstPhotoButton: {
    backgroundColor: '#006B3F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  firstPhotoText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  realPhotosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  realPhotoTile: {
    width: '48%',
    marginBottom: 8,
  },
  realPhotoImage: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  realPhotoCaption: {
    fontSize: 12,
    color: '#555555',
    marginTop: 4,
    paddingHorizontal: 2,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    gap: 16,
  },
  bigRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  ratingDetails: { flex: 1 },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4,
  },
  ratingSubtext: { fontSize: 12, color: '#888888' },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  ratingBarLabel: {
    fontSize: 13,
    color: '#555555',
    width: 90,
  },
  ratingBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
  },
  ratingBarFill: {
    height: 6,
    backgroundColor: '#006B3F',
    borderRadius: 3,
  },
  ratingBarScore: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    width: 28,
    textAlign: 'right',
  },
  reviewCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  reviewAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#006B3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewAvatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewMeta: { flex: 1 },
  reviewName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  reviewDate: { fontSize: 12, color: '#888888' },
  reviewStarsRow: {
    flexDirection: 'row',
    gap: 1,
  },
  reviewComment: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 14,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#006B3F',
    marginTop: 4,
  },
  timelineContent: { flex: 1 },
  timelineYear: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#006B3F',
    marginBottom: 2,
  },
  timelineEvent: { fontSize: 13, color: '#555555' },
});

export default SiteDetailScreen;