import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const AudioGuideScreen = ({ route, navigation }) => {
  const { site } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // The text to read — combine description and history
  const guideText = site.history
    ? `Welcome to ${site.name}. ${site.description}. Now, here is the history. ${site.history}`
    : `Welcome to ${site.name}. ${site.description}`;

  useEffect(() => {
    // Stop speech when leaving the screen
    return () => {
      Speech.stop();
    };
  }, []);

  const handlePlay = () => {
    if (isPaused) {
      // Resume
      Speech.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      // Start fresh
      setIsDone(false);
      Speech.speak(guideText, {
        language: 'en',
        pitch: 1.0,
        rate: 0.9,
        onDone: () => {
          setIsPlaying(false);
          setIsPaused(false);
          setIsDone(true);
        },
        onStopped: () => {
          setIsPlaying(false);
          setIsPaused(false);
        },
      });
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    Speech.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    Speech.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setIsDone(false);
  };

  const handleReplay = () => {
    Speech.stop();
    setIsDone(false);
    setIsPaused(false);
    setTimeout(() => {
      handlePlay();
    }, 300);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          Speech.stop();
          navigation.goBack();
        }}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Audio Guide</Text>
          <Text style={styles.headerSubtitle}>{site.name}</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Site Card */}
        <View style={[styles.siteCard,
          { backgroundColor: site.color || '#1A4A6B' }]}>
          <Text style={styles.siteCardName}>{site.name}</Text>
          <View style={styles.siteCardRow}>
            <Ionicons
              name="location-sharp"
              size={14}
              color="rgba(255,255,255,0.85)"
            />
            <Text style={styles.siteCardRegion}>{site.region}</Text>
          </View>
        </View>

        {/* Audio Player */}
        <View style={styles.playerCard}>
          {/* Status */}
          <View style={styles.statusRow}>
            <View style={[styles.statusDot,
              { backgroundColor: isPlaying ? '#006B3F' : isPaused ? '#FFA000' : isDone ? '#006B3F' : '#CCCCCC' }
            ]} />
            <Text style={styles.statusText}>
              {isPlaying ? 'Playing...' :
               isPaused ? 'Paused' :
               isDone ? 'Finished' :
               'Ready to play'}
            </Text>
          </View>

          {/* Animated icon */}
          <View style={styles.iconContainer}>
            <View style={[styles.iconCircle,
              isPlaying && styles.iconCirclePlaying]}>
              <Ionicons
                name={isPlaying ? 'volume-high' :
                      isDone ? 'checkmark-circle' : 'headset'}
                size={48}
                color={isPlaying ? '#006B3F' : isDone ? '#006B3F' : '#888888'}
              />
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            {/* Stop */}
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={handleStop}
              disabled={!isPlaying && !isPaused}
            >
              <Ionicons
                name="stop-circle"
                size={44}
                color={isPlaying || isPaused ? '#CE1126' : '#DDDDDD'}
              />
              <Text style={styles.controlLabel}>Stop</Text>
            </TouchableOpacity>

            {/* Play / Pause */}
            {isPlaying ? (
              <TouchableOpacity
                style={styles.controlBtn}
                onPress={handlePause}
              >
                <View style={styles.mainPlayBtn}>
                  <Ionicons name="pause" size={36} color="#ffffff" />
                </View>
                <Text style={styles.controlLabel}>Pause</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.controlBtn}
                onPress={isDone ? handleReplay : handlePlay}
              >
                <View style={styles.mainPlayBtn}>
                  <Ionicons
                    name={isDone ? 'refresh' : 'play'}
                    size={36}
                    color="#ffffff"
                  />
                </View>
                <Text style={styles.controlLabel}>
                  {isDone ? 'Replay' : isPaused ? 'Resume' : 'Play'}
                </Text>
              </TouchableOpacity>
            )}

            {/* Replay */}
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={handleReplay}
              disabled={!isPlaying && !isPaused && !isDone}
            >
              <Ionicons
                name="refresh-circle"
                size={44}
                color={isPlaying || isPaused || isDone ? '#006B3F' : '#DDDDDD'}
              />
              <Text style={styles.controlLabel}>Restart</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Guide Text Preview */}
        <View style={styles.textCard}>
          <Text style={styles.textCardTitle}>Guide Transcript</Text>
          <Text style={styles.textCardBody}>{guideText}</Text>
        </View>

        {/* Tip */}
        <View style={styles.tipCard}>
          <Ionicons name="bulb-outline" size={20} color="#E65100" />
          <Text style={styles.tipText}>
            Put your phone in your pocket and explore the site while listening to the guide
          </Text>
        </View>

        <View style={{ height: 40 }} />
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
  scrollContent: {
    padding: 20,
  },
  siteCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  siteCardName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  siteCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  siteCardRegion: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  playerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '500',
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCirclePlaying: {
    backgroundColor: '#E8F5EE',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  controlBtn: {
    alignItems: 'center',
    gap: 6,
  },
  controlLabel: {
    fontSize: 12,
    color: '#888888',
  },
  mainPlayBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#006B3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  textCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  textCardBody: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 21,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FFA000',
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#555555',
    lineHeight: 18,
  },
});

export default AudioGuideScreen;