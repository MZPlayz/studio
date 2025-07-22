
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'bn' ? 'en' : 'bn';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 px-4 pt-8 font-sans">
      <div className="absolute top-4 right-4">
        <Button variant="outline" className="rounded-full border-gray-300 bg-white" onClick={toggleLanguage}>
          {isClient ? t('language_toggle') : '...'}
        </Button>
      </div>

      <div className="mt-12 flex w-full max-w-sm flex-col items-center">
        <div className="mb-8 rounded-lg bg-[#F3EFEA] p-6">
          <Image
            src="https://placehold.co/120x80.png"
            data-ai-hint="company logo leaf"
            alt="Company Logo"
            width={120}
            height={80}
            className="h-20 w-32 object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800">{isClient ? t('welcome_back') : '...'}</h1>
        <p className="text-gray-600">{isClient ? t('login_prompt') : '...'}</p>

        <form className="mt-8 w-full space-y-4">
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="tel"
              placeholder={isClient ? t('phone_placeholder') : ''}
              className="w-full rounded-lg border-gray-300 bg-white py-6 pl-10"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="password"
              placeholder={isClient ? t('pin_placeholder') : ''}
              maxLength={6}
              className="w-full rounded-lg border-gray-300 bg-white py-6 pl-10"
            />
          </div>
          <div className="text-right">
            <Link href="#" className="text-sm font-medium text-purple-600 hover:underline">
              {isClient ? t('forgot_pin') : '...'}
            </Link>
          </div>
          
          <Link href="/home" passHref>
            <Button className="w-full h-14 bg-purple-600 text-lg font-bold text-white hover:bg-purple-700">
                {isClient ? t('login_button') : '...'}
            </Button>
          </Link>

        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">{isClient ? t('new_here') : '...'}</p>
          <div className="mt-4 w-full space-y-3">
             <Link href="/register" passHref>
                <Button variant="outline" className="w-full h-12 bg-white border-gray-300 text-purple-700">
                    {isClient ? t('customer_registration') : '...'}
                </Button>
             </Link>
             <Link href="/register" passHref>
                <Button variant="outline" className="w-full h-12 bg-white border-gray-300 text-purple-700">
                    {isClient ? t('driver_registration') : '...'}
                </Button>
             </Link>
              <Link href="/agent-home" passHref>
                <Button variant="outline" className="w-full h-12 bg-white border-gray-300 text-purple-700">
                    {isClient ? t('agent_registration') : '...'}
                </Button>
              </Link>
          </div>
        </div>

        <p className="mt-12 text-sm text-gray-500">ডাক বিভাগের ডিজিটাল লেনদেন</p>
      </div>
    </div>
  );
}
