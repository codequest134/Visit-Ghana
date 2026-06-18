import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

const ProfileScreen = ({ navigation }) => {

  // Dummy user data — replaced with real data later
  const user = {
    name: 'Kwame Mensah',
    email: 'kwame@example.com',
    role: 'Tourist',
    joinDate: 'June 2025',
    photosUploaded: 8,
    sitesVisited: 12,
    reviewsWritten: 5,
    badges: [
      { id: '1', icon: '🥾', label: 'Explorer',     earned: true  },
      { id: '2', icon: '📸', label: 'Photographer', earned: true  },
      { id: '3', icon: '🌍', label: 'Trailblazer',  earned: false },
      { id: '4', icon: '🏰', label: 'Historian',    earned: false },
      { id: '5', icon: '⭐', label: 'Critic',       earned: true  },
      { id: '6', icon: '🗺️', label: 'Navigator',    earned: false },
    ],
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
          onPress: () => navigation.replace('Welcome'),
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

        {/* ── Stats Row ── */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {user.photosUploaded}
            </Text>
            <Text style={styles.statLabel}>Photos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {user.sitesVisited}
            </Text>
            <Text style={styles.statLabel}>Sites Visited</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {user.reviewsWritten}
            </Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* ── Badges ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Badges</Text>
          <View style={styles.badgesGrid}>
            {user.badges.map((badge) => (
              <View
                key={badge.id}
                style={[
                  styles.badgeItem,
                  !badge.earned && styles.badgeItemLocked,
                ]}
              >
                <Text style={styles.badgeIcon}>
                  {badge.earned ? badge.icon : '🔒'}
                </Text>
                <Text style={[
                  styles.badgeLabel,
                  !badge.earned && styles.badgeLabelLocked,
                ]}>
                  {badge.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── My Photos ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Photos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {[
            {
              id: '1',
              site: 'Cape Coast Castle',
              status: 'approved',
              color: '#1A4A6B',
            },
            {
              id: '2',
              site: 'Kakum National Park',
              status: 'pending',
              color: '#2D6A4F',
            },
            {
              id: '3',
              site: 'Labadi Beach',
              status: 'approved',
              color: '#C0873F',
            },
          ].map((photo) => (
            <View key={photo.id} style={styles.photoStatusCard}>
              <View style={[styles.photoStatusColor,
                { backgroundColor: photo.color }]}
              />
              <View style={styles.photoStatusInfo}>
                <Text style={styles.photoStatusSite}>
                  {photo.site}
                </Text>
                <Text style={styles.photoStatusLabel}>
                  Uploaded to this site
                </Text>
              </View>
              <View style={[
                styles.statusBadge,
                photo.status === 'approved'
                  ? styles.statusApproved
                  : styles.statusPending,
              ]}>
                <Text style={[
                  styles.statusBadgeText,
                  photo.status === 'approved'
                    ? styles.statusApprovedText
                    : styles.statusPendingText,
                ]}>
                  {photo.status === 'approved'
                    ? '✓ Approved'
                    : '⏳ Pending'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── Settings ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🔔</Text>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>
                  Push Notifications
                </Text>
                <Text style={styles.settingSubtitle}>
                  Photo approvals and alerts
                </Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🌍</Text>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Language</Text>
                <Text style={styles.settingSubtitle}>English</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>⭐</Text>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>
                  Upgrade to Premium
                </Text>
                <Text style={styles.settingSubtitle}>
                  Offline mode, audio guides and more
                </Text>
              </View>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>Pro</Text>
              </View>
            </TouchableOpacity>

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
              <Text style={styles.settingIcon}>🎟️</Text>
              <Text style={styles.settingLabel}>My Tickets</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
           <View style={styles.settingDivider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>✏️</Text>
              <Text style={styles.settingLabel}>Edit Profile</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>🔒</Text>
              <Text style={styles.settingLabel}>
                Change Password
              </Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>❓</Text>
              <Text style={styles.settingLabel}>
                Help & Support
              </Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

            <View style={styles.settingDivider} />

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingIcon}>📄</Text>
              <Text style={styles.settingLabel}>
                Terms & Privacy Policy
              </Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* ── Logout ── */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>
            VisitGhana v1.0.0 · Member since {user.joinDate}
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  // ── Header ───────────────────────────────────
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

  // ── Stats ─────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006B3F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888888',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 8,
  },

  // ── Section ───────────────────────────────────
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 13,
    color: '#006B3F',
    fontWeight: '600',
  },

  // ── Badges ───────────────────────────────────
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badgeItem: {
    width: '30%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#006B3F',
  },
  badgeItemLocked: {
    borderColor: '#E0E0E0',
    backgroundColor: '#F8F8F8',
  },
  badgeIcon: {
    fontSize: 28,
  },
  badgeLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#006B3F',
    textAlign: 'center',
  },
  badgeLabelLocked: {
    color: '#AAAAAA',
  },

  // ── Photo Status ──────────────────────────────
  photoStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  photoStatusColor: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  photoStatusInfo: {
    flex: 1,
  },
  photoStatusSite: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  photoStatusLabel: {
    fontSize: 12,
    color: '#888888',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusApproved: {
    backgroundColor: '#E8F5EE',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusApprovedText: {
    color: '#006B3F',
  },
  statusPendingText: {
    color: '#E65100',
  },

  // ── Settings ──────────────────────────────────
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
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#888888',
    marginTop: 1,
  },
  settingArrow: {
    fontSize: 20,
    color: '#CCCCCC',
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginLeft: 56,
  },
  premiumBadge: {
    backgroundColor: '#FCD116',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  premiumBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },

  // ── Logout ────────────────────────────────────
  logoutButton: {
    backgroundColor: '#FFF0F0',
    borderWidth: 1.5,
    borderColor: '#CE1126',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
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