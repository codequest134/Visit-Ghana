import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HelpScreen = ({ navigation }) => {

  const openEmail = () => {
    Linking.openURL('mailto:support@visitghana.com');
  };

  const openPhone = () => {
    Linking.openURL('tel:+233201234567');
  };

  const FAQ = [
    {
      question: 'How do I buy a ticket?',
      answer: 'Open any tourist site, tap "Buy Ticket", select the number of adults and children, and pay securely through Paystack.',
    },
    {
      question: 'How do I upload a photo?',
      answer: 'Go to any site\'s detail page, tap the Photos tab, and press "+ Add Photo". You can take a new photo or choose from your gallery.',
    },
    {
      question: 'How do I plan a trip?',
      answer: 'Open any tourist site and tap "Plan Trip". Pick your visit date and the trip will be saved to your My Trips list.',
    },
    {
      question: 'How do I use the virtual tour?',
      answer: 'On any site\'s detail page, tap "360° Virtual Tour" to explore the location through Google Street View.',
    },
    {
      question: 'How do I get directions to a site?',
      answer: 'Tap "Directions" on any site\'s detail page. This will open Google Maps with navigation to the site.',
    },
    {
      question: 'Is my payment secure?',
      answer: 'Yes. All payments are processed through Paystack, a trusted and PCI-compliant payment gateway used across Africa.',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Contact Cards */}
        <Text style={styles.sectionTitle}>Contact Us</Text>

        <TouchableOpacity style={styles.contactCard} onPress={openEmail}>
          <View style={styles.contactIconWrap}>
            <Ionicons name="mail-outline" size={22} color="#006B3F" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Email Support</Text>
            <Text style={styles.contactValue}>support@visitghana.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} onPress={openPhone}>
          <View style={styles.contactIconWrap}>
            <Ionicons name="call-outline" size={22} color="#006B3F" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Phone Support</Text>
            <Text style={styles.contactValue}>+233 20 123 4567</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
        </TouchableOpacity>

        {/* FAQ */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        {FAQ.map((item, index) => (
          <View key={index} style={styles.faqCard}>
            <View style={styles.faqQuestionRow}>
              <Ionicons name="help-circle" size={20} color="#006B3F" />
              <Text style={styles.faqQuestion}>{item.question}</Text>
            </View>
            <Text style={styles.faqAnswer}>{item.answer}</Text>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfoCard}>
          <Ionicons name="information-circle-outline" size={22} color="#888888" />
          <View style={styles.appInfoText}>
            <Text style={styles.appInfoTitle}>VisitGhana v1.0.0</Text>
            <Text style={styles.appInfoSubtitle}>
              Built by Group 134 · Computer Science Department
            </Text>
          </View>
        </View>

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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    marginTop: 8,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    gap: 12,
  },
  contactIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F5EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: { flex: 1 },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 13,
    color: '#006B3F',
  },
  faqCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  faqAnswer: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 20,
    marginLeft: 28,
  },
  appInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  appInfoText: { flex: 1 },
  appInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  appInfoSubtitle: {
    fontSize: 12,
    color: '#888888',
  },
});

export default HelpScreen;