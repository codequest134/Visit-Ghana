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

// ── Dummy Data ─────────────────────────────────────────────
const PENDING_PHOTOS = [
  {
    id: '1',
    site: 'Cape Coast Castle',
    uploader: 'Kwame Asante',
    caption: 'Beautiful view of the castle at sunset',
    uploadDate: 'Today, 9:30 AM',
    color: '#1A4A6B',
  },
  {
    id: '2',
    site: 'Kakum National Park',
    uploader: 'Sophie Lambert',
    caption: 'Walking the canopy bridge',
    uploadDate: 'Today, 8:15 AM',
    color: '#2D6A4F',
  },
  {
    id: '3',
    site: 'Labadi Beach',
    uploader: 'Kofi Mensah',
    caption: 'Weekend vibes at the beach',
    uploadDate: 'Yesterday, 5:45 PM',
    color: '#C0873F',
  },
];

const RECENT_ACTIVITY = [
  {
    id: '1',
    action: 'Photo approved',
    site: 'Elmina Castle',
    time: '2 hours ago',
    icon: '✅',
  },
  {
    id: '2',
    action: 'Site updated',
    site: 'Mole National Park',
    time: '4 hours ago',
    icon: '✏️',
  },
  {
    id: '3',
    action: 'Photo rejected',
    site: 'Labadi Beach',
    time: '5 hours ago',
    icon: '❌',
  },
  {
    id: '4',
    action: 'New site added',
    site: 'Paga Crocodile Pond',
    time: 'Yesterday',
    icon: '➕',
  },
];

