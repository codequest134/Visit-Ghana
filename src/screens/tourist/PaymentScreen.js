import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

// ⬇️ Your backend address
const BASE_URL = 'http://192.168.100.4:8081/api';

const PaymentScreen = ({ route, navigation }) => {
  const { authUrl, reference } = route.params;
  const [verifying, setVerifying]   = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  // Detect when Paystack shows the success page
  const handleNavigationChange = (navState) => {
    const { url } = navState;

    if (
      url.includes('paystack.co/close') ||
      url.includes('trxref') ||
      url.includes('reference=') ||
      url.includes('/success')
    ) {
      setPaymentDone(true);
    }
  };

  const verifyPayment = async () => {
    setVerifying(true);

    try {
      const response = await fetch(`${BASE_URL}/payments/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: reference }),
      });

      if (response.ok) {
        const ticket = await response.json();
        navigation.replace('TicketSuccess', { ticket });
      } else {
        Alert.alert(
          'Payment Not Confirmed',
          'We could not confirm your payment yet. If you completed payment, please wait a moment and try confirming again.',
          [{ text: 'OK' }]
        );
        setVerifying(false);
      }
    } catch (err) {
      Alert.alert(
        'Connection Error',
        'Could not reach the server. Check your connection and try again.',
        [{ text: 'OK' }]
      );
      setVerifying(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Cancel Payment',
              'Are you sure you want to leave?',
              [
                { text: 'Stay', style: 'cancel' },
                {
                  text: 'Leave',
                  style: 'destructive',
                  onPress: () => navigation.goBack(),
                },
              ]
            );
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <Ionicons name="lock-closed" size={16} color="#FCD116" />
          <Text style={styles.headerTitle}>Secure Payment</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {verifying ? (
        <View style={styles.verifyingContainer}>
          <ActivityIndicator size="large" color="#006B3F" />
          <Text style={styles.verifyingText}>
            Confirming your payment...
          </Text>
        </View>
      ) : (
        <>
          {/* WebView with Paystack */}
          <WebView
            source={{ uri: authUrl }}
            onNavigationStateChange={handleNavigationChange}
            startInLoadingState
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  size="large"
                  color="#006B3F"
                />
                <Text style={styles.loadingText}>
                  Loading payment page...
                </Text>
              </View>
            )}
          />

          {/* Confirm Button — always visible at bottom */}
          <View style={styles.confirmBar}>
            <View style={styles.confirmHintRow}>
              {paymentDone && (
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color="#006B3F"
                />
              )}
              <Text style={styles.confirmHint}>
                {paymentDone
                  ? 'Payment complete? Tap below to get your ticket'
                  : 'After paying, tap below to confirm'}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                paymentDone && styles.confirmButtonReady,
              ]}
              onPress={verifyPayment}
            >
              <Text style={styles.confirmButtonText}>
                I Have Completed Payment
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCD116',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#888888',
  },
  verifyingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#006B3F',
    fontWeight: '600',
  },
  confirmBar: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  confirmHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 10,
  },
  confirmHint: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#A0C4B4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonReady: {
    backgroundColor: '#006B3F',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;