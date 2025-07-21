
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useLanguage } from '@/context/LanguageContext';

export default function ChangeLanguagePage() {
  const { language, setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    setLanguage(selectedLanguage);
    toast({
      title: "Language preference saved!",
      description: `The language has been set to ${selectedLanguage === 'bn' ? 'Bangla' : 'English'}.`,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans">
        <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
          <Link href="/menu">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="flex-1 text-center text-xl font-bold text-gray-800">{language === 'bn' ? 'ভাষা পরিবর্তন' : 'Change Language'}</h1>
          <div className="w-10" />
        </header>

        <main className="p-4">
          <Card>
            <CardHeader>
                <CardTitle>Select a Language</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            <CardFooter>
                 <Button onClick={handleSaveChanges} className="w-full h-12">
                    Save Changes
                </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
      <Toaster />
    </>
  );
}
