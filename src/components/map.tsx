"use client";

import React from 'react';
import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Map() {
  const position = { lat: 23.8103, lng: 90.4125 };
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background p-4">
        <Card className="max-w-md text-center">
            <CardHeader>
                <CardTitle className="text-destructive">Configuration Error</CardTitle>
                <CardDescription>
                    Google Maps API Key is missing.
                    <br />
                    Please add <code className="bg-muted p-1 rounded-sm font-mono text-sm">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your environment variables.
                </CardDescription>
            </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
        <GoogleMap
            defaultCenter={position}
            defaultZoom={13}
            mapId="ridemap-map-d2e7f5g8"
            disableDefaultUI={true}
            gestureHandling={'greedy'}
            className="w-full h-full border-none"
        />
    </APIProvider>
  );
};
