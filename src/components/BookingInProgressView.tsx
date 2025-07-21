
'use client';

import { Button } from "./ui/button";
import type { TripDetails } from "@/app/find-trip/page";

interface BookingInProgressViewProps {
    tripDetails: TripDetails;
    onCancel: () => void;
}

export default function BookingInProgressView({ tripDetails, onCancel }: BookingInProgressViewProps) {
    return (
        <div className="fixed inset-0 bg-primary/90 backdrop-blur-sm flex flex-col items-center justify-center text-primary-foreground z-50 p-8 text-center">
            <div className="w-24 h-24 border-8 border-dashed rounded-full animate-spin border-primary-foreground mb-8"></div>
            <h1 className="text-4xl font-bold mb-4">Finding a driver for you...</h1>
            <p className="text-lg opacity-80 mb-2">
                From: <span className="font-semibold">{tripDetails.currentLocation.address}</span>
            </p>
            <p className="text-lg opacity-80 mb-12">
                To: <span className="font-semibold">{tripDetails.destination.address}</span>
            </p>
            <Button 
                variant="destructive"
                size="lg"
                onClick={onCancel}
                className="bg-red-500/80 hover:bg-red-500 text-white font-bold text-lg"
            >
                Cancel Search
            </Button>
        </div>
    );
}
