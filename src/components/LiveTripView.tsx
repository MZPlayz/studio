
'use client';

import { useState, useEffect, useRef } from 'react';
import { Map, Marker, Source, Layer, useMap } from 'react-map-gl';
import { LngLatBounds } from 'mapbox-gl';
import type { MapRef } from 'react-map-gl';
import { MapPin, Phone, MessageSquare, Star } from 'lucide-react';
import type { TripDetails } from '@/app/find-trip/page';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import * as turf from '@turf/turf';
import { VehicleAnimator } from '@/lib/VehicleAnimator';

const StatusBar = ({ text }: { text: string }) => (
    <div className="absolute top-0 left-0 right-0 p-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <h1 className="text-xl font-bold text-gray-800">{text}</h1>
        </div>
    </div>
);


interface DriverInfoCardProps {
  driver: TripDetails['driver'];
  vehicle: TripDetails['vehicle'];
}

const DriverInfoCard = ({ driver, vehicle }: DriverInfoCardProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-2xl z-10">
      <div className="flex items-center space-x-4">
        <Image
          src="https://placehold.co/64x64.png"
          alt={driver.name}
          width={64}
          height={64}
          data-ai-hint="man portrait"
          className="rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{driver.name}</h3>
          <p className="text-sm text-gray-600">{vehicle.model}</p>
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span>{driver.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex space-x-2">
            <a href={`tel:${driver.phone || ''}`}>
                <Button size="icon" variant="outline" className="rounded-full h-12 w-12">
                    <Phone className="h-6 w-6 text-gray-700" />
                </Button>
            </a>
            <Link href="/support" passHref>
                <Button size="icon" variant="outline" className="rounded-full h-12 w-12">
                    <MessageSquare className="h-6 w-6 text-gray-700" />
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
};


interface LiveTripViewProps {
    tripDetails: TripDetails;
    onPickupComplete?: () => void;
    onTripComplete?: () => void;
    tripPhase: 'pickup' | 'trip';
}

export default function LiveTripView({ tripDetails, onPickupComplete, onTripComplete, tripPhase }: LiveTripViewProps) {
  const [route, setRoute] = useState<any>(null);
  const { current: map } = useMap();
  
  const startCoords = tripPhase === 'pickup' ? tripDetails.driver.startLocation : tripDetails.currentLocation.coords;
  const endCoords = tripPhase === 'pickup' ? tripDetails.currentLocation.coords : tripDetails.destination.coords;
  const routeColor = tripPhase === 'pickup' ? '#FF6B35' : '#8A2BE2';
  const statusBarText = tripPhase === 'pickup' ? "Your driver is on the way!" : `Heading to ${tripDetails.destination.address}`;
  const onComplete = tripPhase === 'pickup' ? onPickupComplete : onTripComplete;
  const carIconUrl = '/car-icon.svg';

  useEffect(() => {
    async function fetchTripPath() {
        if (!startCoords || !endCoords) return;

        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?geometries=geojson&access_token=${accessToken}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.routes && data.routes.length > 0) {
                setRoute(data.routes[0].geometry);
            }
        } catch (error) {
            console.error('Error fetching directions:', error);
        }
    }
    fetchTripPath();
  }, [startCoords, endCoords]);

  useEffect(() => {
    if (!route || !map?.isStyleLoaded() || !onComplete) return;

    if (map.getSource('vehicle')) return;

    const carIconId = 'car-icon-image';

    map.loadImage(carIconUrl, (error, image) => {
        if (error) { console.error('Error loading car icon:', error); return; }
        if (!image) { console.error('Image could not be loaded.'); return; }
        if (!map.hasImage(carIconId)) {
            map.addImage(carIconId, image, { sdf: true });
        }
        
        map.addSource('vehicle', {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: route.coordinates[0]
                },
                properties: {}
            }
        });

        map.addLayer({
            id: 'vehicle-layer',
            type: 'symbol',
            source: 'vehicle',
            layout: {
                'icon-image': carIconId,
                'icon-size': 1.5,
                'icon-rotation-alignment': 'map',
                'icon-allow-overlap': true,
                'icon-ignore-placement': true,
                'icon-rotate': ['get', 'bearing']
            },
            paint: {
                'icon-color': '#FFFFFF',
                'icon-halo-color': '#000000',
                'icon-halo-width': 1
            }
        });

        const animator = new VehicleAnimator(map, route, 15000, onComplete);
        animator.start();

        return () => {
            animator.stop();
            if(map.isStyleLoaded()){
                if (map.getLayer('vehicle-layer')) map.removeLayer('vehicle-layer');
                if (map.getSource('vehicle')) map.removeSource('vehicle');
                if (map.hasImage(carIconId)) map.removeImage(carIconId);
            }
        };
    });

  }, [route, map, onComplete, carIconUrl]);


  return (
    <div className="relative h-screen w-screen">
      <TripMap pickupCoords={startCoords} dropoffCoords={endCoords}>
         {route && (
            <Source id="route-source" type="geojson" data={route}>
                <Layer id="route-layer" type="line" paint={{ 'line-color': routeColor, 'line-width': 5, 'line-opacity': 0.8 }} />
            </Source>
        )}
      </TripMap>
      <StatusBar text={statusBarText} />
      <DriverInfoCard driver={tripDetails.driver} vehicle={tripDetails.vehicle} />
    </div>
  );
}

const TripMap = ({ children, pickupCoords, dropoffCoords }: { children: React.ReactNode, pickupCoords: any, dropoffCoords: any }) => {
    const mapRef = useRef<MapRef>(null);

    useEffect(() => {
        if (mapRef.current && pickupCoords && dropoffCoords) {
            const bounds = new LngLatBounds();
            bounds.extend([pickupCoords.lng, pickupCoords.lat]);
            bounds.extend([dropoffCoords.lng, dropoffCoords.lat]);
            mapRef.current.fitBounds(bounds, { padding: 80, duration: 1000 });
        }
    }, [pickupCoords, dropoffCoords]);

    return (
        <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{ longitude: 90.4125, latitude: 23.8103, zoom: 12 }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
        >
            {pickupCoords && <Marker longitude={pickupCoords.lng} latitude={pickupCoords.lat}><MapPin className="h-8 w-8 text-green-500 fill-current" /></Marker>}
            {dropoffCoords && <Marker longitude={dropoffCoords.lng} latitude={dropoffCoords.lat}><MapPin className="h-8 w-8 text-blue-500 fill-current" /></Marker>}
            {children}
        </Map>
    )
}
