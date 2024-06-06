//estoy trabajando en este ... hacer la funsion (no funsiona la appi de mercadopago)


import { ACCESS_TOKEN } from "../config.json"
export const getPaymentStatusById = async (paymentId) => {
    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });

        const data = await response.json();
        return data.status;
    } catch (error) {
        console.error('Error al obtener el estado del pago:', error);
        throw error; // Puedes manejar el error según tus necesidades
    }
};