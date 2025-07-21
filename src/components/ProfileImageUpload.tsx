
'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface ProfileImageUploadProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function ProfileImageUpload({ onNext, onSkip }: ProfileImageUploadProps) {
  return (
    <div className="flex h-screen flex-col p-4">
      <header className="relative flex items-center justify-center py-4">
        <button className="absolute left-0">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Profile Image</h1>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="mb-8 text-gray-600">Add a profile photo so people can recognize you</p>
        
        <div className="flex cursor-pointer flex-col items-center">
          <div className="relative h-40 w-40">
            <Image
              src="https://placehold.co/160x160.png"
              alt="Avatar placeholder"
              width={160}
              height={160}
              data-ai-hint="profile woman"
              className="rounded-full object-cover"
            />
          </div>
          <p className="mt-4 text-lg font-bold">Add Photo</p>
          <p className="text-sm text-gray-500">Tap to add a photo</p>
        </div>
      </main>
      <footer className="mt-auto space-y-4 pb-4">
        <button
          onClick={onSkip}
          className="w-full font-semibold text-purple-600 transition-colors hover:text-purple-800"
        >
          Skip
        </button>
        <button
          onClick={onNext}
          className="w-full rounded-md bg-[#8A2BE2] py-3 font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Next
        </button>
      </footer>
    </div>
  );
}
