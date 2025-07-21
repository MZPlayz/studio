
'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export default function ChatHeader() {
  return (
    <header className="flex items-center space-x-4 border-b bg-white p-3 sticky top-0 z-10">
      <Link href="/home">
        <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Button>
      </Link>
      <div className="relative">
        <Image
          src="https://placehold.co/40x40.png"
          alt="Support Agent"
          width={40}
          height={40}
          data-ai-hint="logo icon"
          className="rounded-full"
        />
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
      </div>
      <div>
        <h1 className="font-bold text-gray-800">RideGo Support</h1>
        <p className="text-xs text-gray-500">Typically replies within minutes</p>
      </div>
    </header>
  );
}
