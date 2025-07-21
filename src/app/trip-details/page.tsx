
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ChevronDown, MapPin, Calendar, Clock, User, Search, Plus, Minus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

export default function TripDetailsPage() {
  const [vehicleType, setVehicleType] = useState('road');
  const [vehicleClass, setVehicleClass] = useState('');
  const [hasLuggage, setHasLuggage] = useState(false);
  const [driverMode, setDriverMode] = useState('auto');
  const [dayOrNight, setDayOrNight] = useState('day');

  const vehicleClasses = {
    road: [
      { value: 'car', label: 'Car', image: 'https://placehold.co/40x40.png', hint: 'sedan car' },
      { value: 'bus', label: 'Bus', image: 'https://placehold.co/40x40.png', hint: 'city bus' },
      { value: 'bike', label: 'Bike', image: 'https://placehold.co/40x40.png', hint: 'motorcycle' },
    ],
    river: [
      { value: 'boat', label: 'Boat', image: 'https://placehold.co/40x40.png', hint: 'speed boat' },
      { value: 'ferry', label: 'Ferry', image: 'https://placehold.co/40x40.png', hint: 'river ferry' },
    ],
    sky: [
      { value: 'plane', label: 'Plane', image: 'https://placehold.co/40x40.png', hint: 'small airplane' },
      { value: 'helicopter', label: 'Helicopter', image: 'https://placehold.co/40x40.png', hint: 'helicopter' },
    ],
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Lat:', position.coords.latitude, 'Lng:', position.coords.longitude);
          // Here you would set the state for the current location input
          // e.g., setCurrentLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Handle error (e.g., show a toast to the user)
        }
      );
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="flex flex-col pb-24">
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
            <Link href="/home">
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
            </Link>
          <h1 className="text-xl font-bold">Trip Details</h1>
          <div className="w-10"></div>
        </header>

        <main className="flex-1 space-y-4 p-4">
          {/* Vehicle Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Select Vehicle Type</label>
            <Select onValueChange={setVehicleType} defaultValue="road">
              <SelectTrigger className="w-full bg-gray-100 border-none h-14">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="road">
                  <div className="flex items-center gap-3">
                    <Image src="https://placehold.co/40x40.png" data-ai-hint="road street" alt="Road" width={40} height={40} className="rounded-md" />
                    <span>রাস্তা (Road)</span>
                  </div>
                </SelectItem>
                <SelectItem value="river">
                  <div className="flex items-center gap-3">
                    <Image src="https://placehold.co/40x40.png" data-ai-hint="river water" alt="River" width={40} height={40} className="rounded-md" />
                    <span>নদী (River)</span>
                  </div>
                </SelectItem>
                <SelectItem value="sky">
                  <div className="flex items-center gap-3">
                    <Image src="https://placehold.co/40x40.png" data-ai-hint="sky clouds" alt="Sky" width={40} height={40} className="rounded-md" />
                    <span>আকাশ (Sky)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Vehicle Class */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Select Vehicle Class</label>
            <Select onValueChange={setVehicleClass}>
              <SelectTrigger className="w-full bg-gray-100 border-none h-14">
                <SelectValue placeholder="Select vehicle class" />
              </SelectTrigger>
              <SelectContent>
                {vehicleClasses[vehicleType as keyof typeof vehicleClasses].map(vc => (
                   <SelectItem key={vc.value} value={vc.value}>
                    <div className="flex items-center gap-3">
                      <Image src={vc.image} data-ai-hint={vc.hint} alt={vc.label} width={40} height={40} className="rounded-md" />
                      <span>{vc.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Form Fields */}
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <Input id="name" placeholder="" className="bg-gray-100 border-none" />
          </div>
          <div className="space-y-1">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
            <Input id="phone" type="tel" placeholder="" className="bg-gray-100 border-none" />
          </div>
          <div className="space-y-1">
            <label htmlFor="current-location" className="text-sm font-medium text-gray-700">Current Location</label>
            <div className="relative">
              <Input id="current-location" placeholder="" className="bg-gray-100 border-none pr-10" />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleGetCurrentLocation}>
                <MapPin className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="destination" className="text-sm font-medium text-gray-700">Destination</label>
            <Input id="destination" placeholder="Where to?" className="bg-gray-100 border-none" />
          </div>
          <div className="space-y-1">
            <label htmlFor="travel-date" className="text-sm font-medium text-gray-700">Travel Date</label>
            <div className="relative">
              <Input id="travel-date" placeholder="" className="bg-gray-100 border-none pr-10" />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <Calendar className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="travel-time" className="text-sm font-medium text-gray-700">Travel Time</label>
            <div className="relative">
              <Input id="travel-time" placeholder="" className="bg-gray-100 border-none pr-10" />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <Clock className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
          
          {/* Day/Night Toggle */}
          <div className="flex rounded-md bg-gray-200 p-1">
            <Button
              onClick={() => setDayOrNight('day')}
              className={`flex-1 ${dayOrNight === 'day' ? 'bg-white text-black shadow' : 'bg-transparent text-gray-500'}`}
            >
              Day
            </Button>
            <Button
              onClick={() => setDayOrNight('night')}
              className={`flex-1 ${dayOrNight === 'night' ? 'bg-white text-black shadow' : 'bg-transparent text-gray-500'}`}
            >
              Night
            </Button>
          </div>
          
          {/* Luggage Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Luggage:</span>
            <Button onClick={() => setHasLuggage(true)} variant={hasLuggage ? "secondary" : "ghost"} className={`rounded-full ${hasLuggage ? 'bg-white text-black shadow' : 'bg-gray-200 text-gray-500'}`}>Yes</Button>
            <Button onClick={() => setHasLuggage(false)} variant={!hasLuggage ? "secondary" : "ghost"} className={`rounded-full ${!hasLuggage ? 'bg-white text-black shadow' : 'bg-gray-200 text-gray-500'}`}>No</Button>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="travelers" className="text-sm font-medium text-gray-700">Number of Travelers</label>
            <Input id="travelers" type="number" placeholder="" className="bg-gray-100 border-none" />
          </div>

          {hasLuggage && (
            <div className="space-y-1">
              <label htmlFor="luggage-weight" className="text-sm font-medium text-gray-700">Luggage Weight (kg)</label>
              <Input id="luggage-weight" type="number" placeholder="" className="bg-gray-100 border-none" />
            </div>
          )}

          {/* Driver Mode */}
          <div className="space-y-2">
             <Select onValueChange={setDriverMode} defaultValue="auto">
                <SelectTrigger className="w-full bg-gray-100 border-none h-14">
                    <SelectValue>
                      <div className="flex items-center gap-3">
                        <Image src="https://placehold.co/40x40.png" data-ai-hint="auto rickshaw" alt="Auto" width={40} height={40} className="rounded-md" />
                        <span>Auto</span>
                      </div>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="auto">
                        <div className="flex items-center gap-3">
                           <Image src="https://placehold.co/40x40.png" data-ai-hint="auto rickshaw" alt="Auto" width={40} height={40} className="rounded-md" />
                           <span>Auto</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="manual">
                        <div className="flex items-center gap-3">
                           <User className="h-10 w-10 text-gray-500 p-2 bg-gray-200 rounded-md" />
                           <span>Select Driver</span>
                        </div>
                    </SelectItem>
                </SelectContent>
             </Select>
          </div>
          
          {/* Map Section */}
          <div className="relative">
            {driverMode === 'manual' && (
                <div className="absolute top-2 left-2 right-2 z-10">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input placeholder="Search by mobile number" className="pl-10 bg-white shadow-md border-none" />
                    </div>
                </div>
            )}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[4/5] w-full bg-gray-200">
                    <Image src="https://placehold.co/600x800.png" layout="fill" objectFit="cover" alt="Map placeholder" data-ai-hint="city map" />
                    <div className="absolute right-4 bottom-4 flex flex-col space-y-2 z-10">
                        <Button size="icon" className="bg-white text-black shadow-md hover:bg-gray-100 rounded-full h-10 w-10"><Plus/></Button>
                        <Button size="icon" className="bg-white text-black shadow-md hover:bg-gray-100 rounded-full h-10 w-10"><Minus/></Button>
                        <Button size="icon" className="bg-white text-black shadow-md hover:bg-gray-100 rounded-full h-10 w-10"><Send/></Button>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
        </main>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <Button className="w-full bg-purple-400 text-white hover:bg-purple-500 py-6 text-lg">
          Start Trip
        </Button>
      </footer>
    </div>
  );
}
