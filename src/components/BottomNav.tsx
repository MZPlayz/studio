
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
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 shadow-lg">
      <div className="grid grid-cols-3 items-center h-16 max-w-md mx-auto">
        <Link href={homeLink} className={`flex flex-col items-center ${isHomeActive ? 'text-purple-500' : 'text-gray-400'}`}>
          <Home size={24} />
          <span className="text-xs font-medium">হোম</span>
        </Link>
        <Link href="#" className="flex flex-col items-center text-gray-400">
          <Inbox size={24} />
          <span className="text-xs font-medium">ইনবক্স</span>
        </Link>
        <Link href={menuLink} className={`flex flex-col items-center ${isMenuActive ? 'text-purple-500' : 'text-gray-400'}`}>
          <Menu size={24} />
          <span className="text-xs font-medium">মেনু</span>
        </Link>
      </div>
    </div>
  );
}
