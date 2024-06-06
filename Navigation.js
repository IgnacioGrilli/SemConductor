// Navigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EstacionamientoScreen from "./screens/EstacionamientoScreen";
import StackScreen from "./screens/StackScreen";
import AccountMenu from './screens/AccountMenu';
import PaymentScreen from "./screens/PaymentScreen";
import { ImageBackground, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function TabNavigation() {
    return (
        <ImageBackground
            source={require('./assets/background.jpg')} // Asegúrate de que la ruta de la imagen sea correcta
            style={styles.background}
        >
            <Tab.Navigator initialRouteName="Inicio" screenOptions={{ tabBarActiveTintColor: 'red' }}>
                <Tab.Screen
                    name="Inicio"
                    component={StackScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Estacionamiento"
                    component={EstacionamientoScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="car-clock" color={color} size={size} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Pago"
                    component={PaymentScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-cash" color={color} size={size} />
                        )
                    }}
                />
                <Tab.Screen
                    name="Cuenta"
                    component={AccountMenu}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="contacts" color={color} size={size} />
                        )
                    }}
                />
            </Tab.Navigator>
        </ImageBackground>
    );
}

export default TabNavigation;

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});