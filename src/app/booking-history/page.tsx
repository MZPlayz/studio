
'use client';

import { useState } from 'react';
import { Truck, Bike, Ship, MoreVertical, Volume2, VolumeX, Search } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const mockBookingsData = [
  {
    id: '#RBK90433',
    vehicleType: 'প্রাইভেট কার',
    vehicleIcon: Truck,
    relativeDate: 'আজ',
    status: 'processing',
    bookingTime: '২৬ জুলাই ২০২৫, সকাল ১০টা',
    route: 'মিরপুর → গুলশান',
    passengers: '২ জন',
    luggage: '10KG',
    driverName: 'রুবেল ভাই',
    driverPhone: '017XXXXXXXX',
    fare: 850,
  },
  {
    id: '#RBK90434',
    vehicleType: 'বাইক',
    vehicleIcon: Bike,
    relativeDate: 'গতকাল',
    status: 'complete',
    bookingTime: '২৫ জুলাই ২০২৫, বিকাল ৩টা',
    route: 'ধানমন্ডি → উত্তরা',
    passengers: '১ জন',
    luggage: 'নেই',
    driverName: 'আকবর হোসেন',
    driverPhone: '018XXXXXXXX',
    fare: 350,
  },
  {
    id: '#RBK90435',
    vehicleType: 'লঞ্চ',
    vehicleIcon: Ship,
    relativeDate: '২ দিন আগে',
    status: 'canceled',
    bookingTime: '২৪ জুলাই ২০২৫, সকাল ৯টা',
    route: 'সদরঘাট → চাঁদপুর',
    passengers: '৪ জন',
    luggage: '50KG',
    driverName: 'কাশেম মিয়া',
    driverPhone: '019XXXXXXXX',
    fare: 1200,
  },
];

const SearchBar = () => {
    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
                type="search"
                placeholder="বুকিং আইডি বা গাড়িওয়ালার নাম দিয়ে খুঁজুন..."
                className="w-full rounded-full border-gray-300 bg-white p-3 pl-10 text-gray-700 placeholder-gray-500 shadow-sm"
            />
        </div>
    );
};


const BookingCard = ({ booking, onCancel }: { booking: any, onCancel: (id: string) => void }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'processing': return 'bg-yellow-200 text-yellow-800';
            case 'complete': return 'bg-green-200 text-green-800';
            case 'canceled': return 'bg-red-200 text-red-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };
    
    const handleConfirmCancel = () => {
        onCancel(booking.id);
        setIsModalOpen(false);
    };

    const cancellationFee = (booking.fare * 0.30).toFixed(2);

    return (
        <>
            <Card className="w-full overflow-hidden shadow-md">
                <CardHeader className="p-4 bg-gray-50/50">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <booking.vehicleIcon className="h-5 w-5 text-gray-600" />
                            <p className="font-semibold text-gray-800">{booking.vehicleType}</p>
                            <span className="text-sm text-gray-500">({booking.relativeDate})</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <Badge className={`${getStatusVariant(booking.status)} font-medium`}>{booking.status}</Badge>
                            {booking.status === 'processing' && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => setIsModalOpen(true)} className="text-red-600">
                                            Cancel Trip
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 text-sm">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <p><span className="font-medium text-gray-600">বুকিং আইডি:</span> {booking.id}</p>
                        <p><span className="font-medium text-gray-600">বুকিং টাইম:</span> {booking.bookingTime}</p>
                        <p className="col-span-2"><span className="font-medium text-gray-600">যাত্রা:</span> {booking.route}</p>
                        <p><span className="font-medium text-gray-600">যাত্রী সংখ্যা:</span> {booking.passengers}</p>
                        <p><span className="font-medium text-gray-600">মালামাল:</span> {booking.luggage}</p>
                        <div>
                            <p><span className="font-medium text-gray-600">গাড়িওয়ালার নাম:</span> {booking.driverName}</p>
                            <p><span className="font-medium text-gray-600">মোবাইল নম্বর:</span> {booking.driverPhone}</p>
                        </div>
                        <div className="text-right self-end">
                            <p className="font-semibold text-lg text-green-600">ভাড়া: ৳{booking.fare}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-0">
                    {booking.status === 'canceled' ? (
                        <Button variant="secondary" className="w-full rounded-t-none bg-gray-200 text-gray-500 hover:bg-gray-300">
                            <VolumeX className="mr-2 h-5 w-5" />
                            কল রেকর্ড অনুপলব্ধ
                        </Button>
                    ) : (
                         <Button className="w-full rounded-t-none bg-blue-500 hover:bg-blue-600 text-white">
                            <Volume2 className="mr-2 h-5 w-5" />
                            কল রেকর্ড শুনুন
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>আপনি কি বুকিংটি বাতিল করতে নিশ্চিত?</AlertDialogTitle>
                        <AlertDialogDescription>
                            এই বুকিং বাতিল করলে নির্ধারিত ভাড়া ৳{booking.fare} থেকে ৩০% চার্জ (৳{cancellationFee}) কেটে নেওয়া হবে।
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>না, ফিরে যান</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmCancel} className="bg-red-600 hover:bg-red-700">
                            হ্যাঁ, বাতিল করুন
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default function BookingHistoryPage() {
    const [bookings, setBookings] = useState(mockBookingsData);
    
    const handleCancelBooking = (id: string) => {
        setBookings(currentBookings =>
            currentBookings.map(b =>
                b.id === id ? { ...b, status: 'canceled' } : b
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 font-sans">
            <header className="text-center mb-4">
                 <Link href="/home" className="absolute left-4 top-4">
                    <Button variant="ghost" size="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">বুকিং হিস্ট্রি</h1>
            </header>
            
            <main className="space-y-4">
                <SearchBar />
                {bookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
                ))}
            </main>
        </div>
    );
}
