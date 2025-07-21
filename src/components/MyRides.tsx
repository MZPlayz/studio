import { Clock, Heart, Users, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const rideOptions = [
    { href: "/booking-history", label: "রাইড হিস্টোরি", icon: Clock, color: "green" },
    { href: "/rider-history", label: "রাইডার হিস্টোরি", icon: Users, color: "yellow" },
    { href: "/favorites", label: "প্রিয় স্থান", icon: Heart, color: "pink" },
    { href: "/saved-places", label: "সংরক্ষিত স্থান", icon: MapPin, color: "blue" },
];

const colorClasses = {
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-500' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-500' },
};

const RideOption = ({ href, label, icon: Icon, color }: typeof rideOptions[0]) => {
    const { bg, text } = colorClasses[color as keyof typeof colorClasses];
    return (
        <Link href={href} className="flex flex-col items-center space-y-2">
            <div className={`${bg} rounded-lg w-full h-16 flex items-center justify-center`}>
                <Icon className={`h-8 w-8 ${text}`} />
            </div>
            <p className="text-xs text-gray-600 text-center">{label}</p>
        </Link>
    );
}

export default function MyRides() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 text-lg">আমার রাইড</h2>
        <button>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {rideOptions.map((option) => (
            <RideOption key={option.label} {...option} />
        ))}
      </div>
    </div>
  );
}
