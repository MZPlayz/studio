
'use client';

import { Map } from '@vis.gl/react-google-maps';

export default function MapComponent() {
    const position = { lat: 23.8103, lng: 90.4125 };

    return (
        <Map
            style={{width: '100vw', height: '100vh'}}
            defaultCenter={position}
            defaultZoom={12}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        />
    );
}

    