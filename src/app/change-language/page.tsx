
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useLanguage } from '@/context/LanguageContext';

export default function ChangeLanguagePage() {
  const { language, setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setSelectedLanguage(language);
  }, [language]);

  const handleSaveChanges = () => {
    setLanguage(selectedLanguage);
    toast({
      title: "Language preference saved!",
      description: `The language has been set to ${selectedLanguage === 'bn' ? 'Bangla' : 'English'}.`,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-black font-sans">
        <header className="sticky top-0 z-10 flex items-center border-b bg-white dark:bg-gray-900 dark:border-gray-800 p-4">
          <Link href="/menu">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6 text-gray-800 dark:text-gray-100" />
            </Button>
          </Link>
          <h1 className="flex-1 text-center text-xl font-bold text-gray-800 dark:text-gray-100">{t('change_language')}</h1>
          <div className="w-10" />
        </header>

        <main className="p-4">
          <Card className="bg-white dark:bg-gray-900 dark:border-gray-800">
            <CardHeader>
                <CardTitle className="text-gray-800 dark:text-gray-100">Select a Language</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isClient && (
                <>
                  <Button
                    onClick={() => setSelectedLanguage('en')}
                    className={cn(
                      "w-full h-16 text-lg justify-between",
                      selectedLanguage === 'en' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
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
                      selectedLanguage === 'bn' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
                    )}
                    variant="outline"
                  >
                    <span>বাংলা</span>
                    {selectedLanguage === 'bn' && <Check className="h-6 w-6" />}
                  </Button>
                </>
              )}
            </CardContent>
            <CardFooter>
                 <Button onClick={handleSaveChanges} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80" disabled={!isClient}>
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
