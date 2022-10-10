// mercadopago-service.js
import Env from 'react-native-config';

// You should create the preference server-side, not client-side 
// but we show client-side for the sake of simplicity
export const getPreferenceId = async (payer, ...items) => {
  const token = 'APP_USR-7167540661455927-101011-4f7625df631729194eb5e5b90f70884f-558712817'

  const response = await fetch(
    `https://api.mercadopago.com/checkout/preferences?access_token=${token}`,
    {
      method: 'POST',
      body: JSON.stringify({
        items,
        payer: {
          email: payer,
        },
      }),
    }
  );

  const preference = await response.json();

  return preference.id;
};