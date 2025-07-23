
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const suggestions = [
  { img: 'https://placehold.co/120x90.png', hint: 'tennis player' },
  { img: 'https://placehold.co/120x90.png', hint: 'man portrait' },
  { img: 'https://placehold.co/120x90.png', hint: 'medicine bottle' },
  { img: 'https://placehold.co/120x90.png', hint: 'code screen' },
];

export default function Suggestions() {
  const { t } = useLanguage();
  return (
    <div>
      <h2 className="font-bold text-gray-800 mb-2">{t('suggestions')}</h2>
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
