
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddFavoriteModal from '@/components/AddFavoriteModal';

export interface Passenger {
  id: number;
  name: string;
  phone: string;
  avatarUrl: string;
  avatarHint: string;
  tripCount: number;
  isFavorite: boolean;
}

const mockPassengers: Passenger[] = [
  {
    id: 1,
    name: 'Sophia Carter',
    phone: '+1 (555) 123-4567',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'woman portrait',
    tripCount: 4,
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Ethan Bennett',
    phone: '+1 (555) 987-6543',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'man portrait',
    tripCount: 2,
    isFavorite: true,
  },
  {
    id: 3,
    name: 'Olivia Harper',
    phone: '+1 (555) 246-8013',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'woman portrait',
    tripCount: 1,
    isFavorite: true,
  },
  {
    id: 4,
    name: 'Liam Parker',
    phone: '+1 (555) 135-7911',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'man portrait',
    tripCount: 1,
    isFavorite: false,
  },
  {
    id: 5,
    name: 'Ava Thompson',
    phone: '+1 (555) 369-2580',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'woman portrait',
    tripCount: 1,
    isFavorite: false,
  },
];

const PassengerListItem = ({ passenger }: { passenger: Passenger }) => (
  <div className="flex items-center space-x-4">
    <Image
      src={passenger.avatarUrl}
      alt={passenger.name}
      width={48}
      height={48}
      data-ai-hint={passenger.avatarHint}
      className="rounded-full flex-shrink-0"
    />
    <div>
      <p className="font-semibold text-gray-800">{passenger.name}</p>
      <p className="text-sm text-gray-500">{passenger.phone}</p>
      <p className="text-sm text-gray-500">{passenger.tripCount} {passenger.tripCount === 1 ? 'trip' : 'trips'}</p>
    </div>
  </div>
);

const PassengerList = ({ title, passengers }: { title: string; passengers: Passenger[] }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    <div className="space-y-6">
      {passengers.map((passenger) => (
        <PassengerListItem key={passenger.id} passenger={passenger} />
      ))}
    </div>
  </div>
);


export default function FavoritePassengersPage() {
  const [passengers, setPassengers] = useState<Passenger[]>(mockPassengers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const favoritePassengers = passengers.filter((p) => p.isFavorite);
  const suggestedPassengers = passengers.filter((p) => !p.isFavorite);

  const handleAddFavorite = (passengerToAdd: Passenger) => {
    setPassengers((prev) =>
      prev.map((p) =>
        p.id === passengerToAdd.id ? { ...p, isFavorite: true } : p
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">Favorites</h1>
        <div className="w-10" />
      </header>

      <main className="p-4 space-y-8 pb-24">
        <PassengerList title="Favorites" passengers={favoritePassengers} />
        <PassengerList title="Suggested" passengers={suggestedPassengers} />
      </main>

      <Button
        className="fixed bottom-6 right-6 h-14 rounded-full bg-blue-100 text-blue-800 shadow-lg hover:bg-blue-200"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="mr-2 h-5 w-5" />
        Add favorite
      </Button>

      <AddFavoriteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddFavorite={handleAddFavorite}
        existingPassengers={passengers}
      />
    </div>
  );
}
