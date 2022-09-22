import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StackScreen = () => {

    return(
        <View style={styles.title}>
            <Text style={styles.title}>
                Prueba de StackScreen
            </Text>
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

export default StackScreen;