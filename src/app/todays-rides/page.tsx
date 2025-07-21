
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MoreVertical, User, Phone, MapPin, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Ride {
  id: number;
  rideNumber: number;
  customerName: string;
  phone: string;
  location: string;
  fare: string;
  pickupTimestamp: number;
}

const mockRides: Ride[] = [
  {
    id: 1,
    rideNumber: 1,
    customerName: 'মোঃ রহিম',
    phone: '01712345678',
    location: 'মিরপুর → গুলশান',
    fare: '৫৫0',
    pickupTimestamp: new Date().getTime() + 2 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000, // 2h 30m 45s from now
  },
  {
    id: 2,
    rideNumber: 2,
    customerName: 'করিম শেখ',
    phone: '01812345678',
    location: 'ধানমন্ডি → উত্তরা',
    fare: '৮০০',
    pickupTimestamp: new Date().getTime() + 4 * 60 * 60 * 1000 + 15 * 60 * 1000 + 20 * 1000, // 4h 15m 20s from now
  },
  {
    id: 3,
    rideNumber: 3,
    customerName: 'ফাতেমা আক্তার',
    phone: '01912345678',
    location: 'সদরঘাট → চাঁদপুর',
    fare: '১২০০',
    pickupTimestamp: new Date().getTime() + 8 * 60 * 60 * 1000 + 5 * 60 * 1000, // 8h 5m 0s from now
  },
];


const CountdownTimer = ({ targetTimestamp }: { targetTimestamp: number }) => {
  const [timeLeft, setTimeLeft] = useState(targetTimestamp - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = targetTimestamp - new Date().getTime();
      setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [hours, minutes, seconds]
      .map(v => v.toString().padStart(2, '0'))
      .join(':');
  };

  return (
    <div className="text-2xl font-bold text-red-500 tracking-wider">
      {formatTime(timeLeft)}
    </div>
  );
};

const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <Card className="w-full overflow-hidden shadow-md">
      <CardHeader className="flex flex-row items-center justify-between bg-white p-4">
        <h2 className="text-lg font-bold text-gray-800">রাইড #{ride.rideNumber}</h2>
        <CountdownTimer targetTimestamp={ride.pickupTimestamp} />
      </CardHeader>
      <CardContent className="space-y-3 p-4 pt-2">
        <div className="flex items-center space-x-3 text-gray-700">
          <User className="h-5 w-5 text-gray-500" />
          <span>কাস্টমারের নাম: {ride.customerName}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-700">
          <Phone className="h-5 w-5 text-gray-500" />
          <span>ফোন নাম্বার: {ride.phone}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-700">
          <MapPin className="h-5 w-5 text-gray-500" />
          <span>লোকেশন: {ride.location}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-700">
          <Wallet className="h-5 w-5 text-gray-500" />
          <span>ভাড়া: ৳{ride.fare}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function TodaysRidesPage() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">আজকের রাইড</h1>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-6 w-6" />
        </Button>
      </header>

      <main className="space-y-4 p-4">
        {mockRides.map(ride => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </main>
    </div>
  );
}
