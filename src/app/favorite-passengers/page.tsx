
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddByPhoneModal from '@/components/AddByPhoneModal';

export interface Person {
  id: number;
  name: string;
  phone: string;
  avatarUrl: string;
  avatarHint: string;
  tripCount: number;
  type: 'customer' | 'rider';
}

const mockCustomers: Person[] = [
  {
    id: 1,
    name: 'Sophia Carter',
    phone: '01712345678',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'woman portrait',
    tripCount: 4,
    type: 'customer',
  },
  {
    id: 2,
    name: 'Ethan Bennett',
    phone: '01812345678',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'man portrait',
    tripCount: 2,
    type: 'customer',
  },
];

const FavoritePersonItem = ({ person }: { person: Person }) => (
  <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100">
    <Image
      src={person.avatarUrl}
      alt={person.name}
      width={48}
      height={48}
      data-ai-hint={person.avatarHint}
      className="rounded-full flex-shrink-0"
    />
    <div className="flex-1">
      <p className="font-semibold text-gray-800">{person.name}</p>
      <p className="text-sm text-gray-500">{person.phone}</p>
      <p className="text-sm text-gray-500">{person.tripCount} Total Bookings</p>
    </div>
  </div>
);

export default function FavoriteCustomersPage() {
  const [customers, setCustomers] = useState<Person[]>(mockCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddFavorite = (newPerson: Omit<Person, 'id'>) => {
    setCustomers((prev) => [
        ...prev, 
        { ...newPerson, id: Date.now() }
    ]);
    setIsModalOpen(false);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
        <Link href="/agent-home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">Favorite Customers</h1>
        <div className="w-10" />
      </header>

      <main className="p-4 space-y-4 pb-24">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
                type="search"
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border-gray-300 bg-white py-3 pl-10"
            />
        </div>

        <div className="space-y-2">
            {filteredCustomers.map((person) => (
                <FavoritePersonItem key={person.id} person={person} />
            ))}
        </div>
      </main>

      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
        size="icon"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>

      <AddByPhoneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddFavorite}
        personType="customer"
      />
    </div>
  );
}
