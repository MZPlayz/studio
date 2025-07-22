
import { Clock, Heart, Users, MapPin, ChevronRight, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const rideOptions = [
    { href: "/booking-history", label: "রাইড হিস্টোরি", icon: Clock, color: "bg-green-100 text-green-700" },
    { href: "/favorites", label: "প্রিয় স্থান", icon: Heart, color: "bg-pink-100 text-pink-700" },
    { href: "/saved-places", label: "সংরক্ষিত স্থান", icon: MapPin, color: "bg-blue-100 text-blue-700" },
];

const RideOption = ({ href, label, icon: Icon, color }: typeof rideOptions[0]) => {
    return (
        <Link href={href} className="flex flex-col items-center space-y-2">
             <div className={`w-20 h-20 flex items-center justify-center rounded-2xl ${color}`}>
                <Icon className={`h-8 w-8`} />
            </div>
            <span className="text-xs font-medium text-gray-700">{label}</span>
        </Link>
    );
}

export default function MyRides() {
  return (
    <Card className="p-4 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">আমার রাইড</h2>
            <Link href="/booking-history">
                <ChevronUp className="h-5 w-5 text-gray-500" />
            </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
            {rideOptions.map((option) => (
                <RideOption key={option.label} {...option} />
            ))}
        </div>
    </Card>
  );
}
