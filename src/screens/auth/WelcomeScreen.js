import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Section — Green background with branding */}
      <View style={styles.topSection}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* App name */}
        <Text style={styles.appName}>VisitGhana</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>
          Discover, Navigate & Share{'\n'}Ghana's Heritage
        </Text>

        {/* Three small feature hints */}
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <Ionicons name="business" size={22} color="#FCD116" />
            </View>
            <Text style={styles.featureText}>Explore Sites</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <Ionicons name="map" size={22} color="#FCD116" />
            </View>
            <Text style={styles.featureText}>Navigate</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIconCircle}>
              <Ionicons name="camera" size={22} color="#FCD116" />
            </View>
            <Text style={styles.featureText}>Share Photos</Text>
          </View>
        </View>

      </View>

      {/* Bottom Section — White card with buttons */}
      <View style={styles.bottomSection}>

        <Text style={styles.bottomTitle}>Get Started</Text>
        <Text style={styles.bottomSubtitle}>
          Join thousands exploring Ghana's heritage
        </Text>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.signupText}>Create Account</Text>
        </TouchableOpacity>

        {/* Guest option */}
        <TouchableOpacity>
          <Text style={styles.guestText}>
            Continue as Guest
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006B3F',
  },
  topSection: {
    flex: 0.58,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logo: {
    width: 72,
    height: 72,
  },
  appName: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#FCD116',
    letterSpacing: 2,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    opacity: 0.9,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.85,
    fontWeight: '500',
  },
  bottomSection: {
    flex: 0.42,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 30,
    paddingTop: 32,
    alignItems: 'center',
  },
  bottomTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  bottomSubtitle: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 24,
    textAlign: 'center',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 14,
  },
  loginText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  signupButton: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupText: {
    color: '#006B3F',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  guestText: {
    fontSize: 13,
    color: '#888888',
    textDecorationLine: 'underline',
  },
});

export default WelcomeScreen;