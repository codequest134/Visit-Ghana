import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UploadScreen = ({ route, navigation }) => {
  const site                = route.params?.site || null;
  const [caption, setCaption]           = useState('');
  const [loading, setLoading]           = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // ── Ask for permission then open camera ──────
  const handleTakePhoto = async () => {
    const { status } =
      await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please allow camera access in your phone settings to take photos.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // ── Ask for permission then open gallery ─────
  const handleChooseFromGallery = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please allow photo library access in your phone settings.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // ── Upload handler ────────────────────────────
  const handleUpload = () => {
    if (!selectedImage) {
      Alert.alert(
        'No Photo Selected',
        'Please select or take a photo first.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (!site) {
      Alert.alert(
        'No Site Selected',
        'Please upload photos from a specific site page.',
        [{ text: 'OK' }]
      );
      return;
    }

    setLoading(true);

    // Simulate upload for now
    // We replace this with real API call later
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Photo Submitted! 🎉',
        'Your photo has been submitted for review. It will appear in the gallery once approved by our team.',
        [{ text: 'Great!', onPress: () => navigation.goBack() }]
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Photo</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── Site Tag ── */}
        {site ? (
          <View style={styles.siteTag}>
            <Text style={styles.siteTagIcon}>📍</Text>
            <View style={styles.siteTagInfo}>
              <Text style={styles.siteTagLabel}>
                Uploading to
              </Text>
              <Text style={styles.siteTagName}>{site.name}</Text>
            </View>
            <View style={[styles.siteTagDot,
              { backgroundColor: site.color }]}
            />
          </View>
        ) : (
          <View style={styles.noSiteWarning}>
            <Text style={styles.noSiteText}>
              ⚠ Please upload photos from a site page so your
              photo is tagged to the correct location.
            </Text>
          </View>
        )}

        {/* ── Photo Picker / Preview ── */}
        <Text style={styles.sectionLabel}>Photo</Text>

        {selectedImage ? (
          // Show the actual selected image
          <View style={styles.imagePreviewContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.imagePreview}
            />
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={() => setSelectedImage(null)}
            >
              <Text style={styles.changePhotoText}>
                ✕  Change Photo
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Show picker options
          <View style={styles.photoPickerContainer}>
            <TouchableOpacity
              style={styles.photoPickerOption}
              onPress={handleTakePhoto}
            >
              <View style={styles.pickerIconCircle}>
                <Text style={styles.pickerIcon}>📷</Text>
              </View>
              <Text style={styles.pickerOptionTitle}>
                Take Photo
              </Text>
              <Text style={styles.pickerOptionSubtitle}>
                Use your camera
              </Text>
            </TouchableOpacity>

            <View style={styles.pickerDivider} />

            <TouchableOpacity
              style={styles.photoPickerOption}
              onPress={handleChooseFromGallery}
            >
              <View style={[styles.pickerIconCircle,
                { backgroundColor: '#E8F0FF' }]}>
                <Text style={styles.pickerIcon}>🖼️</Text>
              </View>
              <Text style={styles.pickerOptionTitle}>
                Choose from Gallery
              </Text>
              <Text style={styles.pickerOptionSubtitle}>
                Pick an existing photo
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Caption ── */}
        <Text style={styles.sectionLabel}>
          Caption{' '}
          <Text style={styles.optionalText}>(optional)</Text>
        </Text>
        <View style={styles.captionContainer}>
          <TextInput
            style={styles.captionInput}
            placeholder="Describe what you see or share your experience..."
            placeholderTextColor="#aaaaaa"
            value={caption}
            onChangeText={setCaption}
            multiline
            maxLength={150}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>
            {caption.length}/150
          </Text>
        </View>

        {/* ── Guidelines ── */}
        <View style={styles.guidelinesCard}>
          <Text style={styles.guidelinesTitle}>
            📋 Photo Guidelines
          </Text>
          {[
            'Photo must be taken at the site you are uploading to',
            'Clear and well-lit images are more likely to be approved',
            'No inappropriate, offensive, or unrelated content',
            'Avoid photos with personal information visible',
            'Duplicate photos will be rejected automatically',
          ].map((guideline, index) => (
            <View key={index} style={styles.guidelineItem}>
              <Text style={styles.guidelineDot}>•</Text>
              <Text style={styles.guidelineText}>{guideline}</Text>
            </View>
          ))}
        </View>

        {/* ── Moderation Notice ── */}
        <View style={styles.moderationNotice}>
          <Text style={styles.moderationIcon}>🛡️</Text>
          <Text style={styles.moderationText}>
            All photos are reviewed by our team before going live.
            This usually takes less than 24 hours.
          </Text>
        </View>

        {/* ── Upload Button ── */}
        <TouchableOpacity
          style={[
            styles.uploadButton,
            (!selectedImage || loading) &&
              styles.uploadButtonDisabled,
          ]}
          onPress={handleUpload}
          disabled={!selectedImage || loading}
        >
          {loading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#ffffff" size="small" />
              <Text style={styles.uploadButtonText}>
                Uploading...
              </Text>
            </View>
          ) : (
            <Text style={styles.uploadButtonText}>
              Submit Photo
            </Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: '#ffffff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCD116',
  },
  scrollContent: {
    padding: 20,
  },
  siteTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  siteTagIcon: { fontSize: 22 },
  siteTagInfo: { flex: 1 },
  siteTagLabel: {
    fontSize: 11,
    color: '#888888',
    marginBottom: 2,
  },
  siteTagName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  siteTagDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  noSiteWarning: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFA000',
  },
  noSiteText: {
    fontSize: 13,
    color: '#E65100',
    lineHeight: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  optionalText: {
    fontWeight: '400',
    color: '#888888',
    fontSize: 13,
  },
  photoPickerContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  photoPickerOption: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  pickerIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerIcon: { fontSize: 26 },
  pickerOptionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    textAlign: 'center',
  },
  pickerOptionSubtitle: {
    fontSize: 11,
    color: '#888888',
    textAlign: 'center',
  },
  pickerDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  imagePreviewContainer: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  imagePreview: {
    width: '100%',
    height: 220,
  },
  changePhotoButton: {
    backgroundColor: '#ffffff',
    padding: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  changePhotoText: {
    fontSize: 14,
    color: '#CE1126',
    fontWeight: '600',
  },
  captionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    padding: 14,
    marginBottom: 24,
  },
  captionInput: {
    fontSize: 14,
    color: '#1A1A1A',
    minHeight: 80,
    lineHeight: 22,
  },
  charCount: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'right',
    marginTop: 8,
  },
  guidelinesCard: {
    backgroundColor: '#FFFBE6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FCD116',
  },
  guidelinesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  guidelineItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  guidelineDot: {
    fontSize: 14,
    color: '#888888',
    marginTop: 1,
  },
  guidelineText: {
    flex: 1,
    fontSize: 13,
    color: '#555555',
    lineHeight: 19,
  },
  moderationNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9F4',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    gap: 10,
    borderWidth: 1,
    borderColor: '#006B3F',
  },
  moderationIcon: { fontSize: 20 },
  moderationText: {
    flex: 1,
    fontSize: 13,
    color: '#006B3F',
    lineHeight: 19,
  },
  uploadButton: {
    backgroundColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  uploadButtonDisabled: {
    backgroundColor: '#A0C4B4',
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default UploadScreen;