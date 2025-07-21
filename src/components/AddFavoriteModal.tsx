
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Person } from '@/app/favorite-passengers/page';

interface AddFavoriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFavorite: (passenger: Person) => void;
  existingPassengers: Person[];
}

export default function AddFavoriteModal({
  isOpen,
  onClose,
  onAddFavorite,
  existingPassengers,
}: AddFavoriteModalProps) {
  const [step, setStep] = useState<'search' | 'confirm'>('search');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [foundPassenger, setFoundPassenger] = useState<Person | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFindPassenger = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Simulate finding a passenger from the existing list.
    // In a real app, this would be an API call.
    const passenger = existingPassengers.find(p => p.phone === phone);

    if (passenger) {
      setFoundPassenger(passenger);
      setStep('confirm');
    } else {
      setError('Passenger not found. Please check the phone number.');
    }
  };
  
  const handleConfirmAdd = () => {
    if(foundPassenger) {
        onAddFavorite(foundPassenger);
        resetState();
    }
  };
  
  const resetState = () => {
      setStep('search');
      setPhone('');
      setName('');
      setFoundPassenger(null);
      setError(null);
      onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0">
      <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl m-4">
        {step === 'search' && (
          <form onSubmit={handleFindPassenger} className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Add Favorite Passenger</h2>
            <div>
              <Label htmlFor="name">Passenger Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter passenger name"
                className="bg-gray-100 border-none mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Passenger Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+8801XXXXXXXXX"
                className="bg-gray-100 border-none mt-1"
                type="tel"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="ghost" onClick={resetState}>
                Cancel
              </Button>
              <Button type="submit">
                Find Passenger
              </Button>
            </div>
          </form>
        )}
        
        {step === 'confirm' && foundPassenger && (
            <div className="space-y-6 text-center">
                <h2 className="text-xl font-bold">Is this the correct passenger?</h2>
                <div className="flex flex-col items-center space-y-4 py-4">
                    <Image
                        src={foundPassenger.avatarUrl}
                        alt={foundPassenger.name}
                        width={80}
                        height={80}
                        data-ai-hint={foundPassenger.avatarHint}
                        className="rounded-full"
                    />
                    <div>
                        <p className="text-lg font-semibold">{foundPassenger.name}</p>
                        <p className="text-gray-600">{foundPassenger.phone}</p>
                        <p className="text-gray-500">{foundPassenger.tripCount} {foundPassenger.tripCount === 1 ? 'trip' : 'trips'}</p>
                    </div>
                </div>
                 <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="ghost" onClick={() => setStep('search')}>
                        Back
                    </Button>
                    <Button onClick={handleConfirmAdd}>
                        Add to Favorites
                    </Button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
