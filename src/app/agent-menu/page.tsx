
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
import { ThemeToggle } from '@/components/ThemeToggle';


interface MenuItemProps {
  icon: LucideIcon;
  text: string;
  href?: string;
  onClick?: () => void;
}

const MenuItem = ({ icon: Icon, text, href, onClick }: MenuItemProps) => {
  const content = (
    <div className="flex items-center p-4 border-b border-gray-200 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
      <Icon className="h-6 w-6 text-gray-600 mr-4" />
      <span className="flex-1 text-gray-800 font-medium">{text}</span>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );

  if (href) {
    return <Link href={href} passHref>{content}</Link>;
  }
  
  return <button onClick={onClick} className="w-full text-left">{content}</button>;
};

export default function AgentMenuPage() {
    const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        // In a real app, you would clear session/token here
        setIsLogoutAlertOpen(false);
        router.push('/'); // Redirect to login page
    };

    const menuItems = [
        { icon: User, text: 'প্রোফাইল এডিট', href: '/edit-profile' },
        { icon: Lock, text: 'পিন পরিবর্তন', href: '/change-pin' },
        { icon: Globe, text: 'ভাষা পরিবর্তন', href: '/change-language' },
        { icon: FileText, text: 'রুলস', href: '/rules' },
        { icon: HelpCircle, text: 'FAQ', href: '/faq' },
        { icon: Shield, text: 'আইডেন্টি ভেরিফিকেশন', href: '/identity-verification' },
        { icon: LogOut, text: 'লগ আউট', onClick: () => setIsLogoutAlertOpen(true) },
    ];

    return (
        <>
            <div className="min-h-screen bg-gray-100 font-sans">
            <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
                <Link href="/agent-home">
                <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                </Link>
                <h1 className="flex-1 text-center text-xl font-bold text-gray-800">মেনু</h1>
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
                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will be returned to the login screen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                            Log Out
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
