import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from "./screens/HomeScreen";
import EstacionamientoScreen from "./screens/EstacionamientoScreen";
import StackScreen from "./screens/StackScreen";
import ButtonMP from './components/MercadoPagoComponents/UrlEjemplo';
import CuentaScrenn from './screens/CuentaScrenn';

const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
    return(
        <HomeStackNavigator.Navigator
            initialRouteName="Home"
        >
            <HomeStackNavigator.Screen
                name="Inicio"
                component={HomeScreen}
            />
            <HomeStackNavigator.Screen
                name="Stack"
                component={StackScreen}
            />
        </HomeStackNavigator.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return(
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions= {{
                tabBarActiveTintColor: 'orange'
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={MyStack} 
                options= {{
                    headerShown: false,
                    title: 'Inicio',
                    tabBarLabelStyle: {
                        fontSize: 11,
                        marginBottom: 8,
                        marginTop: -8
                    },
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons 
                            name="home" 
                            color={color} 
                            size={size}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Estacionamiento" 
                component={EstacionamientoScreen} 
                options= {{
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 11,
                        marginBottom: 8,
                        marginTop: -8
                    },
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons 
                            name="car-clock" 
                            color={color} 
                            size={size}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Pago" 
                component={ButtonMP} 
                options= {{
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 11,
                        marginBottom: 8,
                        marginTop: -8
                    },
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons 
                            name="account-cash" 
                            color={color} 
                            size={size}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Cuenta" 
                component={CuentaScrenn} 
                options= {{
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontSize: 11,
                        marginBottom: 8,
                        marginTop: -8
                    },
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons 
                            name="contacts" 
                            color={color} 
                            size={size}
                        />
                    )
                }}
            />
            
        
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return(
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}