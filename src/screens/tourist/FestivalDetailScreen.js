import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BASE_URL from '../../utils/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FestivalDetailScreen = ({ route, navigation }) => {
  const { festival } = route.params;
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    loadGalleryPhotos();
  }, []);

  const loadGalleryPhotos = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/festivals/${festival.festivalId}/photos`
      );
      const data = await response.json();
      setGalleryPhotos(data);
    } catch (err) {
      console.error('Error loading festival photos:', err);
    }
  };

  const onPhotoScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH
    );
    setActivePhotoIndex(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero Image Carousel */}
        <View style={styles.heroBanner}>
          {galleryPhotos.length > 0 ? (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onPhotoScroll}
              scrollEventThrottle={16}
            >
              {galleryPhotos.map((photo) => (
                <ImageBackground
                  key={photo.photoId}
                  source={{ uri: photo.imageUrl }}
                  style={[styles.heroSlide,
                    { backgroundColor: festival.color || '#006B3F' }]}
                  imageStyle={styles.heroBannerImage}
                >
                  <View style={styles.heroSlideOverlay} />
                </ImageBackground>
              ))}
            </ScrollView>
          ) : (
            <ImageBackground
              source={{ uri: festival.imageUrl }}
              style={[styles.heroSlide,
                { backgroundColor: festival.color || '#006B3F' }]}
              imageStyle={styles.heroBannerImage}
            >
              <View style={styles.heroSlideOverlay} />
            </ImageBackground>
          )}

          {/* Overlaid content */}
          <View style={styles.heroOverlayContent} pointerEvents="box-none">
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={22} color="#ffffff" />
            </TouchableOpacity>

            <View style={styles.heroContent}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>
                  {festival.category}
                </Text>
              </View>
              <Text style={styles.heroTitle}>{festival.name}</Text>
              <View style={styles.heroDateRow}>
                <Ionicons name="calendar" size={16} color="#FCD116" />
                <Text style={styles.heroDate}>{festival.fullDate}</Text>
              </View>
            </View>
          </View>

          {/* Dots */}
          {galleryPhotos.length > 1 && (
            <View style={styles.dotsContainer}>
              {galleryPhotos.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    activePhotoIndex === index && styles.dotActive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Quick Info Cards */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Ionicons name="location-sharp" size={22} color="#006B3F" />
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{festival.location}</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={22} color="#006B3F" />
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{festival.duration}</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the Festival</Text>
          <Text style={styles.descriptionText}>
            {festival.description}
          </Text>
        </View>

        {/* What to Expect */}
        {festival.highlights && festival.highlights.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What to Expect</Text>
            {festival.highlights.map((item, index) => (
              <View key={index} style={styles.highlightRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color="#006B3F"
                />
                <Text style={styles.highlightText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Tip Card */}
        {festival.tip && (
          <View style={styles.tipCard}>
            <Ionicons name="bulb-outline" size={22} color="#E65100" />
            <View style={styles.tipTextWrap}>
              <Text style={styles.tipTitle}>Visitor Tip</Text>
              <Text style={styles.tipText}>{festival.tip}</Text>
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  heroBanner: {
    height: 280,
    position: 'relative',
    overflow: 'hidden',
  },
  heroSlide: {
    width: SCREEN_WIDTH,
    height: 280,
  },
  heroBannerImage: {
    resizeMode: 'cover',
  },
  heroSlideOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroOverlayContent: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    width: 18,
    backgroundColor: '#ffffff',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: { gap: 8 },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  categoryBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 34,
  },
  heroDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroDate: {
    fontSize: 14,
    color: '#FCD116',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
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
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 22,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  highlightText: {
    flex: 1,
    fontSize: 14,
    color: '#555555',
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#FFA000',
  },
  tipTextWrap: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 20,
  },
});

export default FestivalDetailScreen;