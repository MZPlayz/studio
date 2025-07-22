
import { Clock, Heart, Users, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const rideOptions = [
    { href: "/booking-history", label: "রাইড হিস্টোরি", icon: Clock, color: "bg-green-100" },
    { href: "/rider-history", label: "রাইডার হিস্টোরি", icon: Users, color: "bg-yellow-100" },
    { href: "/favorites", label: "প্রিয় স্থান", icon: Heart, color: "bg-pink-100" },
    { href: "/saved-places", label: "সংরক্ষিত স্থান", icon: MapPin, color: "bg-blue-100" },
];

const RideOption = ({ href, label, icon: Icon, color }: typeof rideOptions[0]) => {
    return (
        <Link href={href}>
            <Button variant="ghost" className={`w-full h-16 flex items-center justify-start p-4 space-x-4 rounded-xl ${color}`}>
                <Icon className={`h-6 w-6 text-gray-700`} />
                <span className="text-sm font-medium text-gray-800">{label}</span>
            </Button>
        </Link>
    );
}

export default function MyRides() {
  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">আমার রাইড</h2>
            <Link href="/booking-history">
                <ChevronRight className="h-6 w-6 text-gray-400" />
            </Link>
        </div>
        <div className="grid grid-cols-4 gap-4">
            {rideOptions.map((option) => (
                <RideOption key={option.label} {...option} />
            ))}
        </div>
    </div>
  );
}
