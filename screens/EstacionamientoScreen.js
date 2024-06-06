import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Cronometro from '../components/EstacionarComponents/Cronometro';

const EstacionamientoScreen = () => {

    return(
        <ImageBackground
            source={require('../assets/background.jpg')} // imagen de fondo
            style={styles.background}
        >
            <View style={styles.title}>
                <Cronometro/>
            </View>
        </ImageBackground>
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
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },


});

export default EstacionamientoScreen;