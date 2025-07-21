import { Clock, Heart, MapPin, ChevronUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function MyRides() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800">আমার রাইড</h2>
        <button>
          <ChevronUp className="text-gray-500" />
        </button>
      </div>
      <div className="flex justify-around items-center text-center">
        <Link href="/booking-history" className="flex flex-col items-center space-y-2">
          <div className="bg-green-100 rounded-lg w-20 h-16 flex items-center justify-center">
            <Clock className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-600">রাইড হিস্টোরি</p>
        </Link>
        <Link href="/rider-history" className="flex flex-col items-center space-y-2">
          <div className="bg-yellow-100 rounded-lg w-20 h-16 flex items-center justify-center">
            <Users className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-xs text-gray-600">রাইডার হিস্টোরি</p>
        </Link>
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-pink-100 rounded-lg w-20 h-16 flex items-center justify-center">
            <Heart className="h-8 w-8 text-pink-500" />
          </div>
          <p className="text-xs text-gray-600">প্রিয় স্থান</p>
        </div>
      </div>
    </div>
  );
}
