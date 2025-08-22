import type { Product } from "../../types/product";
import ProductCard from "../ProductCard";

type Props = {
    products: Product[];
}

export default function ProductListing({products}: Props){
    return (
        <div className="orders-list-container">
            <div className="orders-list-items">
                {products.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    );
}