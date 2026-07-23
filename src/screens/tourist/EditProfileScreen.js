import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BASE_URL from '../../utils/api';
import { getCurrentUser } from '../../utils/currentUser';
import { saveSession } from '../../utils/auth';


const EditProfileScreen = ({ navigation }) => {
  const user = getCurrentUser();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail]       = useState(user?.email || '');
  const [loading, setLoading]   = useState(false);

  const handleSave = async () => {
    if (!fullName.trim() || !email.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (fullName.trim().length < 3) {
      Alert.alert('Error', 'Please enter your full name.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    // Check if anything actually changed
    if (fullName.trim() === user?.fullName && email.trim() === user?.email) {
      Alert.alert('No Changes', 'Your profile is already up to date.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/auth/update/${user.userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          password: 'placeholder',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the stored user so Profile shows new info
        await saveSession(data);
        Alert.alert(
          'Profile Updated',
          'Your profile has been updated successfully.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else if (response.status === 409) {
        Alert.alert('Error', 'This email is already in use by another account.');
      } else {
        Alert.alert('Error', 'Could not update profile. Please try again.');
      }
    } catch (err) {
      Alert.alert('Connection Error', 'Check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {fullName.charAt(0).toUpperCase() || 'G'}
            </Text>
          </View>
          <Text style={styles.avatarHint}>
            Your initial is used as your avatar
          </Text>
        </View>

        {/* Full Name */}
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#888888"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            placeholderTextColor="#aaaaaa"
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#888888"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#aaaaaa"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Role (read only) */}
        <Text style={styles.label}>Account Type</Text>
        <View style={[styles.inputContainer, styles.inputDisabled]}>
          <Ionicons
            name="shield-checkmark-outline"
            size={20}
            color="#888888"
            style={styles.inputIcon}
          />
          <Text style={styles.disabledText}>
            {user?.role
              ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
              : 'Tourist'}
          </Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>

      </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCD116',
  },
  scrollContent: {
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FCD116',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  avatarHint: {
    fontSize: 12,
    color: '#888888',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    height: 52,
  },
  inputDisabled: {
    backgroundColor: '#F5F5F5',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
  },
  disabledText: {
    fontSize: 15,
    color: '#888888',
  },
  saveButton: {
    backgroundColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
  },
  saveButtonDisabled: {
    backgroundColor: '#A0C4B4',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;