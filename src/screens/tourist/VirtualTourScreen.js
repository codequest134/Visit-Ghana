import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const VirtualTourScreen = ({ route, navigation }) => {
  const { site } = route.params;
  const [loading, setLoading] = useState(true);

  // Build an HTML page with Street View inside an iframe
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport"
          content="width=device-width, initial-scale=1.0,
          maximum-scale=1.0, user-scalable=no">
        <style>
          * { margin: 0; padding: 0; }
          html, body { height: 100%; overflow: hidden; }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe
          src="https://maps.google.com/maps?q=&layer=c&cbll=${site.latitude},${site.longitude}&cbp=11,0,0,0,0&output=svembed"
          allowfullscreen>
        </iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>360° Virtual Tour</Text>
          <Text style={styles.headerSubtitle}>{site.name}</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Info banner */}
      <View style={styles.infoBanner}>
        <Ionicons name="globe-outline" size={18} color="#006B3F" />
        <Text style={styles.infoText}>
          Drag to look around in 360° · Pinch to zoom
        </Text>
      </View>

      {/* Street View WebView */}
      <View style={styles.webviewContainer}>
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          startInLoadingState
          javaScriptEnabled
          domStorageEnabled
          onLoadEnd={() => setLoading(false)}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#006B3F" />
              <Text style={styles.loadingText}>
                Loading 360° view...
              </Text>
            </View>
          )}
        />
      </View>

      {/* Bottom note */}
      <View style={styles.bottomNote}>
        <Ionicons name="location-sharp" size={14} color="rgba(255,255,255,0.7)" />
        <Text style={styles.bottomNoteText}>
          {site.region} · Powered by Google Street View
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FCD116',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5EE',
    padding: 12,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#006B3F',
  },
  webviewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#888888',
  },
  bottomNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#1A1A2E',
    padding: 12,
  },
  bottomNoteText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
});

export default VirtualTourScreen;