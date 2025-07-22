
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Person } from '@/app/favorite-passengers/page';

interface AddByPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (person: Omit<Person, 'id'>) => void;
  personType: 'customer' | 'rider';
}

export default function AddByPhoneModal({
  isOpen,
  onClose,
  onAdd,
  personType,
}: AddByPhoneModalProps) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFindAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!phone.trim()) {
        setError('Phone number is required.');
        return;
    }

    // Simulate finding a passenger from an API

    // Simulate success by creating a new mock person
    const newPerson: Omit<Person, 'id'> = {
      name: personType === 'customer' ? 'New Customer' : 'New Rider',
      phone: phone,
      avatarUrl: 'https://placehold.co/48x48.png',
      avatarHint: 'person outline',
      tripCount: Math.floor(Math.random() * 10),
      type: personType,
    };
    
    onAdd(newPerson);
    resetState();
  };
  
  const resetState = () => {
      setPhone('');
      setError(null);
      onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0">
      <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl m-4">
          <form onSubmit={handleFindAndAdd} className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Add Favorite {personType === 'customer' ? 'Customer' : 'Rider'}</h2>
            <div>
              <Label htmlFor="phone">{personType === 'customer' ? 'Customer' : 'Rider'}'s Phone Number</Label>
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
                Add
              </Button>
            </div>
          </form>
      </div>
    </div>
  );
}
