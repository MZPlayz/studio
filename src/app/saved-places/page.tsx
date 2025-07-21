
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Polyline,
} from '@vis.gl/react-google-maps';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Trip {
  id: number;
  passengerName: string;
  passengerPhone: string;
  date: string;
  destination: { lat: number; lng: number };
  destinationAddress: string;
  routePath: { lat: number; lng: number }[];
}

const mockTrips: Trip[] = [
  {
    id: 1,
    passengerName: 'মোঃ রহিম',
    passengerPhone: '01712345678',
    date: '2025-07-20',
    destination: { lat: 23.8103, lng: 90.4125 },
    destinationAddress: 'Gulshan, Dhaka',
    routePath: [
      { lat: 23.777176, lng: 90.399452 }, // Start: Mirpur
      { lat: 23.7925, lng: 90.4078 },
      { lat: 23.8103, lng: 90.4125 }, // End: Gulshan
    ],
  },
  {
    id: 2,
    passengerName: 'করিম শেখ',
    passengerPhone: '01812345678',
    date: '2025-07-19',
    destination: { lat: 23.7464, lng: 90.3768 },
    destinationAddress: 'Dhanmondi, Dhaka',
    routePath: [
        { lat: 23.8759, lng: 90.3795 }, // Start: Uttara
        { lat: 23.8115, lng: 90.4078 },
        { lat: 23.7464, lng: 90.3768 }, // End: Dhanmondi
    ]
  },
   {
    id: 3,
    passengerName: 'ফাতেমা আক্তার',
    passengerPhone: '01912345678',
    date: '2025-07-18',
    destination: { lat: 23.7279, lng: 90.4107 },
    destinationAddress: 'Motijheel, Dhaka',
    routePath: [
        { lat: 23.754, lng: 90.391 }, // Start: Mohammadpur
        { lat: 23.738, lng: 90.402 },
        { lat: 23.7279, lng: 90.4107 }, // End: Motijheel
    ]
  }
];

export default function DriverTripMapPage() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h2>
                <p className="text-gray-700">Google Maps API key is missing.</p>
                <p className="text-sm text-gray-500 mt-2">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="flex h-screen flex-col font-sans">
      <header className="sticky top-0 z-20 flex items-center border-b bg-white p-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">সংরক্ষিত স্থান</h1>
        <div className="w-10" />
      </header>
      <main className="flex-grow">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map
            defaultCenter={{ lat: 23.78, lng: 90.4 }}
            defaultZoom={12}
            mapId="RIDEGO_DRIVER_MAP"
            fullscreenControl={false}
            mapTypeControl={false}
            streetViewControl={false}
          >
            {mockTrips.map((trip) => (
                <Polyline key={`route-${trip.id}`} path={trip.routePath} strokeColor="#2962FF" strokeOpacity={0.8} strokeWeight={5} />
            ))}

            {mockTrips.map((trip) => (
              <AdvancedMarker
                key={`marker-${trip.id}`}
                position={trip.destination}
                onClick={() => setSelectedTrip(trip)}
              />
            ))}

            {selectedTrip && (
              <InfoWindow
                position={selectedTrip.destination}
                onCloseClick={() => setSelectedTrip(null)}
              >
                <div className="p-2 space-y-2 max-w-xs">
                    <h3 className="font-bold text-base text-gray-800">{selectedTrip.passengerName}</h3>
                    <p className="text-sm text-gray-600"><strong>Phone:</strong> {selectedTrip.passengerPhone}</p>
                    <p className="text-sm text-gray-600"><strong>Destination:</strong> {selectedTrip.destinationAddress}</p>
                    <p className="text-xs text-gray-500"><strong>Date:</strong> {selectedTrip.date}</p>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </main>
    </div>
  );
}

    