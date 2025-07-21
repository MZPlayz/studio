
import HomeHeader from '@/components/HomeHeader';
import FeaturesGrid from '@/components/FeaturesGrid';
import MyRides from '@/components/MyRides';
import SavingsBanner from '@/components/SavingsBanner';
import Suggestions from '@/components/Suggestions';
import BottomNav from '@/components/BottomNav';

export default function AgentHomePage() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="relative pb-24">
        <HomeHeader />
        <main className="px-4 space-y-4">
          <FeaturesGrid userType="agent" />
          <MyRides />
          <SavingsBanner />
          <Suggestions />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
