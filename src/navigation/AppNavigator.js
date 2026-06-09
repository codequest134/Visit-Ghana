import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppNavigator = () => {
  return (
    <View style={styles.container}>
      <Text>App Navigator</Text>
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

export default AppNavigator;