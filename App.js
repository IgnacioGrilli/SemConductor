// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import TabNavigation from './Navigation'; // Asegúrate de que esta importación sea correcta
import DeepLinkHandler from './screens/DeepLinkHandler'; // Asegúrate de que esta importación es correcta
import { SafeAreaView, StyleSheet,ImageBackground } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const linking = {
    prefixes: ['https://www.myapp.com', 'myapp://'],
    config: {
      screens: {
        Login: 'Login',
        Home: 'Home',
      },
    },
  };

  return (
      <ImageBackground
          source={require('./assets/background.jpg')} // Reemplaza con la ruta correcta a tu imagen de fondo
          style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <NavigationContainer linking={linking}>
            <DeepLinkHandler>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={TabNavigation} options={{ headerShown: false }} />
              </Stack.Navigator>
            </DeepLinkHandler>
          </NavigationContainer>
        </SafeAreaView>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Asegura que la imagen cubra todo el fondo
  },
  container: {
    flex: 1,
  },
});