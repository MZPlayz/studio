
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddEditFavoriteModal from '@/components/AddEditFavoriteModal';

export interface Place {
  id: number;
  name: string;
  address: string;
  subAddress: string;
  imageUrl: string;
  imageHint: string;
}

const mockPlaces: Place[] = [
  {
    id: 1,
    name: 'Home',
    address: '123 Maple Street',
    subAddress: 'Apartment 4B, Anytown',
    imageUrl: 'https://placehold.co/100x100.png',
    imageHint: 'apartment building',
  },
  {
    id: 2,
    name: 'Work',
    address: '456 Oak Avenue',
    subAddress: 'Suite 200, Business District',
    imageUrl: 'https://placehold.co/100x100.png',
    imageHint: 'office building',
  },
  {
    id: 3,
    name: 'Gym',
    address: '789 Pine Lane',
    subAddress: 'Fitness Center, City Center',
    imageUrl: 'https://placehold.co/100x100.png',
    imageHint: 'gym interior',
  },
];

const FavoriteListItem = ({ place, onEdit, onBookNow }: { place: Place; onEdit: (place: Place) => void; onBookNow: (place: Place) => void; }) => (
    <div className="bg-white rounded-lg p-4 flex flex-col space-y-4">
        <div className="flex items-start justify-between space-x-4">
            <div className="flex-1">
                <p className="text-sm text-gray-500">{place.name}</p>
                <p className="text-lg font-bold text-gray-800">{place.address}</p>
                <p className="text-sm text-gray-500">{place.subAddress}</p>
            </div>
            <Image
                src={place.imageUrl}
                alt={place.name}
                width={80}
                height={80}
                data-ai-hint={place.imageHint}
                className="rounded-lg object-cover"
            />
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex-1 rounded-full bg-gray-100 text-gray-800" onClick={() => onEdit(place)}>
                Edit
            </Button>
            <Button className="flex-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200" onClick={() => onBookNow(place)}>
                Book Now
            </Button>
        </div>
    </div>
);


export default function FavoritesPage() {
    const [places, setPlaces] = useState<Place[]>(mockPlaces);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [currentPlace, setCurrentPlace] = useState<Place | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenAddModal = () => {
        setModalMode('add');
        setCurrentPlace(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (place: Place) => {
        setModalMode('edit');
        setCurrentPlace(place);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentPlace(null);
    };

    const handleSavePlace = (placeData: Omit<Place, 'id' | 'imageUrl' | 'imageHint'> & { id?: number }) => {
        if (modalMode === 'add') {
            const newPlace: Place = {
                id: Date.now(),
                ...placeData,
                imageUrl: 'https://placehold.co/100x100.png',
                imageHint: 'new place',
            };
            setPlaces(prev => [newPlace, ...prev]);
        } else if (currentPlace) {
            setPlaces(prev =>
                prev.map(p =>
                    p.id === currentPlace.id ? { ...p, ...placeData } : p
                )
            );
        }
        handleCloseModal();
    };

    const handleBookNow = (place: Place) => {
        console.log('Booking for:', place.name);
        // Navigate to booking page with place details
    };
    
    const filteredPlaces = places.filter(place =>
        place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.subAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
                <Link href="/home">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <h1 className="flex-1 text-center text-xl font-bold text-gray-800">Favorites</h1>
                <div className="w-10" />
            </header>

            <main className="p-4 space-y-6">
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-full border-gray-200 bg-white py-3 pl-10"
                        />
                    </div>
                    <Button variant="ghost" className="w-full justify-start text-gray-700 text-base" onClick={handleOpenAddModal}>
                        <Plus className="h-6 w-6 mr-2 bg-gray-100 text-gray-600 rounded-full p-1" />
                        Add a favorite place
                    </Button>
                </div>
                
                <div className="space-y-4">
                     <h2 className="text-lg font-bold text-gray-800">Saved places</h2>
                     {filteredPlaces.map(place => (
                         <FavoriteListItem
                            key={place.id}
                            place={place}
                            onEdit={handleOpenEditModal}
                            onBookNow={handleBookNow}
                         />
                     ))}
                </div>
            </main>
            
            <AddEditFavoriteModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSavePlace}
                mode={modalMode}
                initialData={currentPlace}
            />
        </div>
    );
}
