import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';

const TicketSuccessScreen = ({ route, navigation }) => {
  const { ticket } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Success Icon */}
        <View style={styles.successCircle}>
          <Ionicons name="checkmark" size={50} color="#006B3F" />
        </View>

        <Text style={styles.successTitle}>
          Payment Successful!
        </Text>
        <Text style={styles.successSubtitle}>
          Your ticket has been confirmed
        </Text>

        {/* Ticket Card */}
        <View style={styles.ticketCard}>
          <View style={styles.ticketHeader}>
            <Text style={styles.ticketHeaderText}>
              VisitGhana Ticket
            </Text>
          </View>

          <View style={styles.ticketBody}>
            <Text style={styles.ticketSiteName}>
              {ticket.siteName}
            </Text>

            {/* QR Code */}
            <View style={styles.qrContainer}>
              <QRCode
                value={ticket.ticketCode || 'VG-TICKET'}
                size={140}
                color="#1A1A1A"
                backgroundColor="#ffffff"
              />
            </View>
            <Text style={styles.qrCode}>
              {ticket.ticketCode}
            </Text>

            <View style={styles.ticketDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Adults</Text>
                <Text style={styles.detailValue}>
                  {ticket.adults}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Children</Text>
                <Text style={styles.detailValue}>
                  {ticket.children}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Paid</Text>
                <Text style={styles.detailValuePaid}>
                  GHS {ticket.totalAmount}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status</Text>
                <View style={styles.paidBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={13}
                    color="#006B3F"
                  />
                  <Text style={styles.paidBadgeText}>
                    Paid
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.ticketNote}>
          Show this ticket code at the entrance gate
        </Text>

        <TouchableOpacity
          style={styles.viewTicketsButton}
          onPress={() => navigation.navigate('MyTickets')}
        >
          <Text style={styles.viewTicketsText}>
            View My Tickets
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#006B3F' },
  scrollContent: {
    padding: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  successCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FCD116',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  successSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 30,
  },
  ticketCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  ticketHeader: {
    backgroundColor: '#1A1A2E',
    padding: 14,
    alignItems: 'center',
  },
  ticketHeaderText: {
    color: '#FCD116',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  ticketBody: {
    padding: 20,
    alignItems: 'center',
  },
  ticketSiteName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  qrContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },
  qrCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006B3F',
    letterSpacing: 2,
    marginBottom: 20,
  },
  ticketDetails: {
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#888888',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  detailValuePaid: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5EE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paidBadgeText: {
    fontSize: 12,
    color: '#006B3F',
    fontWeight: '600',
  },
  ticketNote: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 24,
  },
  viewTicketsButton: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#FCD116',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  viewTicketsText: {
    color: '#FCD116',
    fontSize: 16,
    fontWeight: 'bold',
  },
  doneButton: {
    width: '100%',
    backgroundColor: '#FCD116',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#006B3F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TicketSuccessScreen;