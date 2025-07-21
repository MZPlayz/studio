
"use client";

import Image from 'next/image';
import { Bell } from 'lucide-react';

export default function HomeHeader() {

  return (
    <header className="bg-purple-600 h-40 rounded-b-3xl px-6 py-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="https://placehold.co/64x64.png"
            alt="Profile Picture"
            width={64}
            height={64}
            data-ai-hint="woman portrait"
            className="rounded-full"
          />
          <div>
            <p className="font-bold text-lg text-white">আলিফ হোসেন</p>
            <p className="text-sm text-purple-200">01234567890</p>
          </div>
        </div>
        <button className="text-purple-200">
          <Bell size={24} />
        </button>
      </div>
    </header>
  );
}
