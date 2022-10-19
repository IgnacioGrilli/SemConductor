// mercadopago-service.js
import Env from 'react-native-config';

export default function getPreferenceId (){

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

  const response = await fetch(
    `https://api.mercadopago.com/checkout/preferences?access_token=APP_USR-7167540661455927-101011-4f7625df631729194eb5e5b90f70884f-558712817`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    });

  const preference = await response.json();

  return preference;
};

