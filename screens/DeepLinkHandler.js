/* // DeepLinkHandler.js
import React, { useEffect } from 'react';
import { Linking } from 'react-native';

const DeepLinkHandler = ({ children }) => {
  useEffect(() => {
    const handleOpenURL = (event) => {
      console.log('URL recibida:', event.url);
      console.log('saldo incrementadooo......');
      // Aquí podrías expandir la lógica para manejar diferentes tipos de URL
    };

    Linking.getInitialURL().then((url) => {
      if (url) handleOpenURL({ url });
    });

    Linking.addEventListener('url', handleOpenURL);

    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  return children;
};

export default DeepLinkHandler; */

import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DeepLinkManager = ({ children }) => {
    const navigation = useNavigation(); // Obtiene la función de navegación usando el hook

    useEffect(() => {
        const handleOpenURL = (event) => {
            console.log('URL recibida:', event.url);
            // Crear un objeto URL para analizar los parámetros de la URL recibida
            const url = new URL(event.url);
            const collection_status = url.searchParams.get('collection_status');

            console.log('Estado de la colección:', collection_status);
            // Comprobar si el estado de la colección es 'approved' y en caso afirmativo, navegar a Home
            if (collection_status === 'approved') {
                console.log('Redirigiendo a Home porque el estado es aprobado');
                navigation.navigate('Home'); // Utiliza la función de navegación para cambiar a la pantalla Home
            }
        };

        // Obtener la URL inicial al cargar y procesarla
        Linking.getInitialURL().then((url) => {
            if (url) handleOpenURL({ url });
        });

        // Añadir un escuchador para eventos de URL entrantes
        Linking.addEventListener('url', handleOpenURL);

        // Limpiar el escuchador cuando el componente se desmonte
        return () => {
            Linking.removeEventListener('url', handleOpenURL);
        };
    }, [navigation]); // Añadir navigation al array de dependencias para asegurar que se usa correctamente

    return children;
};

export default DeepLinkManager;