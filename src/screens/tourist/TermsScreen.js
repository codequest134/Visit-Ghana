import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TermsScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Privacy</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.sectionTitle}>Terms of Service</Text>
        <View style={styles.card}>
          <Text style={styles.bodyText}>
            Welcome to VisitGhana. By using this application, you agree to the following terms and conditions.
          </Text>

          <Text style={styles.subTitle}>1. Use of the App</Text>
          <Text style={styles.bodyText}>
            VisitGhana is a tourism application designed to help visitors discover and explore tourist sites across Ghana. The app provides information about sites, allows ticket purchases, photo uploads, trip planning, and navigation to tourist locations.
          </Text>

          <Text style={styles.subTitle}>2. User Accounts</Text>
          <Text style={styles.bodyText}>
            You are responsible for maintaining the confidentiality of your account credentials. All activities under your account are your responsibility. You must provide accurate information when creating an account.
          </Text>

          <Text style={styles.subTitle}>3. Payments</Text>
          <Text style={styles.bodyText}>
            All ticket payments are processed securely through Paystack. Tickets are non-refundable once purchased. Please ensure your ticket details are correct before completing payment.
          </Text>

          <Text style={styles.subTitle}>4. Photo Uploads</Text>
          <Text style={styles.bodyText}>
            By uploading photos to VisitGhana, you confirm that you have the right to share those images. Photos must be relevant to the tourist site and must not contain inappropriate, offensive, or copyrighted content.
          </Text>

          <Text style={styles.subTitle}>5. Content Accuracy</Text>
          <Text style={styles.bodyText}>
            While we strive to provide accurate and up-to-date information about tourist sites, opening hours, prices, and availability may change. We recommend confirming details directly with the site before your visit.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Privacy Policy</Text>
        <View style={styles.card}>
          <Text style={styles.subTitle}>Information We Collect</Text>
          <Text style={styles.bodyText}>
            When you create an account, we collect your name, email address, and encrypted password. When you purchase tickets, we process your payment details through Paystack. We do not store your payment card information.
          </Text>

          <Text style={styles.subTitle}>How We Use Your Information</Text>
          <Text style={styles.bodyText}>
            Your information is used to provide and improve the VisitGhana service, process ticket purchases, display your profile, and manage your planned trips and uploaded photos.
          </Text>

          <Text style={styles.subTitle}>Data Security</Text>
          <Text style={styles.bodyText}>
            Your password is encrypted using BCrypt hashing and is never stored in plain text. All communication between the app and our servers is conducted securely. Payment processing is handled by Paystack, which is PCI-DSS compliant.
          </Text>

          <Text style={styles.subTitle}>Your Rights</Text>
          <Text style={styles.bodyText}>
            You may update your profile information or delete your account at any time. If you have questions about your data, please contact us at support@visitghana.com.
          </Text>
        </View>

        <Text style={styles.lastUpdated}>
          Last updated: June 2026
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#006B3F',
    paddingTop: 55,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCD116',
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 21,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default TermsScreen;