
import { Car, Clock, Plus, Send, Headphones, Gift, History, CalendarCheck } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

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

const FeatureItem = ({ icon: Icon, label, href }: { icon: React.ElementType, label: string, href: string }) => (
    <Link href={href} className="flex flex-col items-center justify-center space-y-2 group">
        <Card className="w-full aspect-square flex items-center justify-center group-hover:shadow-md transition-shadow">
            <CardContent className="p-0 flex flex-col items-center justify-center space-y-2">
                 <div className="bg-purple-100 rounded-lg p-3 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-purple-600" />
                </div>
            </CardContent>
        </Card>
        <p className="text-xs text-center text-gray-700 font-medium">{label}</p>
    </Link>
);


interface FeaturesGridProps {
    userType?: 'customer' | 'agent';
}

export default function FeaturesGrid({ userType = 'customer' }: FeaturesGridProps) {
  // Agent features can be added here later if needed
  const features = baseFeatures;

  return (
    <div className="grid grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <FeatureItem key={index} icon={feature.icon} label={feature.label} href={feature.href} />
      ))}
    </div>
  );
}
