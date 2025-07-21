"use client";

import { Lock, Smartphone, Leaf } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 p-6 pt-8 font-sans">
      <header className="flex justify-end">
        <button className="rounded-full border border-gray-300 px-4 py-1 text-sm text-gray-600">
          বাংলা
        </button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-md bg-[#F5F0DC]">
              <div className="text-center text-gray-600">
                <Leaf className="mx-auto h-10 w-10" />
                <p className="mt-2 text-xs font-semibold tracking-widest">COMMHMRANY</p>
                <p className="text-[8px] tracking-widest">YOUR SLOGAN HERE</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">আবারও স্বাগতম</h1>
            <p className="mt-2 text-gray-500">লগইন করতে আপনার বিবরণ লিখুন।</p>
          </div>

          <form className="mt-8 space-y-4">
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="+৮৮০XXXXXXXXXX"
                className="w-full rounded-md border border-gray-300 bg-white p-3 pl-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="৬ সংখ্যার পিন"
                maxLength={6}
                className="w-full rounded-md border border-gray-300 bg-white p-3 pl-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="text-right">
                <a href="#" className="text-sm text-purple-600 hover:underline">পিন ভুলে গেছেন?</a>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#8A2BE2] py-3 font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              লগইন করুন
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">এখানে নতুন? একটি অ্যাকাউন্ট তৈরি করুন</p>
            <div className="mt-4 space-y-3">
              <Link href="/register" className="block w-full rounded-md border border-purple-600 py-3 font-semibold text-purple-600 transition-colors hover:bg-purple-50">
                গ্রাহক নিবন্ধন
              </Link>
              <button className="w-full rounded-md border border-purple-600 py-3 font-semibold text-purple-600 transition-colors hover:bg-purple-50">
                ড্রাইভার নিবন্ধন
              </button>
              <button className="w-full rounded-md border border-purple-600 py-3 font-semibold text-purple-600 transition-colors hover:bg-purple-50">
                এজেন্ট নিবন্ধন
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        <p>ডাক বিভাগের ডিজিটাল লেনদেন</p>
      </footer>
    </div>
  );
}
