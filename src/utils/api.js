import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const api = () => {
  return (
    <View style={styles.container}>
      <Text>API Screen</Text>
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

export default api;