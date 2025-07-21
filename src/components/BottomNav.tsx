
'use client';

import { Home, Inbox, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

export default function BottomNav() {
  const pathname = usePathname();
  const isAgent = pathname.includes('/agent-home');

  const homeLink = isAgent ? '/agent-home' : '/home';
  const menuLink = isAgent ? '/agent-menu' : '/menu';
  const isHomeActive = pathname === homeLink;
  const isMenuActive = pathname === menuLink;


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-t">
      <div className="flex justify-around items-center h-16">
        <Link href={homeLink} className={`flex flex-col items-center ${isHomeActive ? 'text-purple-600' : 'text-gray-500'}`}>
          <Home size={24} />
          <span className="text-xs font-medium">হোম</span>
        </Link>
        <Button variant="ghost" className="flex flex-col items-center text-gray-500 h-auto">
          <Inbox size={24} />
          <span className="text-xs">ইনবক্স</span>
        </Button>
        <Link href={menuLink} className={`flex flex-col items-center ${isMenuActive ? 'text-purple-600' : 'text-gray-500'}`}>
          <Menu size={24} />
          <span className="text-xs">মেনু</span>
        </Link>
      </div>
    </div>
  );
}
