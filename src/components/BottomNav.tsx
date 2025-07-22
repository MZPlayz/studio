
'use client';

import { Home, Inbox, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

export default function BottomNav() {
  const pathname = usePathname();
  const isAgent = pathname.includes('/agent-home') || pathname.includes('/agent-menu');

  const homeLink = isAgent ? '/agent-home' : '/home';
  const menuLink = isAgent ? '/agent-menu' : '/menu';
  const inboxLink = '/support';

  const isHomeActive = pathname === homeLink;
  const isMenuActive = pathname === menuLink;
  const isInboxActive = pathname === inboxLink;


  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 shadow-lg">
      <div className="grid grid-cols-3 items-center h-16 max-w-md mx-auto">
        <Link href={homeLink} className={`flex flex-col items-center justify-center`}>
            <div className={`p-2 rounded-full transition-colors ${isHomeActive ? 'bg-purple-500' : 'bg-transparent'}`}>
              <Home size={24} className={`${isHomeActive ? 'text-white' : 'text-gray-400'}`} />
            </div>
            <span className={`text-xs font-medium ${isHomeActive ? 'text-purple-500' : 'text-gray-400'}`}>হোম</span>
        </Link>
        <Link href={inboxLink} className={`flex flex-col items-center justify-center`}>
            <div className={`p-2 rounded-full transition-colors ${isInboxActive ? 'bg-purple-500' : 'bg-transparent'}`}>
                <Inbox size={24} className={`${isInboxActive ? 'text-white' : 'text-gray-400'}`} />
            </div>
          <span className={`text-xs font-medium ${isInboxActive ? 'text-purple-500' : 'text-gray-400'}`}>ইনবক্স</span>
        </Link>
        <Link href={menuLink} className={`flex flex-col items-center justify-center`}>
            <div className={`p-2 rounded-full transition-colors ${isMenuActive ? 'bg-purple-500' : 'bg-transparent'}`}>
              <Menu size={24} className={`${isMenuActive ? 'text-white' : 'text-gray-400'}`} />
            </div>
          <span className={`text-xs font-medium ${isMenuActive ? 'text-purple-500' : 'text-gray-400'}`}>মেনু</span>
        </Link>
      </div>
    </div>
  );
}
