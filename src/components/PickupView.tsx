
'use client';

import { useState, useEffect, useRef } from 'react';
import type { TripDetails } from '@/app/find-trip/page';
import TripMap from './TripMap';
import DriverInfoCard from './DriverInfoCard';
import { Marker } from 'react-map-gl';
import VehicleMarker from './VehicleMarker';
import { MapPin } from 'lucide-react';
import * as turf from '@turf/turf';

interface PickupViewProps {
  tripDetails: TripDetails;
}

const PICKUP_ANIMATION_DURATION = 10000; // 10 seconds

export default function PickupView({ tripDetails }: PickupViewProps) {
  const [pickupPath, setPickupPath] = useState<any>(null);
  const [animatedProps, setAnimatedProps] = useState<{ position: { lng: number; lat: number; } | null; bearing: number; }>({ position: tripDetails.driver.startLocation, bearing: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const fetchPickupPath = async () => {
        if (!tripDetails.currentLocation.coords || !tripDetails.driver.startLocation) return;

        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        const driverCoords = tripDetails.driver.startLocation;
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
        const elapsedTime = currentTime - startTime;
        let animationPhase = elapsedTime / PICKUP_ANIMATION_DURATION;
        const easedPhase = (1 - Math.cos(animationPhase * Math.PI)) / 2;

        if (animationPhase > 1) {
            const finalPosition = pickupPath.geometry.coordinates[pickupPath.geometry.coordinates.length - 1];
            setAnimatedProps(prev => ({ ...prev, position: { lng: finalPosition[0], lat: finalPosition[1] } }));
            return;
        }

        const pointOnLine = turf.along(routeLine, totalDistance * easedPhase, { units: 'kilometers' });
        const currentPosition = pointOnLine.geometry.coordinates;

        let bearing = animatedProps.bearing;
        if (easedPhase < 1) {
            const nextPoint = turf.along(routeLine, totalDistance * (easedPhase + 0.0001), { units: 'kilometers' });
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
  }, [pickupPath, animatedProps.bearing]);

  return (
    <div className="relative h-screen w-screen">
      <TripMap
        pickupCoords={tripDetails.driver.startLocation}
        dropoffCoords={tripDetails.currentLocation.coords}
        routeGeoJSON={pickupPath}
        routeColor="#FF6B35"
      >
        {animatedProps.position && (
          <Marker
              longitude={animatedProps.position.lng}
              latitude={animatedProps.position.lat}
              anchor="center"
              rotationAlignment="map"
              rotation={animatedProps.bearing}
          >
              <VehicleMarker type={tripDetails.vehicle.type} />
          </Marker>
        )}
        {tripDetails.currentLocation.coords && (
          <Marker
            longitude={tripDetails.currentLocation.coords.lng}
            latitude={tripDetails.currentLocation.coords.lat}
            anchor="bottom"
          >
            <MapPin className="h-10 w-10 text-blue-500 fill-current" />
          </Marker>
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
