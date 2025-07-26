
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Camera, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfileEditPage() {
  const [name, setName] = useState('Alif Hossain');
  const [phone, setPhone] = useState('01234567890');
  const [address, setAddress] = useState('Mirpur, Dhaka');

  const profileImageRef = useRef<HTMLInputElement>(null);
  const nidImageRef = useRef<HTMLInputElement>(null);
  const carImageRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black font-sans">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white dark:bg-gray-900 dark:border-gray-800 p-4">
        <Link href="/menu">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6 text-gray-800 dark:text-gray-100" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800 dark:text-gray-100">প্রোফাইল এডিট</h1>
        <div className="w-10" />
      </header>

      <main className="p-4 space-y-8 pb-24">
        <section className="flex flex-col items-center space-y-2">
          <div className="relative">
            <Image
              src="https://placehold.co/128x128.png"
              alt="Profile"
              width={128}
              height={128}
              data-ai-hint="woman portrait"
              className="rounded-full border-4 border-white shadow-md"
            />
            <Button
              size="icon"
              className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
              onClick={() => handleImageUpload(profileImageRef)}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input type="file" ref={profileImageRef} className="hidden" accept="image/*" />
          </div>
        </section>

        <form className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 mt-1" />
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Mobile Number</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 mt-1" disabled />
          </div>
          <div>
            <Label htmlFor="address" className="text-gray-700 dark:text-gray-300">Address</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 mt-1" />
          </div>
        </form>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Documents</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-white dark:bg-gray-900 p-4">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">National ID</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your NID photo</p>
              </div>
              <Image src="https://placehold.co/100x60.png" data-ai-hint="id card" alt="NID Thumbnail" width={100} height={60} className="rounded-md" />
              <Button variant="outline" size="sm" onClick={() => handleImageUpload(nidImageRef)} className="dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <Edit className="mr-2 h-4 w-4" /> Update
              </Button>
              <input type="file" ref={nidImageRef} className="hidden" accept="image/*" />
            </div>
            <div className="flex items-center justify-between rounded-lg bg-white dark:bg-gray-900 p-4">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Car Image</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your car's photo</p>
              </div>
              <Image src="https://placehold.co/100x60.png" data-ai-hint="sedan car" alt="Car Thumbnail" width={100} height={60} className="rounded-md" />
              <Button variant="outline" size="sm" onClick={() => handleImageUpload(carImageRef)} className="dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <Edit className="mr-2 h-4 w-4" /> Update
              </Button>
              <input type="file" ref={carImageRef} className="hidden" accept="image/*" />
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t bg-white dark:bg-gray-900 dark:border-gray-800 p-4">
        <Button className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80">Save Changes</Button>
      </footer>
    </div>
  );
}
