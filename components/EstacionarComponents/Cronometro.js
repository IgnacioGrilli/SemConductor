import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Constants } from 'expo-constants';
import Control from './CronometroController';
import Result from './CronometroResult';
import { displayTime } from './CronometroUtil';

export default function Cronometro() {

    const [time, setTime] = useState(0);
    const [isRunning, setRunning] = useState(false);
    const [result, setResult] = useState(0);
    const timer = useRef(null);



    const handleButtonPress = useCallback(() => {
        if (!isRunning) {
            const interval = setInterval(() => {
                setTime((previousTime) => previousTime +1);
            }, 10);

            timer.current = interval;
        } else {
            clearInterval(timer.current);
        }
        setRunning((previousState) => !previousState);
    }, [isRunning]);

    return (
        <SafeAreaView>
            <View>
                <Text
                    style={styles.timer}
                >
                {displayTime(time)}
                </Text>
            </View>

            <View
                style={styles.button}
            >
                <Control
                isRunning={isRunning}
                handleButtonPress={handleButtonPress}
                />
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
  
    timer: {
      fontSize:60,
      marginTop:130,
      alignItems: 'center',
      justifyContent: 'center'
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center'
    },
  
});