
'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Lock,
  Globe,
  FileText,
  HelpCircle,
  Shield,
  Award,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  text: string;
  href: string;
}

const MenuItem = ({ icon: Icon, text, href }: MenuItemProps) => (
  <Link href={href} passHref>
    <div className="flex items-center p-4 border-b border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
      <Icon className="h-6 w-6 text-gray-600 mr-4" />
      <span className="flex-1 text-gray-800 font-medium">{text}</span>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  </Link>
);

export default function MenuPage() {
  const menuItems = [
    { icon: User, text: 'প্রোফাইল এডিট', href: '/edit-profile' },
    { icon: Lock, text: 'পিন পরিবর্তন', href: '#' },
    { icon: Globe, text: 'ভাষা পরিবর্তন', href: '#' },
    { icon: FileText, text: 'রুলস ও নির্দেশনা', href: '#' },
    { icon: HelpCircle, text: 'FAQ সাধারণ প্রশ্নের উত্তর', href: '#' },
    { icon: Shield, text: 'আইডেন্টি ভেরিফিকেশন', href: '/identity-verification' },
    { icon: Award, text: 'মনিটাইজেশন', href: '/monetization' },
    { icon: LogOut, text: 'লগ আউট', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">মেনু</h1>
        <div className="w-10" />
      </header>
      <main className="py-2">
        {menuItems.map((item, index) => (
          <MenuItem key={index} icon={item.icon} text={item.text} href={item.href} />
        ))}
      </main>
    </div>
  );
}
