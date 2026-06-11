import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/auth/SplashScreen';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import HomeScreen from './src/screens/tourist/HomeScreen';
import SitesScreen from './src/screens/tourist/SitesScreen';
import SiteDetailsScreen from './src/screens/tourist/SiteDetailsScreen';
import UploadScreen from './src/screens/tourist/UploadScreen';
import MapScreen from './src/screens/tourist/MapScreen';
import ProfileScreen from './src/screens/tourist/ProfileScreen';
import StaffDashboard from './src/screens/staff/StaffDashboard';
import PhotoModerationScreen from './src/screens/staff/PhotoModerationScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sites" component={SitesScreen} />
        <Stack.Screen name="SiteDetail" component={SiteDetailsScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="StaffDashboard" component={StaffDashboard} />
        <Stack.Screen name="PhotoModeration" component={PhotoModerationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}