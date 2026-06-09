import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Star symbol */}
      <Text style={styles.star}>★</Text>

      {/* App name */}
      <Text style={styles.appName}>VisitGhana</Text>

      {/* Divider line */}
      <View style={styles.divider} />

      {/* Tagline */}
      <Text style={styles.tagline}>
        Discover, Navigate & Share{'\n'}Ghana's Heritage
      </Text>

      {/* Bottom text */}
      <Text style={styles.bottomText}>
        Your complete tourism companion
      </Text>

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
  star: {
    fontSize: 60,
    color: '#000000',
    marginBottom: 20,
  },
  appName: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#FCD116',
    letterSpacing: 2,
    marginBottom: 16,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#FCD116',
    marginBottom: 16,
    borderRadius: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 60,
  },
  bottomText: {
    position: 'absolute',
    bottom: 50,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1,
  },
});

export default SplashScreen;