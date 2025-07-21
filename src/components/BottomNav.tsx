import { Home, Inbox, Menu } from 'lucide-react';

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-t">
      <div className="flex justify-around items-center h-16">
        <button className="flex flex-col items-center text-purple-600">
          <Home size={24} />
          <span className="text-xs font-medium">হোম</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Inbox size={24} />
          <span className="text-xs">ইনবক্স</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Menu size={24} />
          <span className="text-xs">মেনু</span>
        </button>
      </div>
    </div>
  );
}