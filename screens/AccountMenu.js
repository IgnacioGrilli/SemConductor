import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { auth } from '../configFirebase';

const AccountMenu = () => {
    const [userId, setUserId] = useState('');
    const [transacciones, setTransacciones] = useState([]);
    const [infracciones, setInfracciones] = useState([]);
    const [mostrarHistorialTransacciones, setMostrarHistorialTransacciones] = useState(true);
    const [patentes, setPatentes] = useState([]);
    const [patenteSeleccionada, setPatenteSeleccionada] = useState('');

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
        const obtenerTransacciones = async () => {
            try {
                const response = await fetch(`http://if012app.fi.mdn.unp.edu.ar:28001/transaccion/all/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setTransacciones(data);
                } else {
                    console.error('Error al obtener las transacciones:', response.status);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        if (mostrarHistorialTransacciones) {
            obtenerTransacciones();
        }
    }, [userId, mostrarHistorialTransacciones]);

    useEffect(() => {
        const obtenerInfracciones = async () => {
            if (!patenteSeleccionada) return;

            try {
                const response = await fetch(`http://if012app.fi.mdn.unp.edu.ar:28001/infraccion/all/${patenteSeleccionada}`);
                if (response.ok) {
                    const data = await response.json();
                    setInfracciones(data);
                } else {
                    console.error('Error al obtener las infracciones:', response.status);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        if (!mostrarHistorialTransacciones) {
            obtenerInfracciones();
        }
    }, [patenteSeleccionada]);

    useEffect(() => {
        const obtenerPatentes = async () => {
            try {
                const response = await fetch(`http://if012app.fi.mdn.unp.edu.ar:28001/conductorPatente/patUsuario/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setPatentes(data);
                    if (data.length > 0) {
                        setPatenteSeleccionada(data[0]); // Seleccionar la primera patente por defecto
                    }
                } else {
                    console.error('Error al obtener las patentes:', response.status);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        obtenerPatentes();
    }, [userId]);

    const handleLogout = () => {
        // Implementa aquí la lógica para cerrar sesión
    };

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={styles.background}
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => setMostrarHistorialTransacciones(true)}
                >
                    <Text style={styles.menuText}>Historial de Transacciones</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => setMostrarHistorialTransacciones(false)}
                >
                    <Text style={styles.menuText}>Historial de Infracciones</Text>
                </TouchableOpacity>

                {!mostrarHistorialTransacciones && (
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerLabel}>Seleccionar Patente:</Text>
                        <Picker
                            selectedValue={patenteSeleccionada}
                            style={styles.picker}
                            onValueChange={(itemValue) => setPatenteSeleccionada(itemValue)}
                        >
                            {patentes.map((patente) => (
                                <Picker.Item key={patente.numero} label={patente.numero} value={patente.numero} />
                            ))}
                        </Picker>
                    </View>
                )}

                <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                    <Text style={[styles.menuText, styles.logout]}>Cerrar sesión</Text>
                </TouchableOpacity>

                <ScrollView style={styles.scrollView}>
                    {mostrarHistorialTransacciones ? (
                        <>
                            <Text style={styles.historialTitle}>Historial de Transacciones:</Text>
                            {transacciones.map(transaccion => (
                                <View key={transaccion.id} style={styles.transaccion}>
                                    <Text>Fecha: {formatoFecha(transaccion.fecha)}</Text>
                                    <Text>Hora: {transaccion.hora}</Text>
                                    <Text>Monto: {transaccion.montoTransaccion}</Text>
                                </View>
                            ))}
                        </>
                    ) : (
                        <>
                            <Text style={styles.historialTitle}>Historial de Infracciones:</Text>
                            {infracciones.map(infraccion => (
                                <View key={infraccion.id} style={styles.infraccion}>
                                    <Text>Fecha: {formatoFecha(infraccion.fecha)}</Text>
                                    <Text>Hora: {formatoHora(infraccion.hora)}</Text>
                                </View>
                            ))}
                        </>
                    )}
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

// Función para formatear la fecha
const formatoFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    return `${dia}/${mes}`;
};

//Función para formatear la hora
const formatoHora = (hora) => {
    const [horas, minutos, segundos] = hora.split(':');
    let horasInt = parseInt(horas);
    const ampm = horasInt >= 12 ? 'PM' : 'AM';
    horasInt = horasInt % 12 || 12; // Convertir de 24 horas a 12 horas
    return `${horasInt}:${minutos} ${ampm}`;
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        padding: 16,
        marginTop: 30
    },
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 12,
    },
    menuText: {
        fontSize: 16,
    },
    logout: {
        color: 'red',
    },
    scrollView: {
        marginTop: 10,
    },
    historialTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    transaccion: {
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
    },
    infraccion: {
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    pickerLabel: {
        marginRight: 10,
    },
    picker: {
        height: 50,
        flex: 1,
    },
});

export default AccountMenu;