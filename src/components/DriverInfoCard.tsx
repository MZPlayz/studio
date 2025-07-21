
'use client';

import Image from 'next/image';
import { Phone, MessageSquare, Star } from 'lucide-react';
import { Button } from './ui/button';
import type { TripDetails } from '@/app/find-trip/page';
import Link from 'next/link';

interface DriverInfoCardProps {
  driver: TripDetails['driver'];
  vehicle: TripDetails['vehicle'];
}

export default function DriverInfoCard({ driver, vehicle }: DriverInfoCardProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-2xl">
      <div className="flex items-center space-x-4">
        <Image
          src="https://placehold.co/64x64.png"
          alt={driver.name}
          width={64}
          height={64}
          data-ai-hint="man portrait"
          className="rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{driver.name}</h3>
          <p className="text-sm text-gray-600">{vehicle.model}</p>
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span>{driver.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href="/support" passHref>
            <Button size="icon" variant="outline" className="rounded-full h-12 w-12">
              <MessageSquare className="h-6 w-6 text-gray-700" />
            </Button>
          </Link>
          <a href={`tel:${driver.phone || ''}`}>
            <Button size="icon" variant="outline" className="rounded-full h-12 w-12">
              <Phone className="h-6 w-6 text-gray-700" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
