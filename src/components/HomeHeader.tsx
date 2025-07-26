"use client";

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomeHeader() {
  return (
    <header className="bg-primary px-4 py-5 fixed top-0 left-0 right-0 z-10 rounded-b-3xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="h-14 w-14 bg-gray-200 rounded-full"></div>
          <div>
            <p className="font-bold text-lg text-white">User Name</p>
            <p className="text-sm text-purple-200">01234567890</p>
          </div>
        </div>
        <button className="text-white">
          <Bell size={28} />
        </button>
      </div>
    </header>
  );
}
