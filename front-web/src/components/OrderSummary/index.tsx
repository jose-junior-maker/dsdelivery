import { formatPrice } from "../../utils/helpers";

type Props = {
    amount: number;
    totalPrice: number;
    onSubmit: () => void;
}

export default function OrderSummary({ amount, totalPrice, onSubmit }: Props) {
    return (
        <div className="order-summary-container">
            <div className="order-summary-content">
                <div>
                    <span className="amount-selected-container">
                        <strong className="amount-selected">{amount}</strong>
                        ITEMS SELECIONADOS
                    </span>
                    <span className="order-summary-total">
                        <strong>{formatPrice(totalPrice)}</strong>
                        VALOR TOTAL
                    </span>
                </div>
                <button 
                    className="order-summary-make-order"
                    onClick={onSubmit}
                >
                    FAZER PEDIDO
                </button>
            </div>
        </div>
    );
}