
'use client';

import { useState, useEffect } from 'react';
import TripDetailsPage from '@/components/TripDetailsPage';
import BookingInProgressView from '@/components/BookingInProgressView';
import PickupView from '@/components/PickupView';
import InProgressView from '@/components/InProgressView';
import TripCompletedView from '@/components/TripCompletedView';

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
    driverStartLocation: { lat: number; lng: number };
    vehicle: { type: 'sedan' | 'suv' | 'bike'; model: string; };
};

export default function FindTripPage() {
    const [tripState, setTripState] = useState<'idle' | 'booking' | 'pickup' | 'in_progress' | 'completed'>('idle');
    const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);

    const handleRequestTrip = (details: Omit<TripDetails, 'driverStartLocation' | 'vehicle'>) => {
        const fullTripDetails: TripDetails = {
            ...details,
            driverStartLocation: { lat: 23.795, lng: 90.385 }, // Simulated driver start
            vehicle: {
              type: 'sedan', // or 'suv', 'bike'
              model: 'Toyota Prius'
            }
        };

        setTripDetails(fullTripDetails);
        setTripState('booking');
        console.log("Transitioning to booking state with details:", fullTripDetails);
    };
    
    const handleCancelBooking = () => {
        setTripState('idle');
        setTripDetails(null);
    };

    const handleNextRide = () => {
        setTripState('idle');
        setTripDetails(null);
    };

    useEffect(() => {
        if (tripState === 'idle') return;

        if (tripState === 'booking') {
            const timer = setTimeout(() => {
                console.log("Mock System: Cab Booked! Transitioning to PICKUP state.");
                setTripState('pickup');
            }, 4000); 
            return () => clearTimeout(timer);
        }

        if (tripState === 'pickup') {
            const timer = setTimeout(() => {
                console.log("Mock System: Driver has arrived! Transitioning to IN_PROGRESS state.");
                setTripState('in_progress');
            }, 12000); // Increased duration to allow for animation
            return () => clearTimeout(timer);
        }
        
        if (tripState === 'in_progress') {
            const timer = setTimeout(() => {
                console.log("Mock System: Destination reached! Transitioning to COMPLETED state.");
                setTripState('completed');
            }, 12000); // Increased duration to allow for animation
            return () => clearTimeout(timer);
        }
    }, [tripState]);


    return (
        <div>
            {tripState === 'idle' && <TripDetailsPage onRequestTrip={handleRequestTrip} />}
            {tripState === 'booking' && tripDetails && <BookingInProgressView tripDetails={tripDetails} onCancel={handleCancelBooking}/>}
            {tripState === 'pickup' && tripDetails && <PickupView tripDetails={tripDetails} />}
            {tripState === 'in_progress' && tripDetails && <InProgressView tripDetails={tripDetails} />}
            {tripState === 'completed' && tripDetails && <TripCompletedView tripDetails={tripDetails} onNextRide={handleNextRide} />}
        </div>
    );
}
