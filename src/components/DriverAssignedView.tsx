
'use client';

import type { TripDetails } from '@/app/find-trip/page';
import TripMap from './TripMap';
import DriverInfoCard from './DriverInfoCard';
import { Marker } from 'react-map-gl';
import VehicleMarker from './VehicleMarker';
import { MapPin } from 'lucide-react';

interface DriverAssignedViewProps {
  tripDetails: TripDetails;
}

export default function DriverAssignedView({ tripDetails }: DriverAssignedViewProps) {
  return (
    <div className="relative h-screen w-screen">
      <TripMap
        pickupCoords={tripDetails.driver.startLocation}
        dropoffCoords={tripDetails.currentLocation.coords}
      >
        {tripDetails.driver.startLocation && (
          <Marker
            longitude={tripDetails.driver.startLocation.lng}
            latitude={tripDetails.driver.startLocation.lat}
            anchor="center"
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
