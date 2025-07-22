
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Driver {
  id: number;
  name: string;
  avatarUrl: string;
  avatarHint: string;
  lastKnownLocation: string;
  carModel: string;
  hasBeenReviewed: boolean;
}

const mockRiders: Driver[] = [
  {
    id: 1,
    name: 'Liam Carter',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'man portrait',
    lastKnownLocation: '123 Main St',
    carModel: 'Toyota Camry',
    hasBeenReviewed: false,
  },
  {
    id: 2,
    name: 'Olivia Chen',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'woman portrait',
    lastKnownLocation: '456 Oak Avenue',
    carModel: 'Honda Civic',
    hasBeenReviewed: true,
  },
  {
    id: 3,
    name: 'Benjamin Lee',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'man portrait',
    lastKnownLocation: '789 Pine Lane',
    carModel: 'Nissan Rogue',
    hasBeenReviewed: false,
  },
];

const RiderHistoryItem = ({ driver, onReviewClick }: { driver: Driver; onReviewClick: (driver: Driver) => void }) => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center space-x-4">
      <Image
        src={driver.avatarUrl}
        alt={driver.name}
        width={48}
        height={48}
        data-ai-hint={driver.avatarHint}
        className="rounded-full"
      />
      <div>
        <p className="font-bold text-gray-800">{driver.name}</p>
        <p className="text-sm text-gray-500">{driver.lastKnownLocation}</p>
        <p className="text-sm text-gray-500">{driver.carModel}</p>
      </div>
    </div>
    <Button
      variant={driver.hasBeenReviewed ? 'secondary' : 'outline'}
      size="sm"
      className={
        driver.hasBeenReviewed
          ? 'cursor-not-allowed bg-gray-200 text-gray-500'
          : 'bg-white'
      }
      onClick={() => !driver.hasBeenReviewed && onReviewClick(driver)}
      disabled={driver.hasBeenReviewed}
    >
      {driver.hasBeenReviewed ? 'Reviewed' : 'Review'}
    </Button>
  </div>
);

const StarRatingInput = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
  return (
    <div className="flex justify-center space-x-2">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button key={starValue} onClick={() => setRating(starValue)}>
            <Star
              className={`h-8 w-8 transition-colors ${
                starValue <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

const ReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
  driver,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: { rating: number; comment: string }) => void;
  driver: Driver | null;
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen || !driver) return null;

  const handleSubmit = () => {
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-center text-xl font-bold">Review {driver.name}</h2>
        <div className="space-y-4">
          <StarRatingInput rating={rating} setRating={setRating} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            rows={4}
            placeholder={`How was your ride? Tell us about your experience with ${driver.name}.`}
          ></textarea>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0}>
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function RiderHistoryPage() {
  const [riders, setRiders] = useState(mockRiders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const handleOpenReviewModal = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDriver(null);
  };

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    if (!selectedDriver) return;
    setRiders((prevRiders) =>
      prevRiders.map((rider) =>
        rider.id === selectedDriver.id ? { ...rider, hasBeenReviewed: true } : rider
      )
    );
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">Rider History</h1>
        <div className="w-10" />
      </header>

      <main className="divide-y divide-gray-200">
        {riders.map((driver) => (
          <RiderHistoryItem key={driver.id} driver={driver} onReviewClick={handleOpenReviewModal} />
        ))}
      </main>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleReviewSubmit}
        driver={selectedDriver}
      />
    </div>
  );
}
