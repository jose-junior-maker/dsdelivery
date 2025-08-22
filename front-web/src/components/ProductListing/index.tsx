import type { Product } from "../../types/product";
import { checkIsSelected } from "../../utils/helpers";
import ProductCard from "../ProductCard";

type Props = {
    products: Product[];
    selectedProducts: Product[];
    onSelectProduct: (product: Product) => void;
}

export default function ProductListing({products, onSelectProduct, selectedProducts}: Props){
    return (
        <div className="orders-list-container">
            <div className="orders-list-items">
                {products.map(product => (
                    <ProductCard 
                        onSelectProduct={onSelectProduct} 
                        key={product.id} 
                        product={product} 
                        isSelected={checkIsSelected(selectedProducts, product)}
                    />
                ))}
            </div>
        </div>
    );
}