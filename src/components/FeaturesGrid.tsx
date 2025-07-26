
'use client';

import { Car, Clock, Plus, Send, Headphones, Gift, List, FileText } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';

const FeatureItem = ({ icon: Icon, label, href }: { icon: React.ElementType, label: string, href: string }) => (
    <Link href={href} className="group flex flex-col items-center justify-start text-center space-y-2">
        <div className="h-16 w-16 bg-primary/10 flex items-center justify-center rounded-xl group-hover:bg-primary/20 transition-colors dark:bg-gray-800 dark:group-hover:bg-gray-700">
            <Icon className="h-8 w-8 text-primary dark:text-primary-400" />
        </div>
        <p className="text-xs text-center font-medium text-gray-700 dark:text-gray-300 leading-tight">{label}</p>
    </Link>
);

interface FeaturesGridProps {
    userType?: 'customer' | 'agent';
}

export default function FeaturesGrid({ userType = 'customer' }: FeaturesGridProps) {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const features = [
    { icon: Car, label: t('features_car_booking'), href: '/find-trip' },
    { icon: Clock, label: t('features_booking_history'), href: '/booking-history' },
    { icon: List, label: t('features_rider_list'), href: '/rider-history' },
    { icon: Plus, label: t('features_add_money'), href: '/add-money' },
    { icon: Send, label: t('features_send_money'), href: '/send-money' },
    { icon: Headphones, label: t('features_support'), href: '/support' },
    { icon: FileText, label: t('features_rules'), href: '/rules' },
    { icon: Gift, label: t('features_referrals'), href: '/referrals' },
  ];

  if (!isClient) {
    // Render a placeholder or null on the server and initial client render
    return null;
  }

  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-4 bg-white dark:bg-gray-900 p-4 rounded-xl">
      {features.map((feature, index) => (
        <FeatureItem key={index} icon={feature.icon} label={feature.label} href={feature.href} />
      ))}
    </div>
  );
}
