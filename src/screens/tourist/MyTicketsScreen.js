import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import BASE_URL from '../../utils/api';
import { getCurrentUser } from '../../utils/currentUser';


const MyTicketsScreen = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // For now userId is hardcoded as 1
  const user=getCurrentUser();
  const userId = user?.userId || 1;

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/payments/tickets/${userId}`
      );
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setTickets(data.reverse());
      setError(null);
    } catch (err) {
      setError('Could not load your tickets.');
    } finally {
      setLoading(false);
    }
  };

  const renderTicket = ({ item }) => (
    <View style={styles.ticketCard}>

      {/* Top colored strip */}
      <View style={styles.ticketTop}>
        <View style={styles.ticketTopLeft}>
          <Text style={styles.ticketLabel}>ENTRY TICKET</Text>
          <Text style={styles.ticketSite}>{item.siteName}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          item.paymentStatus === 'paid'
            ? styles.statusPaid
            : styles.statusPending,
        ]}>
          <Ionicons
            name={item.paymentStatus === 'paid'
              ? 'checkmark-circle'
              : 'time'}
            size={13}
            color={item.paymentStatus === 'paid'
              ? '#006B3F'
              : '#E65100'}
          />
          <Text style={[
            styles.statusText,
            item.paymentStatus === 'paid'
              ? styles.statusTextPaid
              : styles.statusTextPending,
          ]}>
            {item.paymentStatus === 'paid'
              ? 'Paid'
              : 'Pending'}
          </Text>
        </View>
      </View>

      {/* Dashed separator */}
      <View style={styles.dashedLine} />

      {/* Ticket details */}
      <View style={styles.ticketBody}>
        <View style={styles.ticketDetailRow}>
          <View style={styles.ticketDetail}>
            <Text style={styles.detailLabel}>Adults</Text>
            <Text style={styles.detailValue}>
              {item.adults}
            </Text>
          </View>
          <View style={styles.ticketDetail}>
            <Text style={styles.detailLabel}>Children</Text>
            <Text style={styles.detailValue}>
              {item.children}
            </Text>
          </View>
          <View style={styles.ticketDetail}>
            <Text style={styles.detailLabel}>Total</Text>
            <Text style={styles.detailValuePaid}>
              GHS {item.totalAmount}
            </Text>
          </View>
        </View>

        {/* Ticket code */}
        {item.ticketCode && (
          <View style={styles.codeContainer}>
             <View style={styles.qrWrapper}>
              <QRCode
                value={item.ticketCode}
                size={100}
                color="#1A1A1A"
                backgroundColor="#ffffff"
              />
            </View> 
            <Text style={styles.codeLabel}>Ticket Code</Text>
            <Text style={styles.codeValue}>
              {item.ticketCode}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Tickets</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#006B3F" />
          <Text style={styles.loadingText}>
            Loading your tickets...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Ionicons
            name="warning"
            size={56}
            color="#CE1126"
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadTickets}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : tickets.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons
            name="ticket-outline"
            size={56}
            color="#CCCCCC"
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.emptyTitle}>No tickets yet</Text>
          <Text style={styles.emptySubtitle}>
            Tickets you purchase will appear here
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Sites')}
          >
            <Text style={styles.browseText}>
              Browse Sites
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.ticketId.toString()}
          renderItem={renderTicket}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  listContent: {
    padding: 16,
  },
  ticketCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  ticketTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  ticketTopLeft: {
    flex: 1,
  },
  ticketLabel: {
    fontSize: 11,
    color: '#888888',
    letterSpacing: 1,
    marginBottom: 4,
  },
  ticketSite: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusPaid: {
    backgroundColor: '#E8F5EE',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextPaid: {
    color: '#006B3F',
  },
  statusTextPending: {
    color: '#E65100',
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderStyle: 'dashed',
    marginHorizontal: 16,
  },
  ticketBody: {
    padding: 16,
  },
  ticketDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  ticketDetail: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  detailValuePaid: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  codeContainer: {
    backgroundColor: '#1A1A2E',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  qrWrapper: {
  backgroundColor: '#ffffff',
  padding: 10,
  borderRadius: 8,
  marginBottom: 12,
},

  codeLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1,
    marginBottom: 4,
  },
  codeValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FCD116',
    letterSpacing: 2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 14,
    color: '#888888',
    marginTop: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#CE1126',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#006B3F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 24,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#006B3F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  browseText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MyTicketsScreen;