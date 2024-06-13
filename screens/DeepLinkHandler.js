// DeepLinkHandler.js
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import { auth } from '../configFirebase';

const DeepLinkHandler = ({ children }) => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState('');
    const [handledURLs, setHandledURLs] = useState(new Set());

    const obtenerUsuarioActual = async () => {
        const usuarioActual = auth.currentUser;
        if (usuarioActual) {
            setUserId(usuarioActual.email);
            console.log('mail en el DeepLinkHandler', usuarioActual.email);
            return usuarioActual.email;
        } else {
            console.error('Usuario no autenticado 1');
            return null;
        }
    };

    const sumarSaldo = async (cantidad, email) => {
        try {
            const response = await fetch(
                `http://if012app.fi.mdn.unp.edu.ar:28001/conductor/newMovimiento/${cantidad}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mail: email,
                    }),
                }
            );
            const text = await response.text(); // Obtener respuesta en texto bruto
            console.log('Raw response:', text); // Imprimir respuesta en texto bruto
            // Si no necesitas analizar como JSON, puedes procesar `text` directamente aquí
            console.log('Success PUT, saldo cargado:', text);
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
        }
    };

    useEffect(() => {
        const handleOpenURL = async (event) => {
            const url = new URL(event.url);
            if (handledURLs.has(url.toString())) return; // Evitar manejar la misma URL varias veces
            setHandledURLs(new Set(handledURLs).add(url.toString()));

            console.log('URL recibida:', event.url);
            const collection_status = url.searchParams.get('collection_status');
            const cantidad = url.searchParams.get('quantity');
            console.log('cantidad', cantidad);
            console.log('Estado de la colección:', collection_status);

            if (collection_status === 'rejected' || collection_status === 'approved') { // cambiar por 'approved' en producción
                console.log('Redirigiendo a la pantalla anterior y reiniciando PaymentScreen');

                const email = await obtenerUsuarioActual(); // Asegurarse de que el usuario esté autenticado antes de proceder
                if (email) {
                    await sumarSaldo(cantidad, email);
                } else {
                    console.error('Usuario no autenticado 2');
                }

                Alert.alert(
                    'Pago Exitoso',
                    'Su pago ha sido aprobado.',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.goBack();
                            },
                        },
                    ],
                    { cancelable: false }
                );
            } else if (collection_status === 'failure') {
                Alert.alert('Pago Fallido', 'Su pago ha fallado. Inténtelo de nuevo.');
                navigation.goBack();
            } /* else if (collection_status === 'null') {
        Alert.alert('Pago Fallido(null)', 'Su pago ha fallado. Inténtelo de nuevo.');
        navigation.goBack();
      } */
        };

        const getUrlAndHandle = async () => {
            const initialUrl = await Linking.getInitialURL();
            if (initialUrl) handleOpenURL({ url: initialUrl });
        };

        getUrlAndHandle();

        const listener = Linking.addEventListener('url', handleOpenURL);

        return () => {
            listener.remove();
        };
    }, [navigation, handledURLs]);

    return children;
};

export default DeepLinkHandler;