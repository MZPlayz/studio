
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DriverTripMapPage() {
  // This page is temporarily disabled as we switch to Mapbox
  return (
    <div className="flex h-screen flex-col font-sans">
      <header className="sticky top-0 z-20 flex items-center border-b bg-white p-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">সংরক্ষিত স্থান</h1>
        <div className="w-10" />
      </header>
      <main className="flex-grow flex items-center justify-center">
        <p>This feature is currently being updated.</p>
      </main>
    </div>
  );
}
