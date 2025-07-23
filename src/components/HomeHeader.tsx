
"use client";

import { Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeHeader() {
  const { t } = useLanguage();
  return (
    <header className="bg-primary px-4 py-5 fixed top-0 left-0 right-0 z-10 rounded-b-3xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Avatar className="h-14 w-14 border-2 border-white">
            <AvatarImage src="https://placehold.co/64x64.png" alt="Profile Picture" data-ai-hint="woman portrait" />
            <AvatarFallback>AH</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-lg text-white">{t('alif_hossain')}</p>
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
