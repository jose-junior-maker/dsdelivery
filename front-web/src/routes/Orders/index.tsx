import { useEffect, useState } from 'react';
import ProductListing from '../../components/ProductListing';
import StepsHeader from '../../components/StepsHeader';
import './styles.css'
import type { Product } from '../../types/product';
import { fetchProducts } from '../../utils/requests';
import OrderLocation from '../../components/OrderLocation';
import type { OrderLocationdata } from '../../types/orderlocationdata';

export default function Orders(){

    const [products, setProducts] = useState<Product[]>([]);

    const [orderLocation, setOrderLocation] = useState<OrderLocationdata>();
    
    useEffect(() => {
        fetchProducts()
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='orders-container'>
            <StepsHeader />
            <ProductListing products={products}/>
            <OrderLocation onChangeLocation={location => setOrderLocation(location)}/>
        </div>
    );
}