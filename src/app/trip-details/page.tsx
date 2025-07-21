
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, MapPin, Calendar, Clock, User, Search, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import TripMap from '@/components/TripMap';

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

export default function TripDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State Management
  const [vehicleType, setVehicleType] = useState('road');
  const [vehicleClass, setVehicleClass] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{ address: string; coords: { lng: number; lat: number } | null }>({ address: '', coords: null });
  const [destination, setDestination] = useState<{ address: string; coords: { lng: number; lat: number } | null }>({ address: '', coords: null });
  const [travelDate, setTravelDate] = useState<Date | null>(new Date());
  const [travelTime, setTravelTime] = useState('');
  const [dayOrNight, setDayOrNight] = useState('day');
  const [hasLuggage, setHasLuggage] = useState(false);
  const [luggageWeight, setLuggageWeight] = useState('');
  const [numTravelers, setNumTravelers] = useState('1');
  const [driverMode, setDriverMode] = useState('auto');
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  // For Mapbox Autocomplete
  const [destinationSuggestions, setDestinationSuggestions] = useState<any[]>([]);

  useEffect(() => {
    // Set initial coordinates for map demonstration
    setCurrentLocation({ address: 'Dhaka', coords: { lng: 90.4125, lat: 23.8103 } });
    
    const driverParam = searchParams.get('driver');
    if (driverParam) {
      try {
        const driverData = JSON.parse(decodeURIComponent(driverParam));
        setSelectedDriver(driverData);
        setDriverMode('manual');
      } catch (error) {
        console.error("Failed to parse driver data:", error);
      }
    }
  }, [searchParams]);
  
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { longitude, latitude } = position.coords;
          const coords = { lng: longitude, lat: latitude };
          
          // Reverse Geocoding
          const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
          const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}&country=BD&language=en`;
          
          try {
            const response = await fetch(url);
            const data = await response.json();
            const address = data.features[0]?.place_name || `${latitude}, ${longitude}`;
            setCurrentLocation({ address, coords });
          } catch (error) {
            console.error("Error fetching address:", error);
            setCurrentLocation({ address: 'Unable to fetch address', coords });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not retrieve your location. Please enable location services.");
        }
      );
    }
  };

  const handleDestinationSearch = async (query: string) => {
    setDestination({ ...destination, address: query });
    if (query.length > 2) {
      const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
      const dhakaCoords = '90.4125,23.8103';
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${accessToken}&country=BD&proximity=${dhakaCoords}&language=en&autocomplete=true`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setDestinationSuggestions(data.features || []);
      } catch (error) {
        console.error("Error fetching destination suggestions:", error);
      }
    } else {
      setDestinationSuggestions([]);
    }
  };

  const selectDestination = (suggestion: any) => {
    const coords = {
      lng: suggestion.center[0],
      lat: suggestion.center[1]
    };
    setDestination({ address: suggestion.place_name, coords });
    setDestinationSuggestions([]);
  };
  
  const handleStartTrip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const tripData = {
        vehicleType,
        vehicleClass,
        name,
        phone,
        currentLocation,
        destination,
        travelDate,
        travelTime,
        dayOrNight,
        hasLuggage,
        luggageWeight,
        numTravelers,
        driverMode,
        selectedDriver
    };
    console.log("Trip Details:", tripData);
  };
  
  const isFormValid = !!destination.coords && !!currentLocation.coords;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="flex flex-col pb-24">
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Trip Details</h1>
          <div className="w-10"></div>
        </header>

        <main className="flex-1 space-y-4 p-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Select Vehicle Type</label>
            <Select onValueChange={setVehicleType} value={vehicleType}>
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
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Select Vehicle Class</label>
            <Select onValueChange={setVehicleClass} value={vehicleClass}>
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

          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <Input id="name" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-100 border-none" />
          </div>
          <div className="space-y-1">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
            <Input id="phone" type="tel" placeholder="Enter your phone number" value={phone} onChange={e => setPhone(e.target.value)} className="bg-gray-100 border-none" />
          </div>
          <div className="space-y-1">
            <label htmlFor="current-location" className="text-sm font-medium text-gray-700">Current Location</label>
            <div className="relative">
              <Input id="current-location" placeholder="Current location" value={currentLocation.address} onChange={e => setCurrentLocation({...currentLocation, address: e.target.value})} className="bg-gray-100 border-none pr-10" />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleGetCurrentLocation}>
                <MapPin className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
          <div className="space-y-1 relative">
            <label htmlFor="destination" className="text-sm font-medium text-gray-700">Destination</label>
            <Input id="destination" placeholder="Where to?" value={destination.address} onChange={e => handleDestinationSearch(e.target.value)} className="bg-gray-100 border-none" autoComplete="off"/>
            {destinationSuggestions.length > 0 && (
                <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-48 overflow-y-auto">
                    {destinationSuggestions.map(s => (
                        <li key={s.id} onClick={() => selectDestination(s)} className="p-2 hover:bg-gray-100 cursor-pointer text-sm">
                            {s.place_name}
                        </li>
                    ))}
                </ul>
            )}
          </div>
          <div className="space-y-1">
            <label htmlFor="travel-date" className="text-sm font-medium text-gray-700">Travel Date</label>
            <div className="relative">
              <Input id="travel-date" type="date" value={travelDate ? travelDate.toISOString().split('T')[0] : ''} onChange={e => setTravelDate(new Date(e.target.value))} placeholder="Select date" className="bg-gray-100 border-none pr-10" />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <Calendar className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="travel-time" className="text-sm font-medium text-gray-700">Travel Time</label>
            <div className="relative">
              <Input id="travel-time" type="time" value={travelTime} onChange={e => setTravelTime(e.target.value)} placeholder="Select time" className="bg-gray-100 border-none pr-10" />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <Clock className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
          
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
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Luggage:</span>
            <Button onClick={() => setHasLuggage(true)} variant={hasLuggage ? "secondary" : "ghost"} className={`rounded-full ${hasLuggage ? 'bg-white text-black shadow' : 'bg-gray-200 text-gray-500'}`}>Yes</Button>
            <Button onClick={() => setHasLuggage(false)} variant={!hasLuggage ? "secondary" : "ghost"} className={`rounded-full ${!hasLuggage ? 'bg-white text-black shadow' : 'bg-gray-200 text-gray-500'}`}>No</Button>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="travelers" className="text-sm font-medium text-gray-700">Number of Travelers</label>
            <Input id="travelers" type="number" min="1" value={numTravelers} onChange={e => setNumTravelers(e.target.value)} placeholder="1" className="bg-gray-100 border-none" />
          </div>

          {hasLuggage && (
            <div className="space-y-1 animate-in fade-in-0 zoom-in-95">
              <label htmlFor="luggage-weight" className="text-sm font-medium text-gray-700">Luggage Weight (kg)</label>
              <Input id="luggage-weight" type="number" value={luggageWeight} onChange={e => setLuggageWeight(e.target.value)} placeholder="e.g. 15" className="bg-gray-100 border-none" />
            </div>
          )}

          <div className="space-y-2">
             <Select onValueChange={setDriverMode} value={driverMode}>
                <SelectTrigger className="w-full bg-gray-100 border-none h-14">
                    <SelectValue>
                      {driverMode === 'manual' && selectedDriver ? (
                         <div className="flex items-center gap-3">
                           <Image src={selectedDriver.avatar} data-ai-hint={selectedDriver.hint} alt={selectedDriver.name} width={40} height={40} className="rounded-full" />
                           <div>
                              <div className="flex items-center">
                                <span className="font-semibold">{selectedDriver.name}</span>
                                <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                              </div>
                              <span className="text-xs text-gray-500">{selectedDriver.car}</span>
                           </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Image src="https://placehold.co/40x40.png" data-ai-hint="auto rickshaw" alt="Auto" width={40} height={40} className="rounded-md" />
                          <span>Auto</span>
                        </div>
                      )}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="auto">
                        <div className="flex items-center gap-3">
                           <Image src="https://placehold.co/40x40.png" data-ai-hint="auto rickshaw" alt="Auto" width={40} height={40} className="rounded-md" />
                           <span>Auto</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="manual" disabled={!selectedDriver}>
                        <div className="flex items-center gap-3">
                           {selectedDriver ? (
                              <>
                                <Image src={selectedDriver.avatar} data-ai-hint={selectedDriver.hint} alt={selectedDriver.name} width={40} height={40} className="rounded-full" />
                                <div>
                                    <div className="flex items-center">
                                      <span className="font-semibold">{selectedDriver.name}</span>
                                      <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                                    </div>
                                    <span className="text-xs text-gray-500">{selectedDriver.car}</span>
                                </div>
                              </>
                           ) : (
                              <>
                                <User className="h-10 w-10 text-gray-500 p-2 bg-gray-200 rounded-md" />
                                <span>Select Driver</span>
                              </>
                           )}
                        </div>
                    </SelectItem>
                </SelectContent>
             </Select>
          </div>
          
          <div className="relative">
            {driverMode === 'manual' && (
                <div className="absolute top-2 left-2 right-2 z-10">
                  <Link href="/find-driver" className="w-full">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input placeholder="Search by mobile number" className="pl-10 bg-white shadow-md border-none" />
                    </div>
                  </Link>
                </div>
            )}
            <Card className="overflow-hidden rounded-xl">
              <CardContent className="p-0">
                <div className="relative aspect-[4/5] w-full bg-gray-200">
                  <TripMap pickupCoords={currentLocation.coords} dropoffCoords={destination.coords} />
                </div>
              </CardContent>
            </Card>
          </div>
          
        </main>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <Button 
          className="w-full bg-purple-400 text-white hover:bg-purple-500 py-6 text-lg disabled:bg-gray-300"
          disabled={!isFormValid}
          onClick={handleStartTrip}
        >
          Start Trip
        </Button>
      </footer>
    </div>
  );
}
