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
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import BottomNav from '../../components/BottomNav';

// ⬇️ Your backend address
const BASE_URL = 'http://192.168.100.4:8081/api';

const UploadScreen = ({ route, navigation }) => {
  const site = route.params?.site || null;
  const [caption, setCaption]             = useState('');
  const [loading, setLoading]             = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleTakePhoto = async () => {
    const { status } =
      await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required',
        'Please allow camera access to take photos.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const handleChooseFromGallery = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required',
        'Please allow photo library access.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert('No Photo', 'Please select a photo first.');
      return;
    }
    if (!site) {
      Alert.alert('No Site',
        'Please upload from a specific site page.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
      formData.append('siteId', site.siteId.toString());
      formData.append('caption', caption);

      const response = await fetch(`${BASE_URL}/photos/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        Alert.alert(
          'Photo Uploaded!',
          'Your photo has been added to the gallery.',
          [{ text: 'Great!', onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert('Upload Failed',
          'Could not upload photo. Please try again.');
      }
    } catch (err) {
      Alert.alert('Connection Error',
        'Check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        {route.params?.site ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
        <Text style={styles.headerTitle}>Add Photo</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        {/* Site Tag */}
        {site ? (
          <View style={styles.siteTag}>
            <Ionicons
              name="location-sharp"
              size={22}
              color="#006B3F"
            />
            <View style={styles.siteTagInfo}>
              <Text style={styles.siteTagLabel}>
                Uploading to
              </Text>
              <Text style={styles.siteTagName}>
                {site.name}
              </Text>
            </View>
            <View style={[styles.siteTagDot,
              { backgroundColor: site.color }]}
            />
          </View>
        ) : (
          <View style={styles.noSiteWarning}>
            <View style={styles.noSiteRow}>
              <Ionicons name="warning" size={18} color="#E65100" />
              <Text style={styles.noSiteText}>
                Please upload from a site page so your photo
                is tagged to the correct location.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.chooseSiteButton}
              onPress={() => navigation.navigate('Sites')}
            >
              <Text style={styles.chooseSiteText}>
                Choose a Site to Upload To
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Photo Picker / Preview */}
        <Text style={styles.sectionLabel}>Photo</Text>

        {selectedImage ? (
          <View style={styles.imagePreviewContainer}>
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.imagePreview}
            />
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={() => setSelectedImage(null)}
            >
              <Ionicons name="close" size={16} color="#CE1126" />
              <Text style={styles.changePhotoText}>
                Change Photo
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.photoPickerContainer}>
            <TouchableOpacity
              style={styles.photoPickerOption}
              onPress={handleTakePhoto}
            >
              <View style={styles.pickerIconCircle}>
                <Ionicons name="camera" size={26} color="#006B3F" />
              </View>
              <Text style={styles.pickerOptionTitle}>
                Take Photo
              </Text>
            </TouchableOpacity>

            <View style={styles.pickerDivider} />

            <TouchableOpacity
              style={styles.photoPickerOption}
              onPress={handleChooseFromGallery}
            >
              <View style={[styles.pickerIconCircle,
                { backgroundColor: '#E8F0FF' }]}>
                <Ionicons name="images" size={26} color="#1A4A6B" />
              </View>
              <Text style={styles.pickerOptionTitle}>
                Gallery
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Caption */}
        <Text style={styles.sectionLabel}>
          Caption{' '}
          <Text style={styles.optionalText}>(optional)</Text>
        </Text>
        <View style={styles.captionContainer}>
          <TextInput
            style={styles.captionInput}
            placeholder="Describe what you see..."
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

        {/* Upload Button */}
        <TouchableOpacity
          style={[styles.uploadButton,
            (!selectedImage || loading) &&
              styles.uploadButtonDisabled]}
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

        <View style={{ height: 100 }} />
      </ScrollView>
      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} activeRoute="Upload" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#006B3F',
    paddingTop: 55,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCD116',
  },
  scrollContent: { padding: 20 },
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
  siteTagDot: { width: 12, height: 12, borderRadius: 6 },
  noSiteWarning: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFA000',
  },
  noSiteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  noSiteText: {
    flex: 1,
    fontSize: 13,
    color: '#E65100',
    lineHeight: 20,
  },
  chooseSiteButton: {
    backgroundColor: '#006B3F',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  chooseSiteText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
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
    padding: 24,
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
  pickerOptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  pickerDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  imagePreviewContainer: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  imagePreview: { width: '100%', height: 220 },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    padding: 12,
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
  uploadButton: {
    backgroundColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  uploadButtonDisabled: { backgroundColor: '#A0C4B4' },
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