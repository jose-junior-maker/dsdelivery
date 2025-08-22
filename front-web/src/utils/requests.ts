import axios from "axios";
import type { OrderPayload } from "../types/orderpayload";

const API_URL = 'http://localhost:8080';
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN ?? '';

export function fetchProducts(){
    return axios(`${API_URL}/products`);
}

export function fetchLocalMapBox(local: string){
    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`)
    //return axios(`https://geocode.maps.co/search?q=${encodeURIComponent(local)}`);
    //return axios(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(local)}&format=json&addressdetails=1&limit=10`)
}

export function saveOrder(payload: OrderPayload){
    return axios.post(`${API_URL}/orders`, payload);
}