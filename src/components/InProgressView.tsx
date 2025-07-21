
'use client';

import { useState, useEffect } from 'react';
import { useMap, Source, Layer } from 'react-map-gl';
import type { TripDetails } from '@/app/find-trip/page';
import TripMap from './TripMap';
import { VehicleAnimator } from '@/lib/VehicleAnimator';

const carIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jYXIiPjxwYXRoIGQ9Ik0xNCAxNmwtNC00IDQtNE00IDE2YTggOCAwIDAgMCAxNiAwWiIvPjxwYXRoIGQ9Ik0xMiA0djhhNCA0IDAgMCAwIDQtNEg4Ii8+PC9zdmc+';

export default function InProgressView({ tripDetails, onTripComplete }: { tripDetails: TripDetails, onTripComplete: () => void }) {
  const [route, setRoute] = useState<any>(null);
  const { current: map } = useMap();

  useEffect(() => {
    async function fetchTripPath() {
        if (!tripDetails.currentLocation.coords || !tripDetails.destination.coords) return;

        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        const startCoords = tripDetails.currentLocation.coords;
        const endCoords = tripDetails.destination.coords;
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?geometries=geojson&access_token=${accessToken}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.routes && data.routes.length > 0) {
                setRoute({
                    type: 'Feature' as const,
                    properties: {},
                    geometry: data.routes[0].geometry
                });
            }
        } catch (error) {
            console.error('Error fetching directions for trip:', error);
        }
    }
    fetchTripPath();
  }, [tripDetails]);

  useEffect(() => {
    if (!map || !route || !map.isStyleLoaded()) return;
    if (map.getSource('vehicle')) return;

    map.loadImage(carIcon, (error, image) => {
        if (error) { console.error('Error loading car icon:', error); return; }
        if (!image) { console.error('Image data is null'); return; }
        if (!map.hasImage('car-icon')) { map.addImage('car-icon', image, { sdf: true }); }
        
        if (!map.getSource('vehicle')) {
          map.addSource('vehicle', {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: tripDetails.currentLocation.coords ? [tripDetails.currentLocation.coords.lng, tripDetails.currentLocation.coords.lat] : []
              },
              properties: {}
            }
          });
        }

        if (!map.getLayer('vehicle-layer')) {
            map.addLayer({
                id: 'vehicle-layer',
                type: 'symbol',
                source: 'vehicle',
                layout: {
                    'icon-image': 'car-icon',
                    'icon-size': 1.5,
                    'icon-rotation-alignment': 'map',
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true,
                    'icon-rotate': ['get', 'bearing']
                },
                 paint: {
                    'icon-color': '#2962FF'
                }
            });
        }
    
        const animator = new VehicleAnimator(map, route.geometry, 15000, onTripComplete);
        animator.start();

        return () => {
          animator.stop();
          if (map && map.isStyleLoaded()) {
            if (map.getLayer('vehicle-layer')) map.removeLayer('vehicle-layer');
            if (map.getSource('vehicle')) map.removeSource('vehicle');
          }
        };
    });

  }, [route, map, tripDetails.currentLocation.coords, onTripComplete]);

  return (
    <div className="relative h-screen w-screen">
      <TripMap
        pickupCoords={tripDetails.currentLocation.coords}
        dropoffCoords={tripDetails.destination.coords}
      >
        {route && (
            <Source id="route-source" type="geojson" data={route}>
                <Layer
                    id="route-layer"
                    type="line"
                    paint={{
                        'line-color': '#4285F4',
                        'line-width': 5,
                        'line-opacity': 0.8
                    }}
                />
            </Source>
        )}
      </TripMap>
      <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800">Trip in progress</h2>
        <p className="text-gray-600 mt-2">Heading to:</p>
        <p className="font-semibold text-primary mt-1">{tripDetails.destination.address}</p>
        <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
             <div className="h-full bg-primary animate-pulse w-full"></div>
        </div>
      </div>
    </div>
  );
}
