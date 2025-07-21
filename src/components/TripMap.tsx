
'use client';

import { useState, useEffect, useRef } from 'react';
import { Map, Marker, Source, Layer, NavigationControl } from 'react-map-gl';
import type { MapRef } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { MapPin } from 'lucide-react';

interface Coords {
  lng: number;
  lat: number;
}

interface TripMapProps {
  pickupCoords: Coords | null;
  dropoffCoords: Coords | null;
}

export default function TripMap({ pickupCoords, dropoffCoords }: TripMapProps) {
  const [route, setRoute] = useState(null);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    async function getRoute() {
      if (pickupCoords && dropoffCoords) {
        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords.lng},${pickupCoords.lat};${dropoffCoords.lng},${dropoffCoords.lat}?geometries=geojson&access_token=${accessToken}`;
        
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.routes && data.routes.length > 0) {
            const routeData = data.routes[0];
            const routeGeoJSON = {
                type: 'Feature' as const,
                properties: {},
                geometry: routeData.geometry
            };
            setRoute(routeGeoJSON);

            const coordinates = routeData.geometry.coordinates;
            const bounds = new mapboxgl.LngLatBounds(
              coordinates[0],
              coordinates[0]
            );

            for (const coord of coordinates) {
              bounds.extend(coord);
            }

            mapRef.current?.fitBounds(bounds, {
              padding: 60,
              duration: 1000,
            });
          }
        } catch (error) {
            console.error('Error fetching directions:', error);
        }
      }
    }

    getRoute();
  }, [pickupCoords, dropoffCoords]);

  const initialViewState = {
    longitude: 90.4125, // Dhaka
    latitude: 23.8103,
    zoom: 12,
  };

  const routeLayer: any = {
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#8A2BE2', // A nice purple
      'line-width': 6,
    },
  };

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={initialViewState}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <NavigationControl position="top-right" />
      
      {pickupCoords && (
        <Marker longitude={pickupCoords.lng} latitude={pickupCoords.lat} anchor="bottom">
          <MapPin className="h-8 w-8 text-green-500 fill-current" />
        </Marker>
      )}
      
      {dropoffCoords && (
        <Marker longitude={dropoffCoords.lng} latitude={dropoffCoords.lat} anchor="bottom">
          <MapPin className="h-8 w-8 text-red-500 fill-current" />
        </Marker>
      )}

      {route && (
        <Source id="route" type="geojson" data={route}>
            <Layer {...routeLayer} />
        </Source>
      )}
    </Map>
  );
}
