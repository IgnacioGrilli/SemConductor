import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { displayTime } from './CronometroUtil';

function Result({ result }) {
    return (
        <View>
            <Text>
            {result}
            </Text>
        </View>
    )
}

export default React.memo(Result);
