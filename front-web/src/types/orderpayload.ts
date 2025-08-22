import type { OrderLocationdata as OrderLocationData } from "./orderlocationdata";

type ProductId = {
    id: number;
}

export type OrderPayload = {
    products: ProductId[];
} & OrderLocationData;