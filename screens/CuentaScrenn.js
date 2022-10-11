import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

const CuentaScrenn = () => {


    fetch("http://localhost:8080/transaccion/all") // ⬅️ 1) llamada a la API, el resultado es una Promise
  .then((response) => response.json()) // ⬅️ 2) cuando la petición finalice, transformamos la respuesta a JSON (response.json() también es una Promise)
  .then((dog) => console.log(dog));

    const navigation = useNavigation();

    return(
        <View style={styles.title}>
        
        <ScrollView style={styles.listArea}>
        <Text style={styles.title}>
        {response/* agregar las patentes cargadas */}
            </Text>
          </ScrollView>
        
        </View>
    );

}

const styles = StyleSheet.create({

    title: {
        fontSize: 30,
        color: '#000',
        padding: 12,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default CuentaScrenn;