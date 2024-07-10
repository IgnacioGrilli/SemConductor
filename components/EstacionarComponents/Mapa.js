import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Mapa() {
    const [region, setRegion] = useState({
        latitude: -42.7672,
        longitude: -65.0364,
        latitudeDelta: 0.0002,
        longitudeDelta: 0.0201,
    });

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const polygonCoordinates = [
        { latitude: -42.7637, longitude: -65.0347 },
        { latitude: -42.7651, longitude: -65.0387 },
        { latitude: -42.7663, longitude: -65.0396 },
        { latitude: -42.7703, longitude: -65.0370 },
        { latitude: -42.7686, longitude: -65.0317 },
    ];

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

    const isPointInPolygon = (point, polygon) => {
        let x = point.latitude, y = point.longitude;
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            let xi = polygon[i].latitude, yi = polygon[i].longitude;
            let xj = polygon[j].latitude, yj = polygon[j].longitude;

            let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    };

    useEffect(() => {
        if (location) {
            const isInside = isPointInPolygon(location, polygonCoordinates);
            Alert.alert(
                "Ubicacion",
                isInside ? "Estás dentro de la zona de estacionamiento" : "Estás fuera de la zona de estacionamiento"
            );
        }
    }, [location]);

    return (
        <View style={styles.container}>
            {/* <Text style={styles.menuText}>Perfil</Text> */}
            <MapView style={styles.map} region={region}>
                <Polygon coordinates={polygonCoordinates} fillColor="rgba(0, 200, 0, 0.5)" />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    menuText: {
        fontSize: 16,
    },
});