
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Copy, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ReferredFriend {
  id: number;
  name: string;
  type: 'User' | 'Driver' | 'Agent';
  avatarUrl: string;
  avatarHint: string;
}

const mockReferredFriends: ReferredFriend[] = [
  {
    id: 1,
    name: 'Ethan Hayes',
    type: 'User',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'man portrait',
  },
  {
    id: 2,
    name: 'Olivia Brooks',
    type: 'Driver',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'woman portrait',
  },
  {
    id: 3,
    name: 'Owen Reed',
    type: 'Agent',
    avatarUrl: 'https://placehold.co/48x48.png',
    avatarHint: 'man portrait',
  },
];

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="flex-1 rounded-xl bg-gray-100 p-4">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const ReferredFriendListItem = ({ friend }: { friend: ReferredFriend }) => (
  <div className="flex items-center space-x-4 p-2">
    <Image
      src={friend.avatarUrl}
      alt={friend.name}
      width={48}
      height={48}
      data-ai-hint={friend.avatarHint}
      className="rounded-full"
    />
    <div>
      <p className="font-semibold text-gray-800">{friend.name}</p>
      <p className="text-sm text-gray-500">{friend.type}</p>
    </div>
  </div>
);

export default function ReferralsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const referralLink = 'ridego.app/ref/789456';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      // You can add a toast notification here to confirm copy
      alert('Link copied to clipboard!');
    });
  };

  const filteredFriends = mockReferredFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">All Referrals</h1>
        <div className="w-10" />
      </header>

      <main className="p-4">
        <div className="flex flex-col items-center space-y-2 pt-4 pb-8">
          <Image
            src="https://placehold.co/96x96.png"
            alt="Sophia Carter"
            width={96}
            height={96}
            data-ai-hint="woman portrait"
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold">Sophia Carter</h2>
          <p className="text-gray-500">Referral code: 789456</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Share your referral link</label>
            <div className="relative mt-1">
              <Input
                readOnly
                value={referralLink}
                className="w-full rounded-lg border-gray-300 bg-gray-100 pr-10 text-gray-700"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-gray-500"
                onClick={handleCopy}
              >
                <Copy className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200">Share Link</Button>
            <Button className="flex-1 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200">Invite Friends</Button>
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          <StatCard label="Referrals" value="12" />
          <StatCard label="Earnings" value="$120" />
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-800">Referred friends</h3>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search referred friends"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border-gray-300 bg-gray-100 py-3 pl-10 text-gray-700 placeholder-gray-500"
            />
          </div>

          <div className="mt-4 space-y-2">
            {filteredFriends.map((friend) => (
              <ReferredFriendListItem key={friend.id} friend={friend} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
