import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import AsyncSelect from 'react-select/async';
import { fetchLocalMapBox } from '../../utils/requests';
import { debounce } from "lodash";
import type { OrderLocationdata } from '../../types/orderlocationdata';

const initialPosition = {
    lat: 51.505,
    lng: -0.09
}

type Place = {
    label?: string;
    value?: string;
    position: {
        lat: number;
        lng: number;
    };
    place?: string;
}

type Props = {
    onChangeLocation:(location: OrderLocationdata) => void;
}

export default function OrderLocation({onChangeLocation}: Props) {

    const [address, setAddress] = useState<Place>({
        position: initialPosition
    });


    const loadOptions = debounce( async (inputValue: string, callback: (places: Place[]) => void) => {
        const response = await fetchLocalMapBox(inputValue);
        console.log(response);
        const places = response.data.map((item: any) => {
            return ({
                label: item.display_name,
                value: item.display_name,
                position: {
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lon)
                },
                place: item.display_name,
            });
        });

        return places;
    }, 2000);

    const handleChangeSelect = (place: Place) => {
        setAddress(place);
        onChangeLocation({
            latitude: place.position.lat,
            longitude: place.position.lng,
            address: place.label!
        });
    };


    return (
        <div className="order-location-container">
            <div className="order-location-content">
                <h3 className="order-location-title">
                    Selecione onde o pedido deve ser entregue:
                </h3>
                <div className="filter-container">
                    <AsyncSelect
                        placeholder="Digite um endereço para entregar o pedido"
                        className="filter"
                        loadOptions={loadOptions}
                        onChange={value => handleChangeSelect(value as Place)}
                    />
                </div>
                <MapContainer center={address.position} zoom={13} scrollWheelZoom>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={address.position}>
                        <Popup>
                            {address.value}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}