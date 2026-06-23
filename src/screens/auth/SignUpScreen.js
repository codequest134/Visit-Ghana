import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { setCurrentUser } from '../../utils/currentUser';

// ⬇️ Your backend address
const BASE_URL = 'http://192.168.100.4:8081/api';

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName]               = useState('');
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]       = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState('');

  const handleSignUp = async () => {
    setError('');

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (fullName.length < 3) {
      setError('Please enter your full name');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
        navigation.replace('Home');
      } else if (response.status === 409) {
        setError('This email is already registered');
      } else {
        setError('Could not create account. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSubtitle}>
            Join the VisitGhana community today
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>

          {error ? (
            <View style={styles.errorBox}>
              <Ionicons
                name="alert-circle"
                size={16}
                color="#CE1126"
              />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

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
              placeholder="Enter your full name"
              placeholderTextColor="#aaaaaa"
              value={fullName}
              onChangeText={setFullName}
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
              placeholder="Enter your email"
              placeholderTextColor="#aaaaaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#888888"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="#aaaaaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#888888"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#888888"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Repeat your password"
              placeholderTextColor="#aaaaaa"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.hintText}>
            Password must be at least 6 characters
          </Text>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={[styles.signupButton,
              loading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.signupText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By creating an account you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

          {/* Login Link */}
          <View style={styles.loginRow}>
            <Text style={styles.loginPrompt}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#006B3F' },
  scrollContent: { flexGrow: 1 },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  backButton: { marginBottom: 20 },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FCD116',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
  },
  formCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF3F3',
    borderWidth: 1,
    borderColor: '#CE1126',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: { color: '#CE1126', fontSize: 13, flex: 1 },
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
    backgroundColor: '#FAFAFA',
    height: 52,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#1A1A1A' },
  hintText: {
    fontSize: 12,
    color: '#888888',
    marginTop: 6,
    marginLeft: 4,
  },
  signupButton: {
    backgroundColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 16,
  },
  buttonDisabled: { backgroundColor: '#4A9A72' },
  signupText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  termsText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  termsLink: { color: '#006B3F', fontWeight: '600' },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: { fontSize: 14, color: '#888888' },
  loginLink: {
    fontSize: 14,
    color: '#006B3F',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;