// ── Component ──────────────────────────────────────────────
const StaffDashboard = ({ navigation }) => {
  const staffName = 'Ama Owusu';

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
          <View>
            <Text style={styles.greeting}>
              Welcome back 👋
            </Text>
            <Text style={styles.staffName}>{staffName}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                Staff Member
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
          >
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* ── Stats Overview ── */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard,
            { backgroundColor: '#E8F5EE' }]}>
            <Text style={styles.statIcon}>📸</Text>
            <Text style={[styles.statNumber,
              { color: '#006B3F' }]}>
              12
            </Text>
            <Text style={styles.statLabel}>
              Pending Photos
            </Text>
          </View>
          <View style={[styles.statCard,
            { backgroundColor: '#E3F0FF' }]}>
            <Text style={styles.statIcon}>🏛️</Text>
            <Text style={[styles.statNumber,
              { color: '#1A4A6B' }]}>
              48
            </Text>
            <Text style={styles.statLabel}>
              Sites Managed
            </Text>
          </View>
          <View style={[styles.statCard,
            { backgroundColor: '#FFF3E0' }]}>
            <Text style={styles.statIcon}>✅</Text>
            <Text style={[styles.statNumber,
              { color: '#E65100' }]}>
              94
            </Text>
            <Text style={styles.statLabel}>
              Photos Approved
            </Text>
          </View>
          <View style={[styles.statCard,
            { backgroundColor: '#FCE4EC' }]}>
            <Text style={styles.statIcon}>⚠️</Text>
            <Text style={[styles.statNumber,
              { color: '#CE1126' }]}>
              3
            </Text>
            <Text style={styles.statLabel}>
              Flagged Content
            </Text>
          </View>
        </View>

        {/* ── Quick Actions ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() =>
                navigation.navigate('PhotoModeration')}
            >
              <View style={[styles.actionIconBox,
                { backgroundColor: '#E8F5EE' }]}>
                <Text style={styles.actionIcon}>📸</Text>
              </View>
              <Text style={styles.actionLabel}>
                Review Photos
              </Text>
              <View style={styles.actionBadge}>
                <Text style={styles.actionBadgeText}>12</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() =>
                navigation.navigate('SiteManagement')}
            >
              <View style={[styles.actionIconBox,
                { backgroundColor: '#E3F0FF' }]}>
                <Text style={styles.actionIcon}>🏛️</Text>
              </View>
              <Text style={styles.actionLabel}>
                Manage Sites
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() =>
                navigation.navigate('SiteManagement')}
            >
              <View style={[styles.actionIconBox,
                { backgroundColor: '#FFF3E0' }]}>
                <Text style={styles.actionIcon}>➕</Text>
              </View>
              <Text style={styles.actionLabel}>
                Add New Site
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIconBox,
                { backgroundColor: '#FCE4EC' }]}>
                <Text style={styles.actionIcon}>🚨</Text>
              </View>
              <Text style={styles.actionLabel}>
                Flagged Items
              </Text>
              <View style={[styles.actionBadge,
                { backgroundColor: '#CE1126' }]}>
                <Text style={styles.actionBadgeText}>3</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

        {/* ── Pending Photos Preview ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Pending Review
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PhotoModeration')}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {PENDING_PHOTOS.map((photo) => (
            <View key={photo.id} style={styles.pendingCard}>
              <View style={[styles.pendingColorBox,
                { backgroundColor: photo.color }]}>
                <Text style={styles.pendingColorIcon}>📸</Text>
              </View>
              <View style={styles.pendingInfo}>
                <Text style={styles.pendingSite}>
                  {photo.site}
                </Text>
                <Text style={styles.pendingUploader}>
                  by {photo.uploader}
                </Text>
                <Text
                  style={styles.pendingCaption}
                  numberOfLines={1}
                >
                  {photo.caption}
                </Text>
                <Text style={styles.pendingTime}>
                  {photo.uploadDate}
                </Text>
              </View>
              <View style={styles.pendingActions}>
                <TouchableOpacity
                  style={styles.approveBtn}
                  onPress={() =>
                    navigation.navigate('PhotoModeration')}
                >
                  <Text style={styles.approveBtnText}>✓</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rejectBtn}>
                  <Text style={styles.rejectBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* ── Recent Activity ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Recent Activity
          </Text>
          <View style={styles.activityCard}>
            {RECENT_ACTIVITY.map((item, index) => (
              <View key={item.id}>
                <View style={styles.activityItem}>
                  <View style={styles.activityIconBox}>
                    <Text style={styles.activityIcon}>
                      {item.icon}
                    </Text>
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityAction}>
                      {item.action}
                    </Text>
                    <Text style={styles.activitySite}>
                      {item.site}
                    </Text>
                  </View>
                  <Text style={styles.activityTime}>
                    {item.time}
                  </Text>
                </View>
                {index < RECENT_ACTIVITY.length - 1 && (
                  <View style={styles.activityDivider} />
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

// ── Styles ─────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  // ── Header ───────────────────────────────────
  header: {
    backgroundColor: '#006B3F',
    paddingTop: 55,
    paddingBottom: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  staffName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FCD116',
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: 'rgba(252,209,22,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#FCD116',
  },
  roleBadgeText: {
    color: '#FCD116',
    fontSize: 12,
    fontWeight: '600',
  },
  logoutBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoutBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },

  // ── Stats Grid ───────────────────────────────
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 10,
  },
  statCard: {
    width: '47%',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#555555',
    textAlign: 'center',
  },

  // ── Sections ─────────────────────────────────
  section: {
    paddingHorizontal: 16,
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

  // ── Quick Actions ────────────────────────────
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  actionIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 26,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  actionBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#006B3F',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // ── Pending Cards ────────────────────────────
  pendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    gap: 12,
  },
  pendingColorBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingColorIcon: {
    fontSize: 24,
  },
  pendingInfo: {
    flex: 1,
    gap: 2,
  },
  pendingSite: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  pendingUploader: {
    fontSize: 12,
    color: '#006B3F',
    fontWeight: '500',
  },
  pendingCaption: {
    fontSize: 12,
    color: '#555555',
  },
  pendingTime: {
    fontSize: 11,
    color: '#888888',
  },
  pendingActions: {
    gap: 6,
  },
  approveBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E8F5EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#006B3F',
  },
  approveBtnText: {
    color: '#006B3F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rejectBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CE1126',
  },
  rejectBtnText: {
    color: '#CE1126',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ── Activity ─────────────────────────────────
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  activityIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIcon: {
    fontSize: 18,
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  activitySite: {
    fontSize: 12,
    color: '#888888',
  },
  activityTime: {
    fontSize: 11,
    color: '#888888',
  },
  activityDivider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginLeft: 64,
  },
});

export default StaffDashboard;