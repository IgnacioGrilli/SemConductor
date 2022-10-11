import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, View } from "react-native";

//100
const supportedURL = "https://sandbox.mercadopago.com.ar/checkout/v1/redirect/b9a1ea67-8637-4f2b-9122-0bdf8832fdec/payment-option-form/?preference-id=558712817-e6ea0b12-fe4b-4f89-b454-678d1c75ed99&p=809642373e6db13387e5febfdb30727a#/";

//500
const supportedURL500 = "https://sandbox.mercadopago.com.ar/checkout/v1/redirect/e2a634e2-96dc-45f5-a917-e20b40e7d324/payment-option-form/?preference-id=558712817-9c0499db-ad74-4017-ba42-fcf69748b558&p=809642373e6db13387e5febfdb30727a#/";

const supportedURL1000 = "https://sandbox.mercadopago.com.ar/checkout/v1/redirect/94d24043-ee6d-4069-b18c-e978983ac535/payment-option-form/?preference-id=558712817-8981f6a1-5346-478a-b2bc-b971e408e08a&p=809642373e6db13387e5febfdb30727a#/";

const supportedURL5000 = "https://sandbox.mercadopago.com.ar/checkout/v1/redirect/15705977-0c05-46fe-a497-ff1bf6c62566/payment-option-form/?preference-id=558712817-0cde0fad-f7a5-4406-a13c-3f0bfefc14ca&p=809642373e6db13387e5febfdb30727a#/";

const unsupportedURL = "slack://open?team=123456";

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {


        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return <Button title={children} onPress={handlePress}/>;
};

const ButtonMP = () => {
    return (
        <View style={styles.container}>
            <OpenURLButton url={supportedURL}>Comprar Saldo: $100</OpenURLButton>
            <OpenURLButton url={supportedURL500}>Comprar Saldo: $500</OpenURLButton>
            <OpenURLButton url={supportedURL1000}>Comprar Saldo: $1000</OpenURLButton>
            <OpenURLButton url={supportedURL5000}>Comprar Saldo: $5000</OpenURLButton>
            <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    botton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
        margin: 5,
        padding: 4

    }
});



export default ButtonMP;