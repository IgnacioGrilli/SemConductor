import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function Control({ isRunning, handleButtonPress }) {

    return(
        <View>
        <TouchableOpacity
            style={[
                styles.controlButtonBorder,
                styles.button,
                {backgroundColor: isRunning ? '#d62828' : '#2a9d8f'},
            ]}
            onPress = {handleButtonPress}
        >
            <View 
            style={styles.controlButton}>
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
    },

});

export default React.memo(Control);