//PaymentScreenWebBrowser.js
import { ACCESS_TOKEN } from "../config.json"
import { Alert } from "react-native"

/* FUNSIONANDO */
/* export const handleIntegrationMP = async () => {


    const preferencia = {
        "items": [
            {
                "title": 'hrs',
                "description": `Compra hrs`,
                "category_id": "cells",
                "quantity": 1,
                "currency_id": "$",
                "unit_price": 1

            }
        ]
    }

    try {
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preferencia)
        })

        const data = await response.json();

        console.log(data);

        console.log("init point:");
        console.log(data.init_point);

        // Paso 2: Consultar el estado del pago
    const paymentId = data.id;
    const responseGetPaymentStatus = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });

    if (dataGetPaymentStatus.status === 'approved') {
        Alert.alert('Estado del Pago', `El estado del pago es: ${dataGetPaymentStatus.status}`);
      }
    const dataGetPaymentStatus = await responseGetPaymentStatus.json();
    console.log('Estado del pago: Aprovado', dataGetPaymentStatus);

    // Puedes procesar la información del estado del pago aquí
    // Por ejemplo, mostrar un mensaje al usuario
    Alert.alert('Estado del Pago', `El estado del pago es: ${dataGetPaymentStatus.status}`);

return data.init_point



    } catch (error) {
        console.log(error)
    }
}    */


/* PRUEBA DE LA FUNSION getpaymentStatusById */
export const handleIntegrationMP = async () => {
    const preferencia = {
        items: [
            {
                title: 'hrs',
                description: `Compra hrs`,
                category_id: 'cells',
                quantity: 1,
                currency_id: '$',
                unit_price: 0.05,
            },
        ],
        back_urls: {
            success: 'exp://192.168.134.35:8081/Home', // Reemplaza "miapp" con tu esquema
            failure: 'exp://192.168.134.35:8081/Home',
        },
        redirect_urls:{
            success: 'exp://192.168.134.35:8081/Home', // Reemplaza "miapp" con tu esquema
            failure: 'exp://192.168.134.35:8081/Home',
        },
        binary_mode:true,
        auto_return: 'all'

    };

    try {
        const response = await fetch(
            'https://api.mercadopago.com/checkout/preferences',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(preferencia),
            }
        );

        const data = await response.json();

        console.log('data: ---->',data);

        console.log('init point:',data.init_point);
        console.log();
        /*
            // Paso 2: Consultar el estado del pago (NO FUNSIONA)
            console.log('id del payment' ,data.id);
            const paymentId = data.id;
            const responseGetPaymentStatus = await fetch(
              `https://api.mercadopago.com/checkout/v1/payments/${paymentId}`,
              {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${ACCESS_TOKEN}`,
                  'Content-Type': 'application/json',
                },
              }
            );

            const dataGetPaymentStatus = await responseGetPaymentStatus.json();

            console.log('Estado del pago:', dataGetPaymentStatus);

            if (dataGetPaymentStatus.status === 'approved') {
              Alert.alert(
                'Estado del Pago',
                `El estado del pago es: ${dataGetPaymentStatus.status}`
              );
            }

            // Puedes procesar la información del estado del pago aquí
            // Por ejemplo, mostrar un mensaje al usuario
            Alert.alert(
              'Estado del Pago',
              `El estado del pago es: ${dataGetPaymentStatus.status}`
            ); */

        console.log('init del hand', data.init_point);
        console.log('id del payment en el hand', data.id);
        // Retorna un objeto con init_point y paymentId
        return {
            init_point: data.init_point,
            paymentId: data.id,
        };
    } catch (error) {
        console.log(error);
    }
};

/* no funsiona pero esta bien la logica */
/* export const getPaymentStatusById = async (paymentId) => {


  const encodedPaymentId = encodeURIComponent(paymentId);

  console.log('dentro de getPaymentStatusById', paymentId);
  try {

    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${encodedPaymentId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    console.log('status: ',response.data );
    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error('Error al obtener el estado del pago:', error);
    throw error;
  }


};
 */

//en produccion no funsiona es para realizar la busqueda de un pago y comprobar su estado
/*
export const getPaymentStatusById = async (paymentId) => {
  const encodedPaymentId = encodeURIComponent(paymentId);

  console.log('paiment dentro del get', paymentId)
  try {
    Realiza la solicitud de búsqueda de pago
    const response = await fetch(
      `https://api.mercadopago.com/checkout/v1/payments/search?access_token=${ACCESS_TOKEN}&id=${encodedPaymentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      console.log('paso por aqui');
      throw new Error(`HTTP error! Status: ${response.status}`);

    }

     Analiza la respuesta JSON
    const data = await response.json();

    Verifica si hay resultados y obtén el estado del primer pago encontrado
    if (data.results && data.results.length > 0) {
      const paymentStatus = data.results[0].status;
      return paymentStatus;
    } else {
      throw new Error('No se encontraron resultados para el pago.');
    }
  } catch (error) {
    console.error('Error al obtener el estado del pago:', error);
    throw error;
  }
}; */


/* export const getPaymentStatusById = async (paymentId) => {
  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    console.log('Estado del pago:', data);

    // Verifica si hay un error en la respuesta
    if (response.ok) {
      return data.status; // Devuelve el estado del pago
    } else {
      console.error('Error en la respuesta de la API:', data);
      throw new Error('Error al obtener el estado del pago');
    }
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    throw error;
  }
}; */

