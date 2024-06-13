import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View,ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';
import { getPaymentStatusById, handleIntegrationMP } from './PaymentScreenWebBrowser';

export default function PaymentScreen() {
    const [paymentLink, setPaymentLink] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1); // Estado para la cantidad de hrs
    const [showWebView, setShowWebView] = useState(false); // Estado para mostrar el WebView

    const fetchData = useCallback(async () => {
        try {
            const { init_point, paymentId } = await handleIntegrationMP(quantity);
            setPaymentLink(init_point);
            setPaymentId(paymentId);
        } catch (error) {
            setError(error);
        }
    }, [quantity]);

    useFocusEffect(
        useCallback(() => {
            setShowWebView(false); //sale del webview
            setError(null); // Restablece el estado de error
            fetchData();
        }, [fetchData])
    );

    if (showWebView && paymentLink) {
        console.log("payment link", paymentLink);
        return (
            <SafeAreaView style={styles.webViewContainer}>
                <WebView source={{ uri: paymentLink }} />
            </SafeAreaView>
        );
    }

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.label}>Ingrese la cantidad de Horas valor de la hora 0,05:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={text => setQuantity(Number(text))}
                        value={String(quantity)}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Pagar con Mercado Pago"
                            onPress={() => {
                                if (paymentLink) {
                                    setShowWebView(true);
                                } else {
                                    Alert.alert('Error', 'No hay enlace de pago disponible');
                                }
                            }}
                        />
                    </View>
                    {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    buttonContainer: {
        marginBottom: 16,
    },
    errorText: {
        color: 'red',
    },
    webViewContainer: {
        flex: 1,
        marginTop: 40
    },
});