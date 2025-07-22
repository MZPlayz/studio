
import { Car, Clock, Plus, Send, Headphones, Gift, List, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const baseFeatures = [
  { icon: Car, label: 'গাড়ি বুকিং', href: '/find-trip' },
  { icon: Clock, label: 'বুকিং হিস্ট্রি', href: '/booking-history' },
  { icon: List, label: 'রাইডার লিস্ট', href: '/rider-history' },
  { icon: Plus, label: 'অ্যাড মানি', href: '/add-money' },
  { icon: Send, label: 'সেন্ড মানি', href: '/send-money' },
  { icon: Headphones, label: 'সাপোর্ট', href: '/support' },
  { icon: FileText, label: 'রুলস', href: '/rules' },
  { icon: Gift, label: 'রেফারেল', href: '/referrals' },
];

const FeatureItem = ({ icon: Icon, label, href }: { icon: React.ElementType, label: string, href: string }) => (
    <Link href={href} className="group flex flex-col items-center justify-start text-center">
        <Button variant="ghost" className="h-20 w-20 rounded-2xl bg-primary/10 hover:bg-primary/20 flex flex-col items-center justify-center gap-1 p-2">
            <Icon className="h-8 w-8 text-primary" />
        </Button>
        <p className="text-xs text-center font-medium mt-2 text-gray-700">{label}</p>
    </Link>
);


interface FeaturesGridProps {
    userType?: 'customer' | 'agent';
}

export default function FeaturesGrid({ userType = 'customer' }: FeaturesGridProps) {
  const features = baseFeatures;

  return (
    <div className="grid grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <FeatureItem key={index} icon={feature.icon} label={feature.label} href={feature.href} />
      ))}
    </div>
  );
}
