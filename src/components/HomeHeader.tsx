"use client";

import { Bell } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';

export default function HomeHeader() {
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <header className="bg-primary px-4 py-5 fixed top-0 left-0 right-0 z-10 rounded-b-3xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Avatar className="h-14 w-14 border-2 border-white">
            <AvatarImage src={user?.user_metadata?.avatar_url || "https://placehold.co/64x64.png"} alt="Profile Picture" data-ai-hint="user profile picture" />
            <AvatarFallback>{user?.user_metadata?.full_name ? user.user_metadata.full_name.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-lg text-white">{isClient && user ? user.user_metadata?.full_name || 'User Name' : '...'}</p>
            <p className="text-sm text-purple-200">{isClient && user ? user.phone || '01234567890' : '...'}</p>
          </div>
        </div>
        <button className="text-white">
          <Bell size={28} />
        </button>
      </div>
    </header>
  );
}
