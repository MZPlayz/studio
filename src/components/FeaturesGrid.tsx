import { Car, Clock, List, Plus, Send, Headphones, Wrench, Gift, History } from 'lucide-react';
import Link from 'next/link';

const features = [
  { icon: Car, label: 'গাড়ি বুকিং', href: '/trip-details' },
  { icon: Clock, label: 'বুকিং হিস্ট্রি', href: '/booking-history' },
  { icon: History, label: 'লেনদেন', href: '/transaction-history' },
  { icon: Plus, label: 'অ্যাড মানি', href: '/add-money' },
  { icon: Send, label: 'সেন্ড মানি', href: '/send-money' },
  { icon: Headphones, label: 'সাপোর্ট', href: '/support' },
  { icon: Wrench, label: 'রুলস', href: '#' },
  { icon: Gift, label: 'রেফারেল', href: '/referrals' },
];

export default function FeaturesGrid() {
  return (
    <div className="grid grid-cols-4 gap-4 text-center">
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
