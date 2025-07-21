
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [isCustomer, setIsCustomer] = useState(true);

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 px-4 pt-8 font-sans">
      <div className="absolute top-4 right-4">
        <Button variant="outline" className="rounded-full border-gray-300 bg-white">
          বাংলা
        </Button>
      </div>

      <div className="mt-12 flex w-full max-w-sm flex-col items-center">
        <div className="mb-8 rounded-lg bg-[#F3EFEA] p-6">
          <Image
            src="https://placehold.co/120x80.png"
            data-ai-hint="company logo leaf"
            alt="Company Logo"
            width={120}
            height={80}
            className="h-20 w-32 object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800">আবারও স্বাগতম</h1>
        <p className="text-gray-600">লগইন করতে আপনার বিবরণ লিখুন।</p>

        <form className="mt-8 w-full space-y-4">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="tel"
              placeholder="+৮৮০XXXXXXXXXX"
              className="w-full rounded-lg border-gray-300 bg-white py-6 pl-10"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="password"
              placeholder="৬ সংখ্যার পিন"
              maxLength={6}
              className="w-full rounded-lg border-gray-300 bg-white py-6 pl-10"
            />
          </div>
          <div className="text-right">
            <Link href="#" className="text-sm font-medium text-purple-600 hover:underline">
              পিন ভুলে গেছেন?
            </Link>
          </div>
          
          <Link href="/home" passHref>
            <Button className="w-full h-14 bg-purple-600 text-lg font-bold text-white hover:bg-purple-700">
                লগইন করুন
            </Button>
          </Link>

        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">এখানে নতুন? একটি অ্যাকাউন্ট তৈরি করুন</p>
          <div className="mt-4 w-full space-y-3">
             <Link href="/register" passHref>
                <Button variant="outline" className="w-full h-12 bg-white border-gray-300 text-purple-700">
                    গ্রাহক নিবন্ধন
                </Button>
             </Link>
             <Link href="/register" passHref>
                <Button variant="outline" className="w-full h-12 bg-white border-gray-300 text-purple-700">
                    ড্রাইভার নিবন্ধন
                </Button>
             </Link>
              <Link href="/agent-home" passHref>
                <Button variant="outline" className="w-full h-12 bg-white border-gray-300 text-purple-700">
                    এজেন্ট নিবন্ধন
                </Button>
              </Link>
          </div>
        </div>

        <p className="mt-12 text-sm text-gray-500">ডাক বিভাগের ডিজিটাল লেনদেন</p>
      </div>
    </div>
  );
}
