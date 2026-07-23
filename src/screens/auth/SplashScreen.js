import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';

import { restoreSession } from '../../utils/auth';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    let isActive = true;

    const bootstrap = async () => {
      const user = await restoreSession();

      if (!isActive) {
        return;
      }

      navigation.replace(user ? 'Home' : 'Welcome');
    };

    const timer = setTimeout(bootstrap, 2000);

    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Your Logo */}
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
        Discover Ghana's Treasures
      </Text>

      {/* Loading spinner */}
      <ActivityIndicator
        size="small"
        color="#FCD116"
        style={styles.spinner}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006B3F',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    width: 130,
    height: 130,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logo: {
    width: 95,
    height: 95,
  },
  appName: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#FCD116',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 50,
  },
  spinner: {
    marginTop: 10,
  },
});

export default SplashScreen;