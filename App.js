import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/auth/SplashScreen';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import HomeScreen from './src/screens/tourist/HomeScreen';
import SitesScreen from './src/screens/tourist/SitesScreen';
import SiteDetailScreen from './src/screens/tourist/SiteDetailsScreen';
import UploadScreen from './src/screens/tourist/UploadScreen';
import MapScreen from './src/screens/tourist/MapScreen';
import ProfileScreen from './src/screens/tourist/ProfileScreen';
import BuyTicketScreen from './src/screens/tourist/BuyTicketScreen';
import PaymentScreen from './src/screens/tourist/PaymentScreen';
import TicketSuccessScreen from './src/screens/tourist/TicketSuccessScreen';
import MyTicketsScreen from './src/screens/tourist/MyTicketsScreen';
import VirtualTourScreen from './src/screens/tourist/VirtualTourScreen';
import MyTripsScreen from './src/screens/tourist/MyTripsScreen';
import FestivalDetailScreen from './src/screens/tourist/FestivalDetailScreen';
import HelpScreen from './src/screens/tourist/HelpScreen';
import TermsScreen from './src/screens/tourist/TermsScreen';
import EditProfileScreen from './src/screens/tourist/EditProfileScreen';
import ChangePasswordScreen from './src/screens/tourist/ChangePasswordScreen';
import AudioGuideScreen from './src/screens/tourist/AudioGuideScreen';

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
        <Stack.Screen name="SiteDetail" component={SiteDetailScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="BuyTicket" component={BuyTicketScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="TicketSuccess" component={TicketSuccessScreen} />
        <Stack.Screen name="MyTickets" component={MyTicketsScreen} />
        <Stack.Screen name="VirtualTour" component={VirtualTourScreen} />
        <Stack.Screen name="MyTrips" component={MyTripsScreen} />
        <Stack.Screen name="FestivalDetail" component={FestivalDetailScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="AudioGuide" component={AudioGuideScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
