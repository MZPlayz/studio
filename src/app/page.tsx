// /src/app/page.tsx

'use client';

// CRITICAL: Import the Mapbox GL CSS for styling
import 'mapbox-gl/dist/mapbox-gl.css';

import MapComponent from '@/components/MapComponent';

export default function HomePage() {
  if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-red-500">
          Error: Mapbox Access Token is not configured. Please check your .env file.
        </p>
      </div>
    );
  }

  return (
    <main className="h-screen w-screen">
      <MapComponent />
    </main>
  );
}
