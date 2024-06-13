//PaymentScreenWebBrowser.js
import { ACCESS_TOKEN } from "../config.json"
import { Alert } from "react-native"

/* FUNCIONANDO */
/* PRUEBA DE LA FUNCION getpaymentStatusById */
export const handleIntegrationMP = async (quantity1) => {
    const preferencia = {
        items: [
            {
                title: 'hrs',
                description: `Compra hrs`,
                category_id: 'cells',
                quantity: quantity1,
                currency_id: '$',
                unit_price: 0.05,
            },
        ],
        back_urls: {
            success: `exp://192.168.1.20:8081?quantity=${quantity1}`, // Reemplaza "miapp" con tu esquema
            failure: `exp://192.168.1.20:8081?quantity=${quantity1}`,
        },
        redirect_urls:{
            success: `exp://192.168.1.20:8081?quantity=${quantity1}`, // Reemplaza "miapp" con tu esquema
            failure: `exp://192.168.1.20:8081?quantity=${quantity1}`,
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


