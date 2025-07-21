
'use client';

import Link from 'next/link';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const VideoPlaceholder = ({ title }: { title: string }) => (
    <div className="relative aspect-video w-full rounded-lg bg-gray-200 overflow-hidden group">
        <Image src="https://placehold.co/1600x900.png" data-ai-hint="tutorial video" alt={title} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300"/>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
    </div>
);


export default function TrainingGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
        <Link href="/agent-home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">ট্রেনিং/গাইড</h1>
        <div className="w-10" />
      </header>

      <main className="p-4 space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>ভূমিকা (Introduction)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-gray-700">
                    আমাদের এজেন্ট প্রোগ্রামে আপনাকে স্বাগতম! এই গাইডটি আপনাকে অ্যাপের সমস্ত বৈশিষ্ট্য সফলভাবে ব্যবহার করতে এবং আপনার আয় সর্বাধিক করতে সহায়তা করার জন্য ডিজাইন করা হয়েছে।
                </p>
                <VideoPlaceholder title="এজেন্ট প্রোগ্রাম পরিচিতি" />
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>কিভাবে নতুন অ্যাকাউন্ট তৈরি করবেন</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-gray-700">
                    'অ্যাকাউন্ট তৈরি' বৈশিষ্ট্যটি ব্যবহার করে আপনি সহজেই নতুন গ্রাহক, ড্রাইভার এবং অন্যান্য এজেন্টদের আমাদের প্ল্যাটফর্মে যোগ করতে পারেন। নিচের ভিডিওটি ধাপে ধাপে প্রক্রিয়াটি দেখায়।
                </p>
                <VideoPlaceholder title="নতুন ব্যবহারকারী যুক্ত করার প্রক্রিয়া" />
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>ইনকাম এবং কমিশন</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-gray-700">
                    আপনার আয় ট্র্যাক করা খুবই গুরুত্বপূর্ণ। 'ইনকাম হিস্ট্রি' পৃষ্ঠাটি আপনাকে বুকিং কমিশন, রেফারেল বোনাস এবং অ্যাকাউন্ট তৈরি ফি থেকে আপনার সমস্ত আয় বিস্তারিতভাবে দেখায়।
                </p>
                <VideoPlaceholder title="আপনার আয় কিভাবে ট্র্যাক করবেন" />
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
