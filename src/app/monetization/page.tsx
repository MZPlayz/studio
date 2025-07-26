
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ApplicationForm = ({ onApply }: { onApply: () => void }) => {
  const [socials, setSocials] = useState({
    tiktok: false,
    facebook: false,
    youtube: false,
  });

  const handleCheckboxChange = (social: keyof typeof socials) => {
    setSocials(prev => ({ ...prev, [social]: !prev[social] }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onApply();
  }

  return (
    <div className="animate-in fade-in-50 duration-500">
        <div className="p-4 mb-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h2 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">Monetization Requirements</h2>
            <p className="text-sm text-blue-700 dark:text-blue-300">
                To qualify for monetization, you must be an active content creator on platforms like TikTok, Facebook, or YouTube.
                You are required to have a minimum of 10,000 followers on at least one platform and a significant portion of your content
                should be related to our services or the ridesharing industry. Applications are reviewed manually.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your mobile number" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
            </div>
            
            <div className="space-y-4 rounded-md border dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
                <Label className="font-bold text-gray-800 dark:text-gray-100">Social Media Profiles</Label>
                <div className="flex items-center space-x-2">
                    <Checkbox id="tiktok" onCheckedChange={() => handleCheckboxChange('tiktok')} className="dark:border-gray-700" />
                    <Label htmlFor="tiktok" className="text-gray-700 dark:text-gray-300">TikTok</Label>
                </div>
                {socials.tiktok && (
                    <Input placeholder="https://tiktok.com/@username" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 animate-in fade-in-0 zoom-in-95" />
                )}
                <div className="flex items-center space-x-2">
                    <Checkbox id="facebook" onCheckedChange={() => handleCheckboxChange('facebook')} className="dark:border-gray-700" />
                    <Label htmlFor="facebook" className="text-gray-700 dark:text-gray-300">Facebook</Label>
                </div>
                 {socials.facebook && (
                    <Input placeholder="https://facebook.com/profile" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 animate-in fade-in-0 zoom-in-95" />
                )}
                <div className="flex items-center space-x-2">
                    <Checkbox id="youtube" onCheckedChange={() => handleCheckboxChange('youtube')} className="dark:border-gray-700" />
                    <Label htmlFor="youtube" className="text-gray-700 dark:text-gray-300">YouTube</Label>
                </div>
                 {socials.youtube && (
                    <Input placeholder="https://youtube.com/c/channel" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 animate-in fade-in-0 zoom-in-95" />
                )}
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="percentage" className="text-gray-700 dark:text-gray-300">Percentage of videos about our service (%)</Label>
                <Input id="percentage" type="number" min="0" max="100" placeholder="e.g., 25" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="notes" className="text-gray-700 dark:text-gray-300">Additional Notes</Label>
                <Textarea id="notes" placeholder="Tell us more about your content and audience" className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
            </div>
            
            <Button type="submit" className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80">
                Submit Application
            </Button>
        </form>
    </div>
  );
};


const StatusDisplay = ({ status, onReset }: { status: 'pending' | 'approved', onReset: () => void }) => {
    const isApproved = status === 'approved';
    const Icon = isApproved ? CheckCircle : Clock;
    const title = isApproved ? "Congratulations! Monetization is Active" : "Application Under Review";
    const description = isApproved 
        ? "You can now start earning with RideGo. Your earnings will be reflected in your wallet."
        : "Your application has been received and is currently being reviewed by our team. This process usually takes 5-7 business days.";
    const variant = isApproved ? "default" : "default";

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-in fade-in-50 duration-500">
            <Alert variant={variant} className={`bg-${isApproved ? 'green' : 'yellow'}-50 dark:bg-${isApproved ? 'green' : 'yellow'}-950 border-${isApproved ? 'green' : 'yellow'}-200 dark:border-${isApproved ? 'green' : 'yellow'}-800`}>
                 <Icon className={`h-5 w-5 text-${isApproved ? 'green' : 'yellow'}-700 dark:text-${isApproved ? 'green' : 'yellow'}-300`} />
                <AlertTitle className={`text-lg font-bold text-${isApproved ? 'green' : 'yellow'}-800 dark:text-${isApproved ? 'green' : 'yellow'}-200`}>{title}</AlertTitle>
                <AlertDescription className={`text-${isApproved ? 'green' : 'yellow'}-700 dark:text-${isApproved ? 'green' : 'yellow'}-300`}>
                    {description}
                </AlertDescription>
            </Alert>
            <Button onClick={onReset} variant="link" className="mt-8 dark:text-primary-foreground">
                Submit a new application
            </Button>
        </div>
    );
};


export default function MonetizationPage() {
  const [status, setStatus] = useState<'none' | 'pending' | 'approved'>('none');
  
  const handleApply = () => {
      setStatus('pending');
  }

  const renderContent = () => {
    switch (status) {
      case 'pending':
        return <StatusDisplay status="pending" onReset={() => setStatus('none')} />;
      case 'approved':
        return <StatusDisplay status="approved" onReset={() => setStatus('none')} />;
      case 'none':
      default:
        return <ApplicationForm onApply={handleApply}/>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black font-sans">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white dark:bg-gray-900 dark:border-gray-800 p-4">
        <Link href="/menu">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6 text-gray-800 dark:text-gray-100" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800 dark:text-gray-100">মনিটাইজেশন</h1>
        <div className="w-10" />
      </header>

      <main className="p-4">
        {renderContent()}
      </main>
    </div>
  );
}
