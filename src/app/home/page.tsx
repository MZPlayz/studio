
'use client';
import HomeHeader from '@/components/HomeHeader';
import FeaturesGrid from '@/components/FeaturesGrid';
import MyRides from '@/components/MyRides';
import SavingsBanner from '@/components/SavingsBanner';
import Suggestions from '@/components/Suggestions';
import BottomNav from '@/components/BottomNav';
import BalanceCard from '@/components/BalanceCard';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language } = useLanguage();
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <HomeHeader />
      <main className="relative z-0 pt-24 px-8 pb-24">
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
