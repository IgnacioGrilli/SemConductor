import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ImageBackground } from 'react-native';
import { auth } from '../configFirebase';

const StackScreen = () => {
    const [patente, setPatente] = useState("");
    const [saldo, setSaldo] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const obtenerUsuarioActual = async () => {
            const usuarioActual = auth.currentUser;
            if (usuarioActual) {
                setUserId(usuarioActual.email);
            }
        };
        obtenerUsuarioActual();
    }, []);

    useEffect(() => {
        const obtenerSaldo = async () => {
            if (!userId) return; // Asegura que el userId esté disponible antes de hacer la solicitud
            try {
                console.log('cargo nuevamente el saldo');
                const response = await fetch(`http://if012app.fi.mdn.unp.edu.ar:28001/conductor/saldo/${userId}`);
                if (response.ok) {
                    const data = await response.json(); // Analizar la respuesta como JSON
                    setSaldo(data);
                } else {
                    console.error('Error al obtener las transacciones:', response.status);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        obtenerSaldo(); // Obtener saldo cada vez que el componente se renderiza
    });

    const validateNumero = (patente) => {
        var reg = /([A-Z]{3}[0-9]{3})|([A-Z]{2}[0-9]{3}[A-Z]{2})/;
        return reg.test(patente);
    };

    const postPatenteOnPress = (patente) => {
        var date = moment().format('YYYY-MM-DD');
        var hour = moment().utcOffset('+00:00').format('HH:mm');

        fetch('http://if012app.fi.mdn.unp.edu.ar:28001/patentes/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "numero": patente
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            });
    };

    const handleSubmit = () => {
        if (!validateNumero(patente)) {
            console.log("incorrecto");
        } else {
            console.log(patente);
            postPatenteOnPress(patente);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/background.jpg')} // Asegúrate de que la ruta de la imagen sea correcta
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Carga manual de patentes
                    </Text>
                    <Text style={styles.saldoDispo}>
                        Saldo Disponible:
                    </Text>
                    <Text style={styles.saldo}>
                        {saldo}$
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Número de patente"
                        onChangeText={(text) => setPatente(text)}
                        onSubmitEditing={() => {
                            handleSubmit(patente);
                            setPatente("");
                        }}
                        autoCapitalize="characters"
                        maxLength={7}
                        value={patente}
                    />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
    },
    saldoDispo: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
    },
    saldo: {
        fontSize: 25,
        color: '#000',
        textAlign: 'center',
    },
    inputContainer: {
        marginTop: 20,
    },
    input: {
        height: 45,
        width: 250,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
    },
});

export default StackScreen;