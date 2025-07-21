
'use client';
import { Car, Bike, PersonStanding } from 'lucide-react';

interface VehicleMarkerProps {
  type: 'sedan' | 'suv' | 'bike';
}

const vehicleIcons = {
  sedan: <Car className="h-6 w-6 text-white" />,
  suv: <Car className="h-8 w-8 text-white" />,
  bike: <Bike className="h-6 w-6 text-white" />,
};

export default function VehicleMarker({ type }: VehicleMarkerProps) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 shadow-lg">
      {vehicleIcons[type] || <PersonStanding />}
    </div>
  );
}
