
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLanguage } from '@/context/LanguageContext';
import { ThemeToggle } from '@/components/ThemeToggle';


interface MenuItemProps {
  icon: LucideIcon;
  text: string;
  href?: string;
  onClick?: () => void;
}

const MenuItem = ({ icon: Icon, text, href, onClick }: MenuItemProps) => {
  const content = (
    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-4" />
      <span className="flex-1 text-gray-800 dark:text-gray-100 font-medium">{text}</span>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );

  if (href) {
    return <Link href={href} passHref>{content}</Link>;
  }
  
  return <button onClick={onClick} className="w-full text-left">{content}</button>;
};

export default function MenuPage() {
    const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
    const router = useRouter();
    const { t } = useLanguage();

    const handleLogout = () => {
        setIsLogoutAlertOpen(false);
        router.push('/');
    };

    const menuItems = [
        { icon: User, text: t('edit_profile'), href: '/edit-profile' },
        { icon: Lock, text: t('change_pin'), href: '/change-pin' },
        { icon: Globe, text: t('change_language'), href: '/change-language' },
        { icon: FileText, text: t('rules_and_instructions'), href: '/rules' },
        { icon: HelpCircle, text: t('faq'), href: '/faq' },
        { icon: Shield, text: t('identity_verification'), href: '/identity-verification' },
        { icon: Award, text: t('monetization'), href: '/monetization' },
        { icon: LogOut, text: t('logout'), onClick: () => setIsLogoutAlertOpen(true) },
    ];

    return (
        <>
            <div className="min-h-screen bg-gray-100 dark:bg-black font-sans">
            <header className="sticky top-0 z-10 flex items-center border-b bg-white dark:bg-gray-900 dark:border-gray-800 p-4">
                <Link href="/home">
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                </Button>
                </Link>
                <h1 className="flex-1 text-center text-xl font-bold text-gray-800 dark:text-gray-100">{t('menu_title')}</h1>
                <div className="w-10">
                    <ThemeToggle />
                </div>
            </header>
            <main className="py-2">
                {menuItems.map((item, index) => (
                <MenuItem key={index} icon={item.icon} text={item.text} href={item.href} onClick={item.onClick} />
                ))}
            </main>
            </div>
            <AlertDialog open={isLogoutAlertOpen} onOpenChange={setIsLogoutAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('logout_confirmation_title')}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t('logout_confirmation_description')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                            {t('log_out_action')}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
