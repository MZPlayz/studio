import { Clock, Heart, Users, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const rideOptions = [
    { href: "/booking-history", label: "রাইড হিস্টোরি", icon: Clock, color: "green" },
    { href: "/rider-history", label: "রাইডার হিস্টোরি", icon: Users, color: "yellow" },
    { href: "/favorites", label: "প্রিয় স্থান", icon: Heart, color: "pink" },
    { href: "/saved-places", label: "সংরক্ষিত স্থান", icon: MapPin, color: "blue" },
];

const colorClasses = {
    green: 'bg-green-100 text-green-600 hover:bg-green-200',
    yellow: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200',
    pink: 'bg-pink-100 text-pink-500 hover:bg-pink-200',
    blue: 'bg-blue-100 text-blue-500 hover:bg-blue-200',
};

const RideOption = ({ href, label, icon: Icon, color }: typeof rideOptions[0]) => {
    const colorClass = colorClasses[color as keyof typeof colorClasses];
    return (
        <Link href={href} className="flex flex-col items-center space-y-2">
            <Button variant="outline" className={`w-full h-16 flex items-center justify-center rounded-lg border-0 ${colorClass}`}>
                <Icon className={`h-8 w-8`} />
            </Button>
            <p className="text-xs text-gray-600 text-center">{label}</p>
        </Link>
    );
}

export default function MyRides() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center pb-4">
        <CardTitle className="text-lg">আমার রাইড</CardTitle>
        <button>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
            {rideOptions.map((option) => (
                <RideOption key={option.label} {...option} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
