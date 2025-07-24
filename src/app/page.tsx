
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedGradientText from '@/components/ui/animated-gradient-text';
import { cn } from '@/lib/utils';
import RetroGrid from '@/components/ui/retro-grid';
import HyperText from '@/components/ui/hyper-text';
import { supabase } from '@/lib/supabase-client';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LoginPage() {
  const { t, toggleLanguage } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // This is where the user will be redirected after clicking the magic link
        emailRedirectTo: `${window.location.origin}/home`,
      },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Check your email for the magic link!');
    }
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <Button variant="outline" className="rounded-full border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700" onClick={toggleLanguage}>
          {isClient ? t('language_toggle') : '...'}
        </Button>
        <ThemeToggle />
      </div>
      <RetroGrid className="absolute inset-0 w-full h-full" />
      <AnimatedGradientText className="mb-4">
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          ✨ Real-time Cab Discovery
        </span>
      </AnimatedGradientText>

      <div className="z-10 flex w-full max-w-md flex-col items-center space-y-6 rounded-xl border bg-white/80 p-8 shadow-2xl backdrop-blur-sm dark:border-gray-700 dark:bg-black/80">
        <HyperText className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {isClient ? t('welcome_back') : '...'}
        </HyperText>
        <p className="text-gray-600 dark:text-gray-400">{isClient ? t('login_prompt_email') : '...'}</p>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              placeholder={isClient ? t('email_placeholder') : ''}
              className="w-full rounded-lg border-gray-300 bg-white py-6 pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <Button className="w-full h-14 text-lg font-bold" type="submit" disabled={loading}>
            {loading ? (isClient ? t('sending_link') : '...') : (isClient ? t('send_magic_link') : '...')}
          </Button>
        </form>
        
        {message && <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">{message}</p>}

        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">{isClient ? t('new_here') : '...'} <Link href="/create-account" className="font-medium text-accent hover:underline">{isClient ? t('create_account_link') : '...'}</Link></p>
        </div>

        <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">ডাক বিভাগের ডিজিটাল লেনদেন</p>
      </div>
    </div>
  );
}
