import { Clock, Heart, Users, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function MyRides() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800">আমার রাইড</h2>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <Link href="/booking-history" className="flex flex-col items-center space-y-2">
          <div className="bg-green-100 rounded-lg w-full h-16 flex items-center justify-center">
            <Clock className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-600">রাইড হিস্টোরি</p>
        </Link>
        <Link href="/rider-history" className="flex flex-col items-center space-y-2">
          <div className="bg-yellow-100 rounded-lg w-full h-16 flex items-center justify-center">
            <Users className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-xs text-gray-600">রাইডার হিস্টোরি</p>
        </Link>
        <Link href="/favorites" className="flex flex-col items-center space-y-2">
          <div className="bg-pink-100 rounded-lg w-full h-16 flex items-center justify-center">
            <Heart className="h-8 w-8 text-pink-500" />
          </div>
          <p className="text-xs text-gray-600">প্রিয় স্থান</p>
        </Link>
        <Link href="/saved-places" className="flex flex-col items-center space-y-2">
          <div className="bg-blue-100 rounded-lg w-full h-16 flex items-center justify-center">
            <MapPin className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-xs text-gray-600">সংরক্ষিত স্থান</p>
        </Link>
      </div>
    </div>
  );
}

    