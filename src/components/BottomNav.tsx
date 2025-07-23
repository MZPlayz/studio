
'use client';

import { Home, Inbox, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { useLanguage } from '@/context/LanguageContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const isAgent = pathname.includes('/agent-home') || pathname.includes('/agent-menu');

  const homeLink = isAgent ? '/agent-home' : '/home';
  const menuLink = isAgent ? '/agent-menu' : '/menu';
  const inboxLink = '/support';

  const isHomeActive = pathname === homeLink;
  const isMenuActive = pathname === menuLink;
  const isInboxActive = pathname === inboxLink;


  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-3 items-center h-16 max-w-md mx-auto">
        <Link href={homeLink} className={`flex flex-col items-center justify-center`}>
            <Home size={24} className={`${isHomeActive ? 'text-primary' : 'text-gray-400'}`} />
            <span className={`text-xs font-medium ${isHomeActive ? 'text-primary' : 'text-gray-400'}`}>{t('home_nav')}</span>
        </Link>
        <Link href={inboxLink} className={`flex flex-col items-center justify-center`}>
            <Inbox size={24} className={`${isInboxActive ? 'text-primary' : 'text-gray-400'}`} />
          <span className={`text-xs font-medium ${isInboxActive ? 'text-primary' : 'text-gray-400'}`}>{t('inbox_nav')}</span>
        </Link>
        <Link href={menuLink} className={`flex flex-col items-center justify-center`}>
              <Menu size={24} className={`${isMenuActive ? 'text-primary' : 'text-gray-400'}`} />
          <span className={`text-xs font-medium ${isMenuActive ? 'text-primary' : 'text-gray-400'}`}>{t('menu_nav')}</span>
        </Link>
      </div>
    </div>
  );
}
