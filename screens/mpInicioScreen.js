import Env from 'react-native-config';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';

import * as MercadoPagoService from './mercadopago-service';

export default function MPScreen() {
  const [paymentResult, setPaymentResult] = useState(null);

  const startCheckout = async () => {
    try {
      const preferenceId = await MercadoPagoService.getPreferenceId('payer@email.com', {
        title: 'Dummy Item Title',
        description: 'Dummy Item Description',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: 100.0,
      });

      const payment = await MercadoPagoCheckout.createPayment({
        publicKey: 'APP_USR-360de2fc-0b1e-4046-a5b3-6c53be74b083',
        preferenceId,
      });

      setPaymentResult(payment);
    } catch (err) {
      Alert.alert('Something went wrong', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.container}
        onPress={startCheckout}>
        <Text>Start Payment</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Payment: {JSON.stringify(paymentResult)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    fontSize: 90,
    marginTop: 130,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    alignItems: 'center',
    justifyContent: 'center'
    },

});