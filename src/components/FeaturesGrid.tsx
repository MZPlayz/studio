
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
    <Link href={href} className="group">
        <Card className="rounded-2xl shadow-sm h-48 hover:bg-accent transition-colors">
            <CardContent className="flex flex-col items-center justify-between h-full p-4">
                 <div className="flex-grow flex items-center justify-center">
                    <Icon className="h-8 w-8 text-purple-300" />
                </div>
                <p className="text-xs text-muted-foreground text-center">{label}</p>
            </CardContent>
        </Card>
    </Link>
);


interface FeaturesGridProps {
    userType?: 'customer' | 'agent';
}

export default function FeaturesGrid({ userType = 'customer' }: FeaturesGridProps) {
  const features = baseFeatures;

  return (
    <div className="grid grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <FeatureItem key={index} icon={feature.icon} label={feature.label} href={feature.href} />
      ))}
    </div>
  );
}
