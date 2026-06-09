import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PhotoModerationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Photo Moderation Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PhotoModerationScreen;