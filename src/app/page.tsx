
'use client';

import { Lock, Smartphone, Leaf } from 'lucide-react';
import Link from 'next/link';
import { APIProvider } from '@vis.gl/react-google-maps';
import MapComponent from '@/components/MapComponent';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h2>
                <p className="text-gray-700">Google Maps API key is missing.</p>
                <p className="text-sm text-gray-500 mt-2">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.</p>
            </div>
        </div>
    );
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <div className="h-screen w-screen">
             <MapComponent />
        </div>
    </APIProvider>
  );
}

    