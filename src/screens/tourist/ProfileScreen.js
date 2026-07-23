import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentUser } from '../../utils/currentUser';
import { signOut } from '../../utils/auth';
import BottomNav from '../../components/BottomNav';

const ProfileScreen = ({ navigation }) => {

  // Get the real logged-in user
  const loggedInUser = getCurrentUser();

  const user = {
    name: loggedInUser?.fullName || 'Guest User',
    email: loggedInUser?.email || 'guest@example.com',
    role: loggedInUser?.role
      ? loggedInUser.role.charAt(0).toUpperCase() + loggedInUser.role.slice(1)
      : 'Tourist',
  }; 
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            navigation.replace('Welcome');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name.charAt(0)}
              </Text>
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                {user.role}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Account Options ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingsCard}>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('MyTickets')}
            >
              <Ionicons
                name="ticket-outline"
                size={20}
                color="#006B3F"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>My Tickets</Text>
              <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('MyTrips')}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#006B3F"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>My Trips</Text>
              <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color="#006B3F"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Edit Profile</Text>
              <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#006B3F"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>
                Change Password
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('Help')}
            >
              <Ionicons
                name="help-circle-outline"
                size={20}
                color="#006B3F"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>
                Help & Support
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate('Terms')}
            >
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#006B3F"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>
                Terms & Privacy Policy
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
            </TouchableOpacity>

          </View>
        </View>

        {/* ── Logout ── */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#CE1126" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>
            VisitGhana v1.0.0
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      {/* Bottom Navigation */}
      <BottomNav navigation={navigation} activeRoute="Profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#006B3F',
    paddingTop: 55,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCD116',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FCD116',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 10,
  },
  roleBadge: {
    backgroundColor: 'rgba(252,209,22,0.25)',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FCD116',
  },
  roleBadgeText: {
    color: '#FCD116',
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  settingIcon: {
    width: 28,
    textAlign: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#888888',
    marginTop: 1,
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginLeft: 56,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF0F0',
    borderWidth: 1.5,
    borderColor: '#CE1126',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  logoutText: {
    color: '#CE1126',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionText: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
  },
});

export default ProfileScreen;