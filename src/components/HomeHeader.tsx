
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Bell, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const content = {
    bn: {
        balance: "ব্যালেন্স"
    },
    en: {
        balance: "Balance"
    }
}

export default function HomeHeader() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const { language } = useLanguage();
  const currentContent = content[language];

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <div className="relative mb-12">
      <div className="bg-purple-600 h-40 rounded-b-3xl p-4 text-white">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Image
              src="https://placehold.co/64x64.png"
              alt="Profile Picture"
              width={56}
              height={56}
              data-ai-hint="woman portrait"
              className="rounded-full border-2 border-white"
            />
            <div>
              <p className="font-bold text-lg">আলিফ হোসেন</p>
              <p className="text-sm">01234567890</p>
            </div>
          </div>
          <button>
            <Bell size={24} />
          </button>
        </div>
      </div>
      <div className="absolute top-28 left-0 right-0 px-4">
        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">{currentContent.balance}</p>
            {isBalanceVisible ? (
              <p className="text-2xl font-bold">৳7.00</p>
            ) : (
              <p className="text-2xl font-bold">৳ ●●●●</p>
            )}
          </div>
          <button className="text-gray-400" onClick={toggleBalanceVisibility}>
            {isBalanceVisible ? <Eye size={24} /> : <EyeOff size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}
