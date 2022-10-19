import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
//import MPScreen from './mpInicioScreen';

const PagoScreen = () => {



    return (
        <View style={styles.botton} >
            <Button
                title="Comprar"
                color='orange'
                alignItems='center'
                justifyContent='bottom'
                onPress={()=> console.log(JSON.stringify(response.data))}
            />

        </View>
    );

}

    const data = {
      "items": [
        {
          "id": "1234",
          "title": "Smartphone",
          "currency_id": "ARS",
          "description": "Dispositivo móvil",
          "category_id": "art",
          "quantity": 1,
          "unit_price": 30000
        }
      ]
    };
    // const token = 'APP_USR-7167540661455927-101011-4f7625df631729194eb5e5b90f70884f-558712817'
  
    const response = fetch(
      `https://api.mercadopago.com/checkout/preferences?access_token=APP_USR-7167540661455927-101011-4f7625df631729194eb5e5b90f70884f-558712817`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
  


const styles = StyleSheet.create({

    botton: {
        marginHorizontal: 50,
        marginVertical: 10,
        borderColor: "#4630eb",
        borderRadius: 10,
        borderWidth: 2,
        borderBottomWidth: 5,
        fontSize: 8,
        fontWeight: "bold",
        textAlign: "center",
        height: 50,
        marginTop: 5,
        padding: 4
    }
});

export default PagoScreen;

