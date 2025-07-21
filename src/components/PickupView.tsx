
'use client';

import { useState, useEffect } from 'react';
import TripMap from './TripMap';
import type { TripDetails } from '@/app/find-trip/page';
import { useAnimatedMarker } from '@/hooks/useAnimatedMarker';
import { Marker } from 'react-map-gl';
import { Car } from 'lucide-react';

interface PickupViewProps {
  tripDetails: TripDetails;
}

const CabMarker = () => (
    <div className="bg-primary rounded-full p-2 shadow-lg border-2 border-white">
        <Car className="h-6 w-6 text-primary-foreground" />
    </div>
);


export default function PickupView({ tripDetails }: PickupViewProps) {
    const [pickupPath, setPickupPath] = useState(null);
    const [driverPosition, setDriverPosition] = useState(null);
    
    const animatedPosition = useAnimatedMarker(driverPosition);
    
    useEffect(() => {
        const fetchPickupPath = async () => {
            if (!tripDetails.currentLocation.coords) return;

            // Simulate driver's starting position slightly away from user
            const driverStartCoords = {
                lng: tripDetails.currentLocation.coords.lng + 0.02,
                lat: tripDetails.currentLocation.coords.lat + 0.02,
            };

            setDriverPosition(driverStartCoords);

            const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
            const userCoords = tripDetails.currentLocation.coords;
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${driverStartCoords.lng},${driverStartCoords.lat};${userCoords.lng},${userCoords.lat}?geometries=geojson&access_token=${accessToken}`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.routes && data.routes.length > 0) {
                    const routeGeoJSON = {
                        type: 'Feature' as const,
                        properties: {},
                        geometry: data.routes[0].geometry
                    };
                    setPickupPath(routeGeoJSON);
                }
            } catch (error) {
                console.error('Error fetching directions for pickup:', error);
            }
        };

        fetchPickupPath();
    }, [tripDetails]);

    useEffect(() => {
        if (!pickupPath) return;

        const coordinates = pickupPath.geometry.coordinates;
        let index = 0;
        const interval = setInterval(() => {
            if (index < coordinates.length) {
                const [lng, lat] = coordinates[index];
                setDriverPosition({ lat, lng });
                index++;
            } else {
                clearInterval(interval);
            }
        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [pickupPath]);

    return (
        <div className="relative h-screen w-screen">
        <TripMap
            pickupCoords={tripDetails.currentLocation.coords}
            dropoffCoords={tripDetails.destination.coords}
            routeGeoJSON={pickupPath}
            routeColor="#FF6B35"
        >
            {animatedPosition && (
                <Marker
                    longitude={animatedPosition.lng}
                    latitude={animatedPosition.lat}
                    anchor="center"
                >
                    <div style={{ transform: `rotate(${animatedPosition.rotation}deg)` }} className="transition-transform duration-1000 ease-linear">
                         <CabMarker />
                    </div>
                </Marker>
            )}
        </TripMap>
        <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-2xl shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800">Your driver is on the way!</h2>
            <p className="text-gray-600 mt-2">They are heading to your pickup location at:</p>
            <p className="font-semibold text-primary mt-1">{tripDetails.currentLocation.address}</p>
            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-pulse w-full"></div>
            </div>
        </div>
        </div>
    );
}
