
'use client';
import HomeHeader from '@/components/HomeHeader';
import BottomNav from '@/components/BottomNav';
import BalanceCard from '@/components/BalanceCard';
import dynamic from 'next/dynamic';

const FeaturesGrid = dynamic(() => import('@/components/FeaturesGrid'));
const MyRides = dynamic(() => import('@/components/MyRides'));
const SavingsBanner = dynamic(() => import('@/components/SavingsBanner'));
const Suggestions = dynamic(() => import('@/components/Suggestions'));

export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
        <HomeHeader />
        <main className="relative z-0 pt-28 px-4 pb-24">
            <div className="space-y-6">
                <BalanceCard />
                <FeaturesGrid />
                <MyRides />
                <SavingsBanner />
                <Suggestions />
            </div>
        </main>
        <BottomNav />
    </div>
  );
}
