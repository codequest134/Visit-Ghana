import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ⬇️ Your backend address
const BASE_URL = 'http://192.168.100.4:8081/api';

const ADULT_PRICE = 40;   // GHS per adult
const CHILD_PRICE = 20;   // GHS per child

const BuyTicketScreen = ({ route, navigation }) => {
  const { site } = route.params;
  const [adults, setAdults]     = useState(1);
  const [children, setChildren] = useState(0);
  const [loading, setLoading]   = useState(false);

  const totalAmount =
    (adults * ADULT_PRICE) + (children * CHILD_PRICE);

  const handlePay = async () => {
    if (adults === 0 && children === 0) {
      Alert.alert('Select Tickets',
        'Please add at least one ticket.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/payments/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          siteId: site.siteId,
          siteName: site.name,
          adults: adults,
          children: children,
          totalAmount: totalAmount,
          email: 'tourist@example.com',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        navigation.navigate('Payment', {
          authUrl: data.authorization_url,
          reference: data.reference,
          ticketInfo: { site, adults, children, totalAmount },
        });
      } else {
        Alert.alert('Error',
          'Could not start payment. Please try again.');
      }
    } catch (err) {
      Alert.alert('Connection Error',
        'Check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buy Tickets</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Site Info */}
        <View style={[styles.siteCard,
          { backgroundColor: site.color || '#1A4A6B' }]}>
          <Text style={styles.siteName}>{site.name}</Text>
          <View style={styles.siteRegionRow}>
            <Ionicons
              name="location-sharp"
              size={14}
              color="rgba(255,255,255,0.85)"
            />
            <Text style={styles.siteRegion}>{site.region}</Text>
          </View>
        </View>

        {/* Adult Tickets */}
        <View style={styles.ticketRow}>
          <View style={styles.ticketInfo}>
            <Text style={styles.ticketType}>Adult</Text>
            <Text style={styles.ticketPrice}>
              GHS {ADULT_PRICE} each
            </Text>
          </View>
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() =>
                setAdults(Math.max(0, adults - 1))}
            >
              <Ionicons name="remove" size={20} color="#006B3F" />
            </TouchableOpacity>
            <Text style={styles.counterValue}>{adults}</Text>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => setAdults(adults + 1)}
            >
              <Ionicons name="add" size={20} color="#006B3F" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Child Tickets */}
        <View style={styles.ticketRow}>
          <View style={styles.ticketInfo}>
            <Text style={styles.ticketType}>Child</Text>
            <Text style={styles.ticketPrice}>
              GHS {CHILD_PRICE} each
            </Text>
          </View>
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() =>
                setChildren(Math.max(0, children - 1))}
            >
              <Ionicons name="remove" size={20} color="#006B3F" />
            </TouchableOpacity>
            <Text style={styles.counterValue}>{children}</Text>
            <TouchableOpacity
              style={styles.counterBtn}
              onPress={() => setChildren(children + 1)}
            >
              <Ionicons name="add" size={20} color="#006B3F" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Adults ({adults})
            </Text>
            <Text style={styles.summaryValue}>
              GHS {adults * ADULT_PRICE}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Children ({children})
            </Text>
            <Text style={styles.summaryValue}>
              GHS {children * CHILD_PRICE}
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              GHS {totalAmount}
            </Text>
          </View>
        </View>

        <View style={styles.testNoteRow}>
          <Ionicons name="lock-closed" size={14} color="#888888" />
          <Text style={styles.testNote}>
            Test mode — use Paystack test card 4084 0840 8408 4081
          </Text>
        </View>

      </ScrollView>

      {/* Pay Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton,
            loading && styles.payButtonDisabled]}
          onPress={handlePay}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.payButtonText}>
              Pay GHS {totalAmount} with Paystack
            </Text>
          )}
        </TouchableOpacity>
      </View>

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
  scrollContent: { padding: 20 },
  siteCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  siteName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  siteRegionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  siteRegion: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  ticketInfo: { flex: 1 },
  ticketType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  ticketPrice: {
    fontSize: 13,
    color: '#888888',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  counterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F5EE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#006B3F',
  },
  counterValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    minWidth: 24,
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 14, color: '#555555' },
  summaryValue: { fontSize: 14, color: '#1A1A1A' },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006B3F',
  },
  testNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
  },
  testNote: {
    fontSize: 12,
    color: '#888888',
  },
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  payButton: {
    backgroundColor: '#006B3F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonDisabled: { backgroundColor: '#A0C4B4' },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BuyTicketScreen;