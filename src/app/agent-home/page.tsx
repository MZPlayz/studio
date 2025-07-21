
import HomeHeader from '@/components/HomeHeader';
import FeaturesGrid from '@/components/FeaturesGrid';
import MyRides from '@/components/MyRides';
import SavingsBanner from '@/components/SavingsBanner';
import Suggestions from '@/components/Suggestions';
import BottomNav from '@/components/BottomNav';
import MapComponent from '@/components/MapComponent';
import { Card, CardContent } from '@/components/ui/card';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function AgentHomePage() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="relative pb-24">
        <HomeHeader />
        <main className="px-4 space-y-4">
          <Card className="overflow-hidden rounded-xl shadow-sm h-64">
            <CardContent className="p-0 h-full">
              <MapComponent />
            </CardContent>
          </Card>
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
