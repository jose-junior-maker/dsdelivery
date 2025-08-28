import { StackNavigationProp } from "@react-navigation/stack";
import { Text, View, StyleSheet, Alert, Linking, Platform } from "react-native";
import { RootStackParamList } from "../NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import Header from "../Header";
import { Order } from "../types";
import OrderCard from "../OrderCard";
import { RectButton } from "react-native-gesture-handler";
import { confirmDelivery } from "../requests";

type navigationProps = StackNavigationProp<RootStackParamList>;
type Props = {
    route: {
        params: {
            order: Order
        }
    }
}

export default function OrderDetails({ route }: Props) {

    const navigation = useNavigation<navigationProps>();
    const { order } = route.params;

    const handleOnCancel = () => {
        navigation.navigate('Orders');
    }

    const handleConfirmDelivery = () => {
        confirmDelivery(order.id)
            .then(() => {
                Alert.alert(`Pedido ${order.id} entrege com sucesso!`);
                navigation.navigate('Orders');
            })
            .catch(() => {
                Alert.alert(`Houve um erro ao confirmar entrega do pedido ${order.id}`);
            }
            );
    }

    const handleNavigation = () => {
        const scheme = Platform.select({
            ios: 'maps:0,0?q=',
            android: 'geo:0,0?q='
        });
        const latLng = `${order.latitude},${order.longitude}`;
        const label = 'Meu Destino';

        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}`
        });

        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latLng}`;

        Linking.canOpenURL(url ?? '').then(supported => {
            if(supported){
                Linking.openURL(url ?? '');
            } else {
                Linking.openURL(googleMapsUrl).then(supportedGoogle => {
                    if(supportedGoogle){
                        Linking.openURL(googleMapsUrl);
                    }else{
                        Alert.alert("Não foi possível abrir o Google Maps ou o aplicativo nativo.");
                    }
                });
            }
        })
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <OrderCard order={order} />
                <RectButton style={styles.button} onPress={handleNavigation}>
                    <Text style={styles.buttonText}>INICIAR NAVEGAÇÃO</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleConfirmDelivery}>
                    <Text style={styles.buttonText}>CONFIRMAR ENTREGA</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleOnCancel}>
                    <Text style={styles.buttonText}>CANCELAR</Text>
                </RectButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingRight: '5%',
        paddingLeft: '5%'
    },
    button: {
        backgroundColor: '#DA5C5C',
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 50,
        paddingRight: 50,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFF',
        letterSpacing: -0.24,
        fontFamily: 'OpenSans_700Bold'
    }
});