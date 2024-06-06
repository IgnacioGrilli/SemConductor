import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from "moment";
import { auth } from '../../configFirebase';

function Control({ isRunning, handleButtonPress }) {

    const [saldo, setSaldo] = useState();
    const [disabled, setDisabled] = useState(false);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const obtenerUsuarioActual = async () => {
            const usuarioActual = auth.currentUser;
            if (usuarioActual) {
                setUserId(usuarioActual.email);
            }
        };
        console.log('entroo');
        console.log(userId);
        obtenerUsuarioActual();
    }, []);

    useEffect(() => {
        const obtenerSaldo = async () => {
            try {
                const response = await fetch(`http://if012app.fi.mdn.unp.edu.ar:28001/conductor/saldo/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setSaldo(data);
                } else {
                    console.error('Error al obtener las transacciones:', response.status);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }

        }
        obtenerSaldo();
    }, [userId,saldo]);


    function f() {
        checkSaldo();
        checkHorario();
        //console.log("Saldo insuficiente.")
    }
    function checkSaldo() {
        if (saldo < 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    function checkHorario() {
        fetch("http://if012app.fi.mdn.unp.edu.ar:28001/ValorMinuto/horario", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                var horaInicio = moment().format("HH")
                //var horaInicio = 8;
                console.log("Son las ", horaInicio);
                if ((horaInicio >= data.hsInicioM && horaInicio < data.hsFinM) || (horaInicio >= data.hsInicioT && horaInicio < data.hsFinT)) {
                    console.log("Esta en horario.");
                    setDisabled(false);
                } else {
                    console.log("No esta en horario");
                    setDisabled(true);
                }

            });
    }

    useEffect(() => {
        f();
    });


    return(
        <View>
            <TouchableOpacity
                activeOpacity={disabled ? 1 : 0.1}
                style={disabled ? [
                    styles.controlButtonBorderDisabled,
                    styles.button,
                    {backgroundColor: isRunning ? '#d62828' : '#2a9d8f'},
                ] : [
                    styles.controlButtonBorder,
                    styles.button,
                    {backgroundColor: isRunning ? '#d62828' : '#2a9d8f'},
                ]}
                onPress = {disabled ? f : handleButtonPress}
            >
                <View
                    style={styles.controlButton}
                >
                    <Text
                        style={{ color: '#fff' }}
                    >
                        {isRunning ? "Finalizar" : "Iniciar"}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    controlButtonBorder: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 70
    },
    controlButtonBorderDisabled: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 70,
        opacity: 0.5
    },
    controlButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 70
    },
    button: {
        marginTop: 200,
        width: 100,
        height: 100,
        justifyContent:'center',
        alignItems:'center'
    }
});
export default React.memo(Control);