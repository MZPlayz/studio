
'use client';

import { Home, Inbox, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isAgent = pathname.includes('/agent-home') || pathname.includes('/agent-menu');

  const homeLink = isAgent ? '/agent-home' : '/home';
  const menuLink = isAgent ? '/agent-menu' : '/menu';
  const inboxLink = '/support';

  const navItems = [
    { href: homeLink, label: t('home_nav'), icon: Home },
    { href: inboxLink, label: t('inbox_nav'), icon: Inbox },
    { href: menuLink, label: t('menu_nav'), icon: Menu },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-t-lg">
      <div className="grid grid-cols-3 h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center pt-1 group">
              <item.icon size={24} className={cn('transition-colors', isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary/70')} />
              <span className={cn('text-xs font-medium transition-colors', isActive ? 'text-primary' : 'text-gray-500 group-hover:text-primary/70')}>
                {isClient ? item.label : ''}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
