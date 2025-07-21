
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChangePinPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
        <Link href="/menu">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">পিন পরিবর্তন</h1>
        <div className="w-10" />
      </header>

      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Change Your PIN</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div>
                <Label htmlFor="current-pin">Current PIN</Label>
                <Input id="current-pin" type="password" maxLength={5} className="mt-1 bg-white" placeholder="Enter your current 5-digit PIN" />
              </div>
              <div>
                <Label htmlFor="new-pin">New PIN</Label>
                <Input id="new-pin" type="password" maxLength={5} className="mt-1 bg-white" placeholder="Enter a new 5-digit PIN" />
              </div>
              <div>
                <Label htmlFor="confirm-pin">Confirm New PIN</Label>
                <Input id="confirm-pin" type="password" maxLength={5} className="mt-1 bg-white" placeholder="Confirm your new PIN" />
              </div>
              <Button className="w-full h-12" type="submit">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
