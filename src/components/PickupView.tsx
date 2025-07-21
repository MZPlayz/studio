
'use client';

import TripMap from './TripMap';
import type { TripDetails } from '@/app/find-trip/page';

interface PickupViewProps {
  tripDetails: TripDetails;
}

export default function PickupView({ tripDetails }: PickupViewProps) {
  return (
    <div className="relative h-screen w-screen">
      <TripMap
        pickupCoords={tripDetails.currentLocation.coords}
        dropoffCoords={tripDetails.destination.coords}
      />
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
