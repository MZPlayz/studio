
'use client';

import { useState, useEffect, useRef } from 'react';
import TripMap from './TripMap';
import type { TripDetails } from '@/app/find-trip/page';
import { Marker } from 'react-map-gl';
import * as turf from '@turf/turf';
import VehicleMarker from './VehicleMarker';
import { MapPin } from 'lucide-react';

const TRIP_ANIMATION_DURATION = 10000; // 10 seconds

export default function InProgressView({ tripDetails }: InProgressViewProps) {
  const [tripPath, setTripPath] = useState<any>(null);
  const [animatedProps, setAnimatedProps] = useState<{ position: { lng: number; lat: number; } | null; bearing: number; }>({ position: tripDetails.currentLocation.coords, bearing: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const fetchTripPath = async () => {
        if (!tripDetails.currentLocation.coords || !tripDetails.destination.coords) return;

        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        const startCoords = tripDetails.currentLocation.coords;
        const endCoords = tripDetails.destination.coords;
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?geometries=geojson&access_token=${accessToken}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.routes && data.routes.length > 0) {
                const routeGeoJSON = {
                    type: 'Feature' as const,
                    properties: {},
                    geometry: data.routes[0].geometry
                };
                setTripPath(routeGeoJSON);
            }
        } catch (error) {
            console.error('Error fetching directions for trip:', error);
        }
    };

    fetchTripPath();
  }, [tripDetails]);

  useEffect(() => {
    if (!tripPath) return;

    const routeLine = turf.lineString(tripPath.geometry.coordinates);
    const totalDistance = turf.length(routeLine, { units: 'kilometers' });
    let startTime: number;

    const frame = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const animationPhase = elapsedTime / TRIP_ANIMATION_DURATION;
        const easedPhase = (1 - Math.cos(animationPhase * Math.PI)) / 2;

        if (animationPhase > 1) {
            const finalPosition = tripPath.geometry.coordinates[tripPath.geometry.coordinates.length - 1];
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
  }, [tripPath]);


  return (
    <div className="relative h-screen w-screen">
      <TripMap
        pickupCoords={tripDetails.currentLocation.coords}
        dropoffCoords={tripDetails.destination.coords}
        routeGeoJSON={tripPath}
        routeColor="#4285F4"
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
        {tripDetails.destination.coords && (
             <Marker longitude={tripDetails.destination.coords.lng} latitude={tripDetails.destination.coords.lat} anchor="bottom">
                <MapPin className="h-10 w-10 text-red-500 fill-current" />
            </Marker>
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
