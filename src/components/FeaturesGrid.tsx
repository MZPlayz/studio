
import { Car, Clock, List, Plus, Send, Headphones, Wrench, Gift, History, CalendarCheck, TrendingUp, UserPlus, Clipboard, Youtube, Star, Users } from 'lucide-react';
import Link from 'next/link';

const baseFeatures = [
  { icon: Car, label: 'গাড়ি বুকিং', href: '/find-trip' },
  { icon: Clock, label: 'বুকিং হিস্ট্রি', href: '/booking-history' },
  { icon: History, label: 'লেনদেন', href: '/transaction-history' },
  { icon: Plus, label: 'অ্যাড মানি', href: '/add-money' },
  { icon: Send, label: 'সেন্ড মানي', href: '/send-money' },
  { icon: Headphones, label: 'সাপোর্ট', href: '/support' },
  { icon: CalendarCheck, label: 'আজকের রাইড', href: '/todays-rides' },
  { icon: Gift, label: 'রেফারেল', href: '/referrals' },
];

const agentFeatures = [
    { icon: TrendingUp, label: 'ইনকাম হিস্ট্রি', href: '/income-history' },
    { icon: UserPlus, label: 'অ্যাকাউন্ট তৈরি', href: '/create-account' },
    { icon: Users, label: 'প্রিয় কাস্টমার', href: '/favorite-passengers' },
    { icon: Star, label: 'প্রিয় রাইডার', href: '/favorite-riders' },
    { icon: Clipboard, label: 'তৈরি রেকর্ড', href: '#' },
    { icon: Youtube, label: 'ট্রেনিং/গাইড', href: '/training-guide' },
    ...baseFeatures.slice(0, 6)
];

const FeatureItem = ({ icon: Icon, label, href }: { icon: React.ElementType, label: string, href: string }) => (
    <Link href={href} className="flex flex-col items-center justify-center space-y-2 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="bg-purple-100 rounded-lg p-3 w-16 h-16 flex items-center justify-center">
            <Icon className="h-8 w-8 text-purple-600" />
        </div>
        <p className="text-xs text-center text-gray-700 font-medium">{label}</p>
    </Link>
);


interface FeaturesGridProps {
    userType?: 'customer' | 'agent';
}

export default function FeaturesGrid({ userType = 'customer' }: FeaturesGridProps) {
  const features = userType === 'agent' ? agentFeatures : baseFeatures;

  return (
    <div className="grid grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <FeatureItem key={index} icon={feature.icon} label={feature.label} href={feature.href} />
      ))}
    </div>
  );
}
