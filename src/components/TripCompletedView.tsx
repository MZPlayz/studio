
'use client';

import { Button } from './ui/button';
import type { TripDetails } from '@/app/find-trip/page';
import { CheckCircle2 } from 'lucide-react';

interface TripCompletedViewProps {
  tripDetails: TripDetails;
  onNextRide: () => void;
}

export default function TripCompletedView({ tripDetails, onNextRide }: TripCompletedViewProps) {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50 p-8 text-center">
        <CheckCircle2 className="h-24 w-24 text-green-500 mb-8 animate-in zoom-in-50 duration-500" />
        <h1 className="text-4xl font-bold mb-4">Trip Completed!</h1>
        <p className="text-lg text-muted-foreground mb-2">
            You have arrived at <span className="font-semibold text-foreground">{tripDetails.destination.address}</span>.
        </p>
        <p className="text-lg text-muted-foreground mb-12">
            Thank you for riding with Ridemap.
        </p>
        <Button 
            size="lg"
            onClick={onNextRide}
            className="text-lg"
        >
            Take Next Ride
        </Button>
    </div>
  );
}
