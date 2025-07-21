// /src/components/MapComponent.tsx

'use client';

import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapComponent() {
    const initialViewState = {
        longitude: 90.4125, // Centered on Dhaka
        latitude: 23.8103,
        zoom: 12,
    };

    return (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={initialViewState}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            attributionControl={false}
        />
    );
}
