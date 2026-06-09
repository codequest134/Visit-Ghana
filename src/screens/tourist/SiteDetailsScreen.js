import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';

const SiteDetailScreen = ({ route, navigation }) => {
  const { site } = route.params;
  const [activeTab, setActiveTab] = useState('About');
  const [saved, setSaved] = useState(false);

  const TABS = ['About', 'History', 'Photos', 'Reviews'];

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

  // Dummy nearby places
  const NEARBY = [
    { id: '1', name: 'Elmina Bay Hotel',   type: 'Hotel',      distance: '1.2 km' },
    { id: '2', name: 'Baobab Restaurant',  type: 'Restaurant', distance: '0.8 km' },
    { id: '3', name: 'Cape View Lodge',    type: 'Hotel',      distance: '2.1 km' },
    { id: '4', name: 'The Fish Pot',       type: 'Restaurant', distance: '1.5 km' },
  ];

  // Dummy community photos
  const PHOTOS = [
    { id: '1', uploader: 'Kwame A.',  color: '#1A4A6B' },
    { id: '2', uploader: 'Ama S.',    color: '#2D6A4F' },
    { id: '3', uploader: 'Kofi M.',   color: '#6B4A1A' },
    { id: '4', uploader: 'Abena T.',  color: '#4A1A6B' },
    { id: '5', uploader: 'Yaw B.',    color: '#1A6B5A' },
    { id: '6', uploader: 'Efua D.',   color: '#6B1A1A' },
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
                <Text style={styles.infoIcon}>🕐</Text>
                <Text style={styles.infoLabel}>Opening Hours</Text>
                <Text style={styles.infoValue}>8:00 AM – 5:00 PM</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoIcon}>🎟️</Text>
                <Text style={styles.infoLabel}>Entry Fee</Text>
                <Text style={styles.infoValue}>GHS 40 / Adult</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={styles.infoLabel}>Region</Text>
                <Text style={styles.infoValue}>{site.region}</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoIcon}>🏷️</Text>
                <Text style={styles.infoLabel}>Category</Text>
                <Text style={styles.infoValue}>{site.category}</Text>
              </View>
            </View>

            {/* Virtual Tour Button */}
            <TouchableOpacity style={styles.virtualTourButton}>
              <Text style={styles.virtualTourIcon}>🌐</Text>
              <View>
                <Text style={styles.virtualTourTitle}>
                  360° Virtual Tour
                </Text>
                <Text style={styles.virtualTourSubtitle}>
                  Explore via Google Street View
                </Text>
              </View>
              <Text style={styles.virtualTourArrow}>›</Text>
            </TouchableOpacity>

            {/* Audio Guide Button */}
            <TouchableOpacity style={styles.audioButton}>
              <Text style={styles.audioIcon}>🎧</Text>
              <View>
                <Text style={styles.audioTitle}>Audio Guide</Text>
                <Text style={styles.audioSubtitle}>
                  Listen to the full site history
                </Text>
              </View>
              <Text style={styles.audioArrow}>›</Text>
            </TouchableOpacity>

            {/* Nearby Section */}
            <Text style={styles.tabSectionTitle}>
              Nearby Hotels & Restaurants
            </Text>
            {NEARBY.map((place) => (
              <View key={place.id} style={styles.nearbyCard}>
                <View style={[styles.nearbyIcon, {
                  backgroundColor: place.type === 'Hotel'
                    ? '#E8F5EE' : '#FFF3E0',
                }]}>
                  <Text style={styles.nearbyIconText}>
                    {place.type === 'Hotel' ? '🏨' : '🍽️'}
                  </Text>
                </View>
                <View style={styles.nearbyInfo}>
                  <Text style={styles.nearbyName}>{place.name}</Text>
                  <Text style={styles.nearbyType}>{place.type}</Text>
                </View>
                <Text style={styles.nearbyDistance}>
                  {place.distance}
                </Text>
              </View>
            ))}
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
              the region, drawing traders, diplomats, and eventually
              tourists from across the globe.{'\n\n'}
              Today it stands as a symbol of Ghana's enduring spirit
              and its people's ability to preserve their heritage
              through generations of change. The Ghana Tourism
              Authority designated it as a protected heritage site,
              ensuring its preservation for future generations.{'\n\n'}
              Historians and archaeologists continue to study the
              site today, regularly uncovering new insights into
              daily life, trade patterns, and cultural practices of
              the people who built and inhabited this remarkable
              place.
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

      // ── Photos Tab ─────────────────────────────
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
            <Text style={styles.photosSubtitle}>
              {PHOTOS.length} approved photos from visitors
            </Text>

            {/* Photos grid */}
            <View style={styles.photosGrid}>
              {PHOTOS.map((photo) => (
                <TouchableOpacity
                  key={photo.id}
                  style={[styles.photoTile,
                    { backgroundColor: photo.color }]}
                >
                  <View style={styles.photoOverlay}>
                    <Text style={styles.photoUploader}>
                      📸 {photo.uploader}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Upload prompt */}
            <TouchableOpacity
              style={styles.uploadBanner}
              onPress={() => navigation.navigate('Upload',
                { site: site })}
            >
              <Text style={styles.uploadBannerIcon}>📷</Text>
              <View>
                <Text style={styles.uploadBannerTitle}>
                  Been here? Share your photo
                </Text>
                <Text style={styles.uploadBannerSubtitle}>
                  Help other tourists know what to expect
                </Text>
              </View>
              <Text style={styles.uploadBannerArrow}>›</Text>
            </TouchableOpacity>
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
                <Text style={styles.starsRow}>
                  {'★'.repeat(Math.round(site.rating))}
                  {'☆'.repeat(5 - Math.round(site.rating))}
                </Text>
                <Text style={styles.ratingSubtext}>
                  Based on {site.reviews} reviews
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

            {/* Individual reviews */}
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
                  <Text style={styles.reviewStars}>
                    {'★'.repeat(review.rating)}
                  </Text>
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

        {/* ── Hero Banner ── */}
        <View style={[styles.heroBanner,
          { backgroundColor: site.color }]}>

          {/* Top buttons */}
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.heroBtnText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => setSaved(!saved)}
            >
              <Text style={styles.heroBtnText}>
                {saved ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Site info on banner */}
          <View style={styles.heroContent}>
            <View style={styles.heroBadgeRow}>
              <View style={styles.heroCategoryBadge}>
                <Text style={styles.heroCategoryText}>
                  {site.category}
                </Text>
              </View>
              <View style={styles.heroVerifiedBadge}>
                <Text style={styles.heroVerifiedText}>
                  ✓ Verified
                </Text>
              </View>
            </View>
            <Text style={styles.heroSiteName}>{site.name}</Text>
            <Text style={styles.heroRegion}>
              📍 {site.region}
            </Text>
            <View style={styles.heroRatingRow}>
              <Text style={styles.heroRating}>
                ★ {site.rating}
              </Text>
              <Text style={styles.heroReviews}>
                ({site.reviews} reviews)
              </Text>
            </View>
          </View>
        </View>

        {/* ── Action Buttons ── */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnIcon}>🗺️</Text>
            <Text style={styles.actionBtnText}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnIcon}>🎟️</Text>
            <Text style={styles.actionBtnText}>Buy Ticket</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnIcon}>📤</Text>
            <Text style={styles.actionBtnText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnIcon}>🗓️</Text>
            <Text style={styles.actionBtnText}>Plan Trip</Text>
          </TouchableOpacity>
        </View>

        {/* ── Tabs ── */}
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

        {/* ── Tab Content ── */}
        <View style={styles.tabContent}>
          {renderTabContent()}
        </View>

        <View style={{ height: 40 }} />
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

  // ── Hero ─────────────────────────────────────
  heroBanner: {
    height: 280,
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 24,
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
  heroBtnText: {
    fontSize: 18,
    color: '#ffffff',
  },
  heroContent: {
    gap: 6,
  },
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
  heroRegion: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  heroRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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

  // ── Action Buttons ────────────────────────────
  actionButtons: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  actionBtn: {
    alignItems: 'center',
    gap: 4,
  },
  actionBtnIcon: {
    fontSize: 22,
  },
  actionBtnText: {
    fontSize: 11,
    color: '#555555',
    fontWeight: '500',
  },

  // ── Tabs ─────────────────────────────────────
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
  tabActive: {
    borderBottomColor: '#006B3F',
  },
  tabText: {
    fontSize: 13,
    color: '#888888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#006B3F',
    fontWeight: '700',
  },

  // ── Tab Content ───────────────────────────────
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

  // ── Info Grid ────────────────────────────────
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
  },
  infoIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },

  // ── Virtual Tour & Audio ──────────────────────
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
  virtualTourIcon: { fontSize: 24 },
  virtualTourTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  virtualTourSubtitle: {
    fontSize: 12,
    color: '#888888',
  },
  virtualTourArrow: {
    fontSize: 22,
    color: '#006B3F',
    marginLeft: 'auto',
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
  audioIcon: { fontSize: 24 },
  audioTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E65100',
  },
  audioSubtitle: {
    fontSize: 12,
    color: '#888888',
  },
  audioArrow: {
    fontSize: 22,
    color: '#FFA000',
    marginLeft: 'auto',
  },

  // ── Nearby ───────────────────────────────────
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
  nearbyIconText: { fontSize: 20 },
  nearbyInfo: { flex: 1 },
  nearbyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  nearbyType: {
    fontSize: 12,
    color: '#888888',
  },
  nearbyDistance: {
    fontSize: 12,
    color: '#006B3F',
    fontWeight: '600',
  },

  // ── Photos ───────────────────────────────────
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
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  photoTile: {
    width: '31%',
    height: 100,
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  photoOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 6,
  },
  photoUploader: {
    color: '#ffffff',
    fontSize: 10,
  },
  uploadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9F4',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#006B3F',
    borderStyle: 'dashed',
    gap: 12,
  },
  uploadBannerIcon: { fontSize: 28 },
  uploadBannerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#006B3F',
  },
  uploadBannerSubtitle: {
    fontSize: 12,
    color: '#888888',
  },
  uploadBannerArrow: {
    fontSize: 22,
    color: '#006B3F',
    marginLeft: 'auto',
  },

  // ── Reviews ──────────────────────────────────
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
    fontSize: 20,
    color: '#FCD116',
    marginBottom: 4,
  },
  ratingSubtext: {
    fontSize: 12,
    color: '#888888',
  },
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
  reviewDate: {
    fontSize: 12,
    color: '#888888',
  },
  reviewStars: {
    fontSize: 14,
    color: '#FCD116',
  },
  reviewComment: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 20,
  },

  // ── Timeline ─────────────────────────────────
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
  timelineEvent: {
    fontSize: 13,
    color: '#555555',
  },
});

export default SiteDetailScreen;