
'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import HyperText from './ui/hyper-text';
import { useLanguage } from '@/context/LanguageContext';

interface ProfileImageUploadProps {
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export default function ProfileImageUpload({ onNext, onSkip, onBack }: ProfileImageUploadProps) {
  const { t } = useLanguage();
  return (
    <div className="flex w-full flex-col">
       <HyperText className="text-2xl font-bold text-gray-800 text-center">
          {t('profile_image_title')}
        </HyperText>
        <p className="mb-8 text-gray-600 text-center mt-2">{t('add_profile_photo_prompt')}</p>
      
      <main className="flex flex-1 flex-col items-center justify-center text-center">
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
          <p className="mt-4 text-lg font-bold">{t('add_photo')}</p>
          <p className="text-sm text-gray-500">{t('tap_to_add_photo')}</p>
        </div>
      </main>
      <footer className="mt-auto space-y-4 pt-8">
        <button
          onClick={onSkip}
          className="w-full font-semibold text-purple-600 transition-colors hover:text-purple-800"
        >
          {t('skip')}
        </button>
        <button
          onClick={onNext}
          className="w-full rounded-md bg-[#8A2BE2] py-3 font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {t('next')}
        </button>
         <button
          onClick={onBack}
          className="w-full font-semibold text-gray-600 transition-colors hover:text-gray-800 pt-2"
        >
          {t('back')}
        </button>
      </footer>
    </div>
  );
}
