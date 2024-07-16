import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ImageBackground, Button, FlatList, TouchableOpacity } from 'react-native';
import { auth } from '../configFirebase';

const StackScreen = () => {
    const [patente, setPatente] = useState("");
    const [saldo, setSaldo] = useState('');
    const [userId, setUserId] = useState('');
    const [conductorId, setConductorId] = useState(null);
    const [patentes, setPatentes] = useState([]);

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


    useEffect(() => {
        const obtenerConductorId = async () => {
            if (!userId) return; // Asegura que el userId esté disponible antes de hacer la solicitud
            try {
                const response = await fetch(`http://if012app.fi.mdn.unp.edu.ar:28001/conductor/mail/${userId}/`);
                if (response.ok) {
                    const data = await response.json();
                    setConductorId(data.id);
                } else {
                    console.error('Error al obtener el ID del conductor:', response.status);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        obtenerConductorId();
    }, [userId]);

    const obtenerPatentes = async () => {
        if (!conductorId) return;
        try {
            const response = await fetch(`http://if012app.fi.mdn.unp.edu.ar:28001/conductorPatente/byConductor/${conductorId}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data); //comprobar que traiga todo los datos del registro para dsp pasar el id para eliminar
                setPatentes(data);
            } else {
                console.error('Error al obtener las patentes:', response.status);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    useEffect(() => {
        obtenerPatentes();
    }, [conductorId]);




    const validateNumero = (patente) => {
        var reg = /([A-Z]{3}[0-9]{3})|([A-Z]{2}[0-9]{3}[A-Z]{2})/;
        return reg.test(patente);
    };

    const postPatenteOnPress = (patente, conductorId) => {
        fetch('http://if012app.fi.mdn.unp.edu.ar:28001/conductorPatente/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "patente": {
                    "numero": patente
                },
                "conductor": {
                    "id": conductorId
                }
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                // Actualizar la lista de patentes después de agregar una nueva
                obtenerPatentes();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const eliminarPatenteOnPress = (numeroPat) => {
        fetch(`http://if012app.fi.mdn.unp.edu.ar:28001/conductorPatente/delete/${numeroPat}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Patente eliminada');
                    // Actualizar la lista de patentes después de eliminar una
                    obtenerPatentes();
                } else {
                    console.error('Error al eliminar la patente:', response.status);
                }
            })
            .catch((error) => {
                console.error('Error de red:', error);
            });
    };


    const handleSubmit = () => {
        if (!validateNumero(patente)) {
            console.log("incorrecto");
        } else {
            console.log(patente);
            if (conductorId) {
                postPatenteOnPress(patente, conductorId);
            } else {
                console.error("Conductor ID no disponible");
            }
        }
    };

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.userEmailContainer}>
                    <Text style={styles.userEmail}>{userId}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.saldoDispo}>
                        Saldo Disponible:
                    </Text>
                    <Text style={styles.saldo}>
                        {saldo}$
                    </Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Carga manual de patentes
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese su nueva Patente"
                        onChangeText={(text) => setPatente(text)}
                        onSubmitEditing={() => {
                            handleSubmit(patente);
                            setPatente("");
                        }}
                        autoCapitalize="characters"
                        maxLength={7}
                        value={patente}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Guardar mi Patente</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={patentes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.patenteContainer}>
                            <Text style={styles.patenteText}>{item.patente.numero}</Text>
                            <TouchableOpacity
                                style={styles.eliminarButton}
                                onPress={() => eliminarPatenteOnPress(item.id)}
                            >
                                <Text style={styles.eliminarButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

// Modificaciones en los estilos
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
        padding: 20,
        marginTop: 25
    },
    userEmailContainer: {
        marginBottom: 20,
    },
    userEmail: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
    },
    titleContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    saldoDispo: {
        fontSize: 22,
        color: '#000',
        textAlign: 'center',
        marginBottom: 5,
    },
    saldo: {
        fontSize: 28,
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    inputContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 45,
        width: 200,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    patenteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
    },
    patenteText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    eliminarButton: {
        backgroundColor: '#ff4444',
        padding: 10,
        borderRadius: 20,
    },
    eliminarButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default StackScreen;