
import { Car, Clock, List, Plus, Send, Headphones, Wrench, Gift, History, CalendarCheck, TrendingUp, UserPlus, Clipboard, Youtube } from 'lucide-react';
import Link from 'next/link';

const baseFeatures = [
  { icon: Car, label: 'গাড়ি বুকিং', href: '/trip-details' },
  { icon: Clock, label: 'বুকিং হিস্ট্রি', href: '/booking-history' },
  { icon: History, label: 'লেনদেন', href: '/transaction-history' },
  { icon: Plus, label: 'অ্যাড মানি', href: '/add-money' },
  { icon: Send, label: 'সেন্ড মানি', href: '/send-money' },
  { icon: Headphones, label: 'সাপোর্ট', href: '/support' },
  { icon: CalendarCheck, label: 'আজকের রাইড', href: '/todays-rides' },
  { icon: Gift, label: 'রেফারেল', href: '/referrals' },
];

const agentFeatures = [
    ...baseFeatures,
    { icon: TrendingUp, label: 'ইনকাম হিস্ট্রি', href: '/income-history' },
    { icon: UserPlus, label: 'অ্যাকাউন্ট তৈরি', href: '/create-account' },
    { icon: Clipboard, label: 'তৈরি রেকর্ড', href: '#' },
    { icon: Youtube, label: 'ট্রেনিং/গাইড', href: '#' }
];


interface FeaturesGridProps {
    userType?: 'customer' | 'agent';
}

export default function FeaturesGrid({ userType = 'customer' }: FeaturesGridProps) {
  const features = userType === 'agent' ? agentFeatures : baseFeatures;
  const gridClasses = userType === 'agent' ? 'grid-cols-4 grid-rows-3' : 'grid-cols-4';

  return (
    <div className={`grid ${gridClasses} gap-4 text-center`}>
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <Link href={feature.href} passHref>
            <button className="bg-purple-100 rounded-lg p-3 w-16 h-16 flex items-center justify-center">
              <feature.icon className="h-8 w-8 text-purple-600" />
            </button>
          </Link>
          <p className="text-xs text-gray-700 font-medium">{feature.label}</p>
        </div>
      ))}
    </div>
  );
}
