import { Home, Inbox, Menu } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-t">
      <div className="flex justify-around items-center h-16">
        <Link href="/home" className="flex flex-col items-center text-purple-600">
          <Home size={24} />
          <span className="text-xs font-medium">হোম</span>
        </Link>
        <Button variant="ghost" className="flex flex-col items-center text-gray-500 h-auto">
          <Inbox size={24} />
          <span className="text-xs">ইনবক্স</span>
        </Button>
        <Link href="/menu" className="flex flex-col items-center text-gray-500">
          <Menu size={24} />
          <span className="text-xs">মেনু</span>
        </Link>
      </div>
    </div>
  );
}
