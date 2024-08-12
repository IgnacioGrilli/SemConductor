import React, { useCallback, useRef, useState, useEffect } from 'react';
import { SafeAreaView, Button, StyleSheet, Text, View } from 'react-native';
import Control from './CronometroController';
import { displayTime } from './CronometroUtil';
import moment from "moment";
import Mapa from './Mapa';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { auth } from '../../configFirebase';

export default function Cronometro() {


    const [showMap, setShowMap] = useState(false); // mapa con los horarios
    //manejo de horarios vigentes
    const [hsInicioM, setHsInicioM] = useState(false);
    const [hsFinM, setHsFinM] = useState(false);
    const [hsInicioT, setHsInicioT] = useState(false);
    const [hsFinT, setHsFinT] = useState(false);

    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [time, setTime] = useState(0);
    const [isRunning, setRunning] = useState(false);
    const [result, setResult] = useState(0);
    const timer = useRef(null);

    const [id, setId] = useState(null);

    const [patente, setPatente, getPatente] = useState("");
    const actualPatente = useRef();
    actualPatente.current = patente;

    const [patentes, setPatentes] = useState([]);
    const [patenteSeleccionada, setPatenteSeleccionada] = useState('');

    const [userId, setUserId] = useState('');
    
    useEffect(() => {
        const obtenerUsuarioActual = async () => {
            const usuarioActual = auth.currentUser;
            if (usuarioActual) {
                setUserId(usuarioActual.email);
                console.log("Usuario actual: ",usuarioActual);
            }
        };
        obtenerUsuarioActual();
    }, []);

    moment().format();

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Añade un 0 inicial si es necesario
        const day = String(date.getDate()).padStart(2, '0'); // Añade un 0 inicial si es necesario
        return `${year}-${month}-${day}`;
    };

    useFocusEffect(
        useCallback(() => {
            setShowMap(false); //sale del mapa
        }, [])
    );

    


    //ENVIA MAIL CON LOS RESULTADOS DEL ESTACIONAMIENTO
    const sendMail = async ({horaInicio, horaFin, valor, fecha}) => {
        console.log("mando mail");
        fecha = moment().format("DD-MM-YYYY");
        horaInicio = moment().format("HH:mm");
        await fetch(
            "http://if012app.fi.mdn.unp.edu.ar:28001/api/email/send",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    recipients: ["ezequielalb@outlook.com"],
                    subject: "Su estacionamiento medido ha finalizado",
                    body: "En el día de la fecha, " + fecha + ", usted estuvo estacionado desde las " + horaInicio+ " hasta las " + horaFin +
                        ", con un valor total de $"+valor+"."

                }),
            }
        )
            .then((response) => response.json());
    }

  /*   function getPatentesByUser() {
        fetch("http://if012app.fi.mdn.unp.edu.ar:28001/patentes/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {

                if (patentes.length === 0) {
                    console.log("Success:", data);
                    data.forEach(function (item) {
                        patentes.push(item.numero);
                    });
                    console.log(patentes);
                }
            });
    } */

    const createRegistro = async () => {
        //        var date = moment().format("YYYY-MM-DD");
        var horaInicio = moment().format("HH:mm");
        setDate(getCurrentDate);
        console.log("fecha actualizada:", date);
        console.log("Id antes de post:", id);
        setRunning((previousState) => !previousState)
        timer.current = setInterval(() => {
            setTime((previousTime) => previousTime + 1);
        }, 10);

        await fetch(
            "http://if012app.fi.mdn.unp.edu.ar:28001/registroPagos/new",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patente: {
                        numero: patenteSeleccionada,
                    },
                    fecha: date,
                    conductor: {
                        id: 2,
                    },
                    horaInicio: horaInicio,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Success POST:", data);
                setId(data.uuid);
                setDate(data.fecha);
                console.log("Fecha de hoy", date);
            });
    }

    const updateRegistro = async () => {
        setRunning((previousState) => !previousState);
        setTime(0);
        clearInterval(timer.current);

        if (!id) return;

        var horaFin = moment().format("HH:mm");
        console.log("Fecha antes de put: ", date);

        fetch(
            `http://if012app.fi.mdn.unp.edu.ar:28001/registroPagos/update/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patente: {
                        numero: patenteSeleccionada,
                    },
                    fecha: date,
                    conductor: {
                        id: 2,
                    },
                    horaFin: horaFin,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Success PUT:", data);
                setDate(data.fecha);
                console.log("Fecha despues de update:", date);

                sendMail(data);
            });

    }
    /*
        const handleButtonPress = useCallback(() => {
        if (!isRunning) {


                createRegistro();

            } else {

                updateRegistro;
            }


            setRunning((previousState) => !previousState);
        }, [isRunning]);
    */
        useFocusEffect(
            useCallback(() => {
            const obtenerPatentes = async () => {
                try {
                    const response = await fetch(`http://if012app.fi.mdn.unp.edu.ar:28001/conductorPatente/patUsuario/${userId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setPatentes(data);
                        if (data.length > 0) {
                            setPatenteSeleccionada(data[0].numero); // Seleccionar la primera patente por defecto
                            console.log("Patentes: ", data);
                        }
                    } else {
                        console.error('Error al obtener las patentes:', response.status);
                    }
                } catch (error) {
                    console.error('Error de red:', error);
                }
            };
            if (userId) {
                obtenerPatentes();
            }
        }, [userId])
    );


    function getHorario() {
        fetch("http://if012app.fi.mdn.unp.edu.ar:28001/ValorMinuto/horario", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setHsInicioM(data.hsInicioM);
                setHsFinM(data.hsFinM);
                setHsInicioT(data.hsInicioT);
                setHsFinT(data.hsFinT);
            });
    }
    if (showMap) {
        return (
            getHorario(),
                <SafeAreaView>
                    <Text style={styles.menuText}>Horarios: Lunes a Sábado {"\n"}
                        de {hsInicioM}hs a {hsFinM}hs y de {hsInicioT}hs a {hsFinT}hs</Text>
                    <Mapa />
                </SafeAreaView>
        );
    }
    return (
        <SafeAreaView>
            
            <View>
                <Text
                    style={styles.timer}
                >
                    {displayTime(time)}
                </Text>
            </View>

            <View style={styles.pickerContainer}>
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
        
            <View
                style={styles.button}
            >
                
                <Control
                    isRunning={isRunning}
                    handleButtonPress={isRunning ? updateRegistro : createRegistro}
                    // prop={user}
                />
               
            </View> 

            
            <View style={styles.buttonContainer}>
                <Button
                    title="Ver zona y horario vigente"
                    onPress={() => { setShowMap(true) }}
                />
            </View>
            
        </SafeAreaView>
    );

}


const styles = StyleSheet.create({

    timer: {
        fontSize: 60,
        marginTop: 130,
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        marginBottom: 16,
    },
    menuText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 120,
        textAlign: "center",
        backgroundColor: 'yellow',
        padding: 8,
    },

    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',  // Alinea los elementos hijos en el centro horizontalmente
        alignItems: 'center',
        height: 70,
        width: 320,
        marginBottom: 5,
        marginTop:30,

    },
    pickerLabel: {
        marginRight: 10,
    },
    picker: {
        width: 150,  // Asegura que el Picker no ocupe todo el ancho disponible
        alignSelf: 'center',  // Centra el Picker dentro de su contenedor
        //height: 780,
        //flex: 1,
    },
});