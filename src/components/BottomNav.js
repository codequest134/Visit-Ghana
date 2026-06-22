import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomNav = ({ navigation, activeRoute }) => {

  const tabs = [
    { name: 'Home',    label: 'Home',    icon: 'home',                iconOutline: 'home-outline' },
    { name: 'Sites',   label: 'Sites',   icon: 'business',            iconOutline: 'business-outline' },
    { name: 'Map',     label: 'Map',     icon: 'map',                 iconOutline: 'map-outline' },
    { name: 'Upload',  label: 'Upload',  icon: 'camera',              iconOutline: 'camera-outline' },
    { name: 'Profile', label: 'Profile', icon: 'person',              iconOutline: 'person-outline' },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        const isActive = activeRoute === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.navItem}
            onPress={() => {
              if (!isActive) {
                navigation.navigate(tab.name);
              }
            }}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.icon : tab.iconOutline}
              size={24}
              color={isActive ? '#006B3F' : '#999999'}
            />
            <Text style={[
              styles.navLabel,
              isActive && styles.navLabelActive,
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  navLabel: {
    fontSize: 10,
    color: '#999999',
  },
  navLabelActive: {
    color: '#006B3F',
    fontWeight: '600',
  },
});

export default BottomNav;