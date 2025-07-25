
'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';

const suggestions = [
  { img: 'https://placehold.co/120x90.png', hint: 'tennis player' },
  { img: 'https://placehold.co/120x90.png', hint: 'man portrait' },
  { img: 'https://placehold.co/120x90.png', hint: 'medicine bottle' },
  { img: 'https://placehold.co/120x90.png', hint: 'code screen' },
];

export default function Suggestions() {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl">
      <h2 className="font-bold text-gray-800 dark:text-white mb-2">{t('suggestions')}</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {suggestions.map((item, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={item.img}
              alt="Suggestion"
              width={120}
              height={90}
              data-ai-hint={item.hint}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
