
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export default function ChangeLanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('bn');

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
        <Link href="/menu">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">ভাষা পরিবর্তন</h1>
        <div className="w-10" />
      </header>

      <main className="p-4">
        <Card>
            <CardContent className="p-6 space-y-4">
                 <Button
                    onClick={() => setSelectedLanguage('en')}
                    className={cn(
                        "w-full h-16 text-lg justify-between",
                        selectedLanguage === 'en' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 text-gray-800'
                    )}
                    variant="outline"
                >
                    <span>English</span>
                    {selectedLanguage === 'en' && <Check className="h-6 w-6" />}
                </Button>
                 <Button
                    onClick={() => setSelectedLanguage('bn')}
                    className={cn(
                        "w-full h-16 text-lg justify-between",
                        selectedLanguage === 'bn' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 text-gray-800'
                    )}
                     variant="outline"
                >
                    <span>বাংলা</span>
                    {selectedLanguage === 'bn' && <Check className="h-6 w-6" />}
                </Button>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
