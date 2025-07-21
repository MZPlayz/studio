
'use client';

import { useState } from 'react';
import TripDetailsPage from '@/components/TripDetailsPage';
import BookingInProgressView from '@/components/BookingInProgressView';

export type TripDetails = {
    vehicleType: string;
    vehicleClass: string;
    name: string;
    phone: string;
    currentLocation: { address: string; coords: { lng: number; lat: number; } | null; };
    destination: { address: string; coords: { lng: number; lat: number; } | null; };
    travelDate: Date | null;
    travelTime: string;
    dayOrNight: string;
    hasLuggage: boolean;
    luggageWeight: string;
    numTravelers: string;
    driverMode: string;
    selectedDriver: any;
};

export default function FindTripPage() {
    const [tripState, setTripState] = useState<'idle' | 'booking'>('idle');
    const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);

    const handleRequestTrip = (details: TripDetails) => {
        setTripDetails(details);
        setTripState('booking');
        // Future WebSocket logic will go here.
        console.log("Transitioning to booking state with details:", details);
    };
    
    const handleCancelBooking = () => {
        setTripState('idle');
        setTripDetails(null);
    }

    return (
        <div>
            {tripState === 'idle' && <TripDetailsPage onRequestTrip={handleRequestTrip} />}
            {tripState === 'booking' && tripDetails && <BookingInProgressView tripDetails={tripDetails} onCancel={handleCancelBooking}/>}
        </div>
    );
}
