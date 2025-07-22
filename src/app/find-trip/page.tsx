
'use client';

import { useState, useEffect } from 'react';
import { MapProvider } from 'react-map-gl';
import TripDetailsPage from '@/components/TripDetailsPage';
import BookingInProgressView from '@/components/BookingInProgressView';
import LiveTripView from '@/components/LiveTripView';
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
    driver: {
        name: string;
        rating: number;
        startLocation: { lat: number; lng: number; };
    };
    vehicle: { type: 'sedan' | 'suv' | 'bike'; model: string; };
};

export default function FindTripPage() {
    const [tripState, setTripState] = useState<'idle' | 'booking' | 'pickup' | 'arrived' | 'in_progress' | 'completed'>('idle');
    const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);

    const handleRequestTrip = (details: Omit<TripDetails, 'driver' | 'vehicle'>) => {
        const fullTripDetails: TripDetails = {
            ...details,
            driver: {
                name: 'Rubel Mia',
                rating: 4.8,
                startLocation: { lat: 23.795, lng: 90.385 } // A simulated starting point for the driver
            },
            vehicle: {
              type: 'sedan', // or 'suv', 'bike'
              model: 'Toyota Prius'
            }
        };

        setTripDetails(fullTripDetails);
        setTripState('booking');
    };
    
    const handleCancelBooking = () => {
        setTripState('idle');
        setTripDetails(null);
    };

    const handleDriverArrived = () => {
        setTripState('arrived');
    };
    
    const handleStartMainTrip = () => {
        setTripState('in_progress');
    };

    const handleTripComplete = () => {
        setTripState('completed');
    };
    
    const handleNextRide = () => {
        setTripState('idle');
        setTripDetails(null);
    };

    useEffect(() => {
        if (tripState === 'idle') return;

        if (tripState === 'booking') {
            const timer = setTimeout(() => {
                setTripState('pickup');
            }, 4000); 
            return () => clearTimeout(timer);
        }
    }, [tripState]);


    const renderContent = () => {
        switch (tripState) {
            case 'idle':
                return <TripDetailsPage onRequestTrip={handleRequestTrip} />;
            case 'booking':
                return tripDetails ? <BookingInProgressView tripDetails={tripDetails} onCancel={handleCancelBooking}/> : null;
            case 'pickup':
                 return tripDetails ? <LiveTripView tripDetails={tripDetails} onAnimationComplete={handleDriverArrived} tripPhase="pickup" /> : null;
            case 'arrived':
                 return tripDetails ? <LiveTripView tripDetails={tripDetails} tripPhase="arrived" onStartMainTrip={handleStartMainTrip} /> : null;
            case 'in_progress':
                return tripDetails ? <LiveTripView tripDetails={tripDetails} onAnimationComplete={handleTripComplete} tripPhase="trip" /> : null;
            case 'completed':
                return tripDetails ? <TripCompletedView tripDetails={tripDetails} onNextRide={handleNextRide} /> : null;
            default:
                return <TripDetailsPage onRequestTrip={handleRequestTrip} />;
        }
    }
    
    return (
        <MapProvider>
            {renderContent()}
        </MapProvider>
    );
}
