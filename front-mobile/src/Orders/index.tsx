import { Alert, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { FlatList, Pressable, ScrollView } from 'react-native-gesture-handler';
import { use, useEffect, useState } from 'react';
import { fetchOrders } from '../requests';
import { Order } from '../types';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../NavigationTypes';

type navigationProps = StackNavigationProp<RootStackParamList>;

export default function Orders() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<navigationProps>();
    const isFocused = useIsFocused();
    const fetchData = () => {
        setIsLoading(true);
        fetchOrders()
            .then(response => setOrders(response.data))
            .catch(error => Alert.alert('Erro ao buscar os pedidos'))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    const handleOnPress = (order: Order) => {
        navigation.navigate('OrderDetails', { order });
    }

    

    return (
        <>
            <Header />
            {/*<ScrollView style={styles.container}>
                {isLoading ? (
                    <Text>Buscando pedidos...</Text>
                ) : (
                    orders.map(order => (
                        <TouchableOpacity
                            key={order.id}
                            onPress={() => handleOnPress(order)}
                        >
                            <OrderCard order={order} />
                        </TouchableOpacity>
                    ))
                )}

            </ScrollView>*/}
            {isLoading ? (
                <Text>Buscando pedidos...</Text>
            ) : (
                <FlatList
                    style={styles.container}
                    data={orders}
                    keyExtractor={(item) => item.id.toString()} // garante chave única
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => handleOnPress(item)}
                            style={({ pressed }) => [
                                styles.wrapper, pressed && styles.wrapperPressed
                            ]}
                        >
                            <OrderCard order={item} />
                        </Pressable>
                    )}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingRight: '5%',
        paddingLeft: '5%',
    },
    wrapper: {
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4, // sombra no Android
    },
    wrapperPressed: {
        backgroundColor: '#f0f0f0',
        transform: [{ scale: 0.97 }],
    },
});
