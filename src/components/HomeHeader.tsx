
"use client";

import { Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function HomeHeader() {

  return (
    <header className="bg-purple-600 px-6 py-4 fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://placehold.co/64x64.png" alt="Profile Picture" data-ai-hint="woman portrait" />
            <AvatarFallback>AH</AvatarFallback>
          </Avatar>
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
