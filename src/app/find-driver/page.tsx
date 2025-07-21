
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Search, ChevronDown, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const mockDrivers = [
  {
    id: '1',
    name: 'Rubel Mia',
    car: 'Toyota Prius',
    location: 'Mirpur, Dhaka',
    rating: 4.5,
    avatar: 'https://placehold.co/80x80.png',
    hint: 'man portrait',
  },
  {
    id: '2',
    name: 'Rohan Khan',
    car: 'Honda Civic',
    location: 'Mirpur, Dhaka',
    rating: 4.2,
    avatar: 'https://placehold.co/80x80.png',
    hint: 'man portrait',
  },
  {
    id: '3',
    name: 'Arif Hasan',
    car: 'Nissan Altima',
    location: 'Mirpur, Dhaka',
    rating: 4.8,
    avatar: 'https://placehold.co/80x80.png',
    hint: 'man portrait',
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = totalStars - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full_${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
      ))}
      {[...Array(halfStars)].map((_, i) => (
        <Star key={`half_${i}`} className="h-4 w-4 text-yellow-400" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty_${i}`} className="h-4 w-4 text-gray-300" />
      ))}
    </div>
  );
};

const DriverListItem = ({ driver, isSelected, onSelect }: { driver: any; isSelected: boolean; onSelect: () => void; }) => {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer ${isSelected ? 'bg-blue-100' : 'bg-white'}`}
    >
      <Image
        src={driver.avatar}
        alt={driver.name}
        width={64}
        height={64}
        data-ai-hint={driver.hint}
        className="rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center">
          <p className="font-semibold text-gray-800">{driver.name}</p>
          <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
        </div>
        <p className="text-sm text-gray-600">{driver.car}</p>
        <p className="text-sm text-gray-500">{driver.location}</p>
      </div>
      <div className="text-right">
        <StarRating rating={driver.rating} />
        <p className="text-sm text-gray-600">({driver.rating})</p>
      </div>
    </div>
  );
};

export default function FindDriverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const router = useRouter();

  const handleBook = () => {
    if (selectedDriverId) {
      const selectedDriver = mockDrivers.find(d => d.id === selectedDriverId);
      router.push(`/trip-details?driver=${encodeURIComponent(JSON.stringify(selectedDriver))}`);
    }
  };

  const filteredDrivers = mockDrivers.filter(driver => 
    driver.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      <header className="flex items-center p-4 bg-white sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold mx-auto">Find a Charger</h1>
        <div className="w-10"></div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Search for riders" 
            className="pl-10 bg-white border-gray-200 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="rounded-full bg-white">Filter <ChevronDown className="ml-1 h-4 w-4" /></Button>
          <Button variant="outline" className="rounded-full bg-white">Car Type <ChevronDown className="ml-1 h-4 w-4" /></Button>
        </div>
        
        <Card className="overflow-hidden rounded-xl shadow-sm">
          <CardContent className="p-0">
            <div className="relative aspect-video w-full bg-yellow-400/80">
                <Image src="https://placehold.co/600x400.png" layout="fill" objectFit="cover" alt="Map placeholder" data-ai-hint="city map" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {filteredDrivers.map(driver => (
            <DriverListItem 
              key={driver.id} 
              driver={driver} 
              isSelected={selectedDriverId === driver.id}
              onSelect={() => setSelectedDriverId(driver.id)}
            />
          ))}
        </div>
      </main>
      
      <footer className="p-4 bg-gray-50 border-t border-gray-200">
        <Button 
          className="w-full bg-blue-200 text-blue-800 hover:bg-blue-300 py-6 text-lg font-semibold"
          disabled={!selectedDriverId}
          onClick={handleBook}
        >
          Book
        </Button>
      </footer>
    </div>
  );
}
