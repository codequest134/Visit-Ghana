import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SiteCard = () => {
  return (
    <View style={styles.container}>
      <Text>Site Card</Text>
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

export default SiteCard;