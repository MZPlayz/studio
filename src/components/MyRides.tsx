
'use client';

import { Clock, Heart, MapPin, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';

const RideOption = ({ href, label, icon: Icon, color, textColor }: { href:string; label:string; icon: React.ElementType; color:string; textColor:string; }) => {
    return (
        <Link href={href} className="flex flex-col items-center space-y-2 group">
             <div className={`w-16 h-16 flex items-center justify-center rounded-xl ${color} group-hover:opacity-90 transition-opacity`}>
                <Icon className={`h-8 w-8 ${textColor}`} />
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</span>
        </Link>
    );
}

export default function MyRides() {
    const { t } = useLanguage();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    const rideOptions = [
        { href: "/booking-history", label: t("ride_history"), icon: Clock, color: "bg-green-100", textColor: "text-green-600" },
        { href: "/favorites", label: t("favorite_places"), icon: Heart, color: "bg-pink-100", textColor: "text-pink-600" },
        { href: "/saved-places", label: t("saved_places"), icon: MapPin, color: "bg-blue-100", textColor: "text-blue-600" },
    ];

  return (
    <Card className="p-4 rounded-xl shadow-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{isClient ? t('my_rides') : 'My Rides'}</h2>
            <Link href="#">
                <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </Link>
        </div>
        {isClient && (
            <div className="grid grid-cols-3 gap-4">
                {rideOptions.map((option) => (
                    <RideOption key={option.label} {...option} />
                ))}
            </div>
        )}
    </Card>
  );
}
