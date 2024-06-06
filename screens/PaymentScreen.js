import { handleIntegrationMP, getPaymentStatusById  } from './PaymentScreenWebBrowser';
import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { openBrowserAsync } from 'expo-web-browser';
import { View, Text, Button, Alert } from 'react-native';

/* PRUEBAA */
export default function PaymentScreen() {
    const [paymentLink, setPaymentLink] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { init_point, paymentId } = await handleIntegrationMP();
                // const init_point = await handleIntegrationMP();
                setPaymentLink(init_point);
                setPaymentId(paymentId);
                // checkPaymentStatus();
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    const checkPaymentStatus = async () => {
        try {
            if (paymentLink && paymentId) {
                const status = await getPaymentStatusById(paymentId);
                handlePaymentStatus(status);
                console.log('entra',status)
            }
        } catch (error) {
            console.error('Error al verificar el estado del pago:', error);
        }
    };

    /*  useEffect(() => {
       const interval = setInterval(() => {
         checkPaymentStatus();
       }, 5000);

       return () => clearInterval(interval);
     }, [paymentLink]);   */

    const handlePaymentStatus = (status) => {
        if (status === 'approved') {
            // Realiza acciones adicionales cuando el pago es aprobado
        } else if (status === 'pending') {
            // Decide cómo manejar un pago pendiente
        } else if (status === 'in_process') {
            // Decide cómo manejar un pago en proceso
        } else if (status === 'rejected') {
            // Decide cómo manejar un pago rechazado
        } else {
            console.log('entra 2 ');
            // Maneja otros estados de pago según sea necesario
        }
    };

    if (paymentLink) {
        console.log("ppayment link", paymentLink)
        return <WebView source={{ uri: paymentLink }} />;
    }

    return (
        <View>
            <Text>Cargando...</Text>
            {error && <Text>Error: {error.message}</Text>}
            <Button
                title="Abrir en el navegador"
                onPress={async () => {
                    const supported = await openBrowserAsync(paymentLink);
                    //  <WebView source={{ uri: paymentLink }} />;

                    if (!supported) {
                        console.error('No se pudo abrir el enlace en el navegador externo.');
                    }
                }}
            />
        </View>
    );
}


