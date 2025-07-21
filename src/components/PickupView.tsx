
'use client';

import { useState, useEffect, useRef } from 'react';
import TripMap from './TripMap';
import type { TripDetails } from '@/app/find-trip/page';
import { Marker } from 'react-map-gl';
import * as turf from '@turf/turf';
import VehicleMarker from './VehicleMarker';
import { MapPin } from 'lucide-react';

interface PickupViewProps {
  tripDetails: TripDetails;
}

const ANIMATION_DURATION = 10000; // 10 seconds

export default function PickupView({ tripDetails }: PickupViewProps) {
    const [pickupPath, setPickupPath] = useState<any>(null);
    const [animatedProps, setAnimatedProps] = useState<{ position: { lng: number; lat: number; } | null; bearing: number; }>({ position: null, bearing: 0 });
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const fetchPickupPath = async () => {
            if (!tripDetails.currentLocation.coords || !tripDetails.driverStartLocation) return;

            const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
            const driverCoords = tripDetails.driverStartLocation;
            const userCoords = tripDetails.currentLocation.coords;
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${driverCoords.lng},${driverCoords.lat};${userCoords.lng},${userCoords.lat}?geometries=geojson&access_token=${accessToken}`;
            
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

        const routeLine = turf.lineString(pickupPath.geometry.coordinates);
        const totalDistance = turf.length(routeLine, { units: 'kilometers' });
        let startTime: number;

        const frame = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const animationPhase = (currentTime - startTime) / ANIMATION_DURATION;

            if (animationPhase > 1) {
                // Animation is complete
                const finalPosition = pickupPath.geometry.coordinates[pickupPath.geometry.coordinates.length - 1];
                 setAnimatedProps(prev => ({ ...prev, position: { lng: finalPosition[0], lat: finalPosition[1] } }));
                return;
            }

            const pointOnLine = turf.along(routeLine, totalDistance * animationPhase, { units: 'kilometers' });
            const currentPosition = pointOnLine.geometry.coordinates;
            
            let bearing = animatedProps.bearing;
            if (animationPhase < 1) {
                const nextPoint = turf.along(routeLine, totalDistance * (animationPhase + 0.001), { units: 'kilometers' });
                bearing = turf.bearing(pointOnLine, nextPoint);
            }

            setAnimatedProps({
                position: { lng: currentPosition[0], lat: currentPosition[1] },
                bearing: bearing,
            });

            animationFrameRef.current = requestAnimationFrame(frame);
        };
        
        animationFrameRef.current = requestAnimationFrame(frame);

        return () => {
            if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        }
    }, [pickupPath]);

    return (
        <div className="relative h-screen w-screen">
            <TripMap
                pickupCoords={tripDetails.driverStartLocation}
                dropoffCoords={tripDetails.currentLocation.coords}
                routeGeoJSON={pickupPath}
                routeColor="#FF6B35"
            >
                {animatedProps.position && (
                    <Marker
                        longitude={animatedProps.position.lng}
                        latitude={animatedProps.position.lat}
                        anchor="center"
                        rotation={animatedProps.bearing}
                    >
                        <VehicleMarker type={tripDetails.vehicle.type} />
                    </Marker>
                )}
                 <Marker longitude={tripDetails.currentLocation.coords!.lng} latitude={tripDetails.currentLocation.coords!.lat} anchor="bottom">
                    <MapPin className="h-8 w-8 text-green-500 fill-current" />
                </Marker>
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
