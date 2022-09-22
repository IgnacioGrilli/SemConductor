import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Cronometro from '../components/EstacionarComponents/Cronometro';

const EstacionamientoScreen = () => {

    return(
        <View style={styles.title}>
            <Cronometro/>
        </View>
    );

}  

const styles = StyleSheet.create({

    title: {
        fontSize: 22,
        color: '#000',
        padding: 12,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default EstacionamientoScreen;