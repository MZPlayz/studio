
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Place } from '@/app/favorites/page';

interface AddEditFavoriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Place, 'id' | 'imageUrl' | 'imageHint'> & { id?: number }) => void;
  mode: 'add' | 'edit';
  initialData: Place | null;
}

export default function AddEditFavoriteModal({ isOpen, onClose, onSubmit, mode, initialData }: AddEditFavoriteModalProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [subAddress, setSubAddress] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name);
      setAddress(initialData.address);
      setSubAddress(initialData.subAddress);
    } else {
      setName('');
      setAddress('');
      setSubAddress('');
    }
  }, [mode, initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      address,
      subAddress
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl m-4">
        <h2 className="text-xl font-bold mb-6">{mode === 'add' ? 'Add a Favorite Place' : 'Edit Favorite Place'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Home, Office" className="bg-gray-100 border-none mt-1" required />
          </div>
          <div>
            <Label htmlFor="address">Location</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter full address" className="bg-gray-100 border-none mt-1" required />
          </div>
           <div>
            <Label htmlFor="subAddress">Sub-address / Details</Label>
            <Input id="subAddress" value={subAddress} onChange={(e) => setSubAddress(e.target.value)} placeholder="e.g., Apt #, Floor" className="bg-gray-100 border-none mt-1" />
          </div>
          <div>
            <Label>Image</Label>
            <Button variant="outline" type="button" className="w-full mt-1 border-dashed">
              Upload Image
            </Button>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Save Place' : 'Update Place'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
