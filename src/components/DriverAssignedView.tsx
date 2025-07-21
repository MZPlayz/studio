
'use client';

import { useState, useEffect, useRef } from 'react';
import { useMap, Source, Layer, Marker } from 'react-map-gl';
import * as turf from '@turf/turf';
import type { TripDetails } from '@/app/find-trip/page';
import TripMap from './TripMap';
import DriverInfoCard from './DriverInfoCard';
import { VehicleAnimator } from '@/lib/Animator';
import VehicleMarker from './VehicleMarker'; // We'll render this ourselves now

const carIcon =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jYXIiPjxwYXRoIGQ9Ik0xNCAxNmwtNC00IDQtNE00IDE2YTggOCAwIDAgMCAxNiAwWiIvPjxwYXRoIGQ9Ik0xMiA0djhhNCA0IDAgMCAwIDQtNEg4Ii8+PC9zdmc+';


export default function DriverAssignedView({ tripDetails }: { tripDetails: TripDetails }) {
  const [route, setRoute] = useState<any>(null);
  const { current: map } = useMap();

  useEffect(() => {
    async function fetchPickupPath() {
        if (!tripDetails.currentLocation.coords || !tripDetails.driver.startLocation) return;

        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        const driverCoords = tripDetails.driver.startLocation;
        const userCoords = tripDetails.currentLocation.coords;
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${driverCoords.lng},${driverCoords.lat};${userCoords.lng},${userCoords.lat}?geometries=geojson&access_token=${accessToken}`;
        
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
            console.error('Error fetching directions for pickup:', error);
        }
    }
    fetchPickupPath();
  }, [tripDetails]);

  useEffect(() => {
    if (!map || !route) return;

    const vehicleSource = map.getSource('vehicle');
    if (!vehicleSource) {
      map.addSource('vehicle', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: tripDetails.driver.startLocation ? [tripDetails.driver.startLocation.lng, tripDetails.driver.startLocation.lat] : []
          },
          properties: {}
        }
      });
    }

    if (!map.getLayer('vehicle-layer')) {
        map.loadImage(carIcon, (error, image) => {
            if (error) {
                console.error('Error loading car icon:', error);
                return;
            }
            if (!image) {
                 console.error('Image data is null');
                 return;
            }
            if (!map.hasImage('car-icon')) {
                map.addImage('car-icon', image, { sdf: true });
            }

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
        });
    }

    const animator = new VehicleAnimator(map, route.geometry, 10000);
    animator.start();

    return () => {
      animator.stop();
    };
  }, [route, map, tripDetails.driver.startLocation]);

  return (
    <div className="relative h-screen w-screen">
      <TripMap
        pickupCoords={tripDetails.driver.startLocation}
        dropoffCoords={tripDetails.currentLocation.coords}
      >
         {route && (
            <Source id="route-source" type="geojson" data={route}>
                <Layer
                    id="route-layer"
                    type="line"
                    paint={{
                        'line-color': '#FF6B35',
                        'line-width': 5,
                        'line-opacity': 0.8
                    }}
                />
            </Source>
        )}
      </TripMap>
      <div className="absolute top-0 left-0 right-0 p-4">
        <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <h1 className="text-xl font-bold text-gray-800">Your driver is on the way!</h1>
            <p className="text-gray-600">{tripDetails.driver.name} is coming to pick you up.</p>
        </div>
      </div>
      <DriverInfoCard driver={tripDetails.driver} vehicle={tripDetails.vehicle} />
    </div>
  );
}
