
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function ChangePinPage() {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPin || !newPin || !confirmPin) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    if (newPin.length !== 5) {
        toast({
            variant: "destructive",
            title: "Invalid PIN",
            description: "New PIN must be 5 digits.",
        });
        return;
    }

    if (newPin !== confirmPin) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New PINs do not match.",
      });
      return;
    }

    // In a real app, you would have an API call here to verify the current PIN
    // and update it on the server.
    toast({
      title: "Success!",
      description: "Your PIN has been changed successfully.",
    });

    // Reset fields after successful submission
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
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
          <h1 className="flex-1 text-center text-xl font-bold text-gray-800 dark:text-gray-100">পিন পরিবর্তন</h1>
          <div className="w-10" />
        </header>

        <main className="p-4">
          <Card className="bg-white dark:bg-gray-900 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-100">Change Your PIN</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="current-pin" className="text-gray-700 dark:text-gray-300">Current PIN</Label>
                  <Input 
                    id="current-pin" 
                    type="password" 
                    maxLength={5} 
                    className="mt-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" 
                    placeholder="Enter your current 5-digit PIN" 
                    value={currentPin}
                    onChange={(e) => setCurrentPin(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="new-pin" className="text-gray-700 dark:text-gray-300">New PIN</Label>
                  <Input 
                    id="new-pin" 
                    type="password" 
                    maxLength={5} 
                    className="mt-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" 
                    placeholder="Enter a new 5-digit PIN" 
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-pin" className="text-gray-700 dark:text-gray-300">Confirm New PIN</Label>
                  <Input 
                    id="confirm-pin" 
                    type="password" 
                    maxLength={5} 
                    className="mt-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" 
                    placeholder="Confirm your new PIN"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                  />
                </div>
                <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80" type="submit">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
      <Toaster />
    </>
  );
}
