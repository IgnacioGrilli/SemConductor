import React from 'react';
import { View, StyleSheet,Button } from 'react-native';
import MPScreen from './mpInicioScreen';

const PagoScreen = () => {

    return (
        <View style={styles.container} >
            <MPScreen/>
        </View>
    );

}

const styles = StyleSheet.create({

    botton: {
        marginHorizontal: 50,
        marginVertical: 10,
        borderColor: "#4630eb",
        borderRadius: 10,
        borderWidth: 2,
        borderBottomWidth: 5,
        fontSize: 8,
        fontWeight: "bold",
        textAlign: "center",
        height: 50,
        margin: 5,
        padding: 4 

    }
});

export default PagoScreen;

