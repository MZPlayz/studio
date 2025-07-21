// /src/app/page.tsx

'use client';

// CRITICAL: Import the Mapbox GL CSS for styling
import 'mapbox-gl/dist/mapbox-gl.css';

import MapComponent from '@/components/MapComponent';

export default function HomePage() {
  if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="text-center p-4 rounded-md bg-white shadow-md">
            <h1 className="text-xl font-bold text-red-600 mb-2">Configuration Error</h1>
            <p className="text-gray-700">
            Mapbox Access Token is not configured.
            </p>
            <p className="text-gray-500 text-sm mt-2">
            Please add your token to the <code className="bg-gray-200 p-1 rounded">.env</code> file.
            </p>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen w-screen font-sans">
      <MapComponent />
    </main>
  );
}
