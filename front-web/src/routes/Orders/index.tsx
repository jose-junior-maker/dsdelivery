import { useEffect, useState } from 'react';
import ProductListing from '../../components/ProductListing';
import StepsHeader from '../../components/StepsHeader';
import './styles.css'
import type { Product } from '../../types/product';
import { fetchProducts, saveOrder } from '../../utils/requests';
import OrderLocation from '../../components/OrderLocation';
import type { OrderLocationdata } from '../../types/orderlocationdata';
import OrderSummary from '../../components/OrderSummary';
import Footer from '../../components/Footer';
import { checkIsSelected } from '../../utils/helpers';
import { toast } from 'react-toastify';

export default function Orders() {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationdata>();
    const totalPrice = selectedProducts.reduce((sum, item) => sum + item.price, 0);

    useEffect(() => {
        fetchProducts()
            .then(response => setProducts(response.data))
            .catch(error => {
                toast.warning('Erro ao carregar produtos');
            })
    }, []);

    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected = checkIsSelected(selectedProducts, product);

        if (isAlreadySelected) {
            const selected = selectedProducts.filter(item => item.id !== product.id);
            setSelectedProducts(selected);
        } else {
            setSelectedProducts(previous => [...previous, product]);
        }
    }

    const handleSubmit = () => {
        const productsIds = selectedProducts.map(({ id }) => ({ id }));
        const payload = {
            ...orderLocation!,
            products: productsIds
        }

        saveOrder(payload).then((response) => {
            toast.success(`Pedido enviado com sucesso! Nº ${response.data.id}`);
            setSelectedProducts([]);
        })
            .catch(() => {
                toast.warning('Erro ao enviar pedido');
            })
    }

    return (
        <>
            <div className='orders-container'>
                <StepsHeader />
                <ProductListing onSelectProduct={handleSelectProduct} products={products} selectedProducts={selectedProducts} />
                <OrderLocation onChangeLocation={location => setOrderLocation(location)} />
                <OrderSummary
                    amount={selectedProducts.length}
                    totalPrice={totalPrice}
                    onSubmit={handleSubmit}
                />
            </div>
            <Footer />
        </>
    );
}