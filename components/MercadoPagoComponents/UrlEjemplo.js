import React, { useCallback } from "react";
import { Alert, Text, TouchableOpacity, Linking, StyleSheet, View, SafeAreaView } from "react-native";

//100
const supportedURL = "https://sandbox.mercadopago.com.ar/checkout/v1/redirect/b9a1ea67-8637-4f2b-9122-0bdf8832fdec/payment-option-form/?preference-id=558712817-e6ea0b12-fe4b-4f89-b454-678d1c75ed99&p=809642373e6db13387e5febfdb30727a#/";

//500
const supportedURL500 = "https://sandbox.mercadopago.com.ar/checkout/v1/redirect/e2a634e2-96dc-45f5-a917-e20b40e7d324/payment-option-form/?preference-id=558712817-9c0499db-ad74-4017-ba42-fcf69748b558&p=809642373e6db13387e5febfdb30727a#/";

const supportedURL1000 = "https://sandbox.mercadopago.com.ar/checkout/v1/redirect/94d24043-ee6d-4069-b18c-e978983ac535/payment-option-form/?preference-id=558712817-8981f6a1-5346-478a-b2bc-b971e408e08a&p=809642373e6db13387e5febfdb30727a#/";

const supportedURL5000 = "https://sandbox.mercadopago.com.ar/checkout/v1/redirect/15705977-0c05-46fe-a497-ff1bf6c62566/payment-option-form/?preference-id=558712817-0cde0fad-f7a5-4406-a13c-3f0bfefc14ca&p=809642373e6db13387e5febfdb30727a#/";

const unsupportedURL = "slack://open?team=123456";
//<OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>


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

    return <TouchableOpacity 
                title={children} 
                onPress={handlePress}
                style={styles.button}
            >
                <View>
                    <Text
                        style={styles.buttonText}
                    >
                        {children}
                    </Text>
                </View>
            </TouchableOpacity>;
};

const ButtonMP = () => {
    return (
        <SafeAreaView style={styles.container}>

            <Text
            style={styles.buttonText}
            >
                COMPRA DE SALDO
            </Text>
               
            <OpenURLButton url={supportedURL}>$100</OpenURLButton>
        
            <OpenURLButton url={supportedURL500}>$500</OpenURLButton>
            
            <OpenURLButton url={supportedURL1000}>$1000</OpenURLButton>
            
            <OpenURLButton url={supportedURL5000}>$5000</OpenURLButton>
                        
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 160,
        justifyContent: "center", 
        alignItems: "center" 
    },

    button: {
        height: 60,
        width: 150,
        marginTop: 30,
        borderRadius: 15,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 28,
    },
});



export default ButtonMP;