import { PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SavingsBanner() {
  return (
    <div className="bg-purple-600 rounded-lg p-4 flex items-center space-x-4 text-white">
      <div className="flex-shrink-0 text-center">
        <div className="bg-white rounded-lg w-16 h-16 flex items-center justify-center mb-1">
          <PiggyBank className="h-10 w-10 text-purple-600" />
        </div>
        <p className="text-xs font-bold">সেভিংস</p>
      </div>
      <div>
        <p className="font-bold">সেভিংস-এ বাড়বে টাকা</p>
        <p className="text-xs mb-2">রাইড শেয়ারিং অ্যাপ থেকে আইডিএলসি-তে</p>
        <Button variant="secondary" className="border border-white rounded-full px-4 py-1 text-xs h-auto bg-purple-600 hover:bg-purple-500 text-white">
          ট্যাপ করুন
        </Button>
      </div>
    </div>
  );
}
