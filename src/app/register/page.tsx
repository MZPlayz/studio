
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegistrationForm from '@/components/RegistrationForm';
import ProfileImageUpload from '@/components/ProfileImageUpload';
import { Card } from '@/components/ui/card';

export default function CustomerRegistrationPage() {
  const [step, setStep] = useState('form');
  const router = useRouter();

  const handleFormSuccess = () => {
    setStep('photo');
  };
  
  const handleBack = () => {
    if (step === 'photo') {
      setStep('form');
    } else {
      router.back();
    }
  };

  const handlePhotoNext = () => {
    router.push('/home');
  };

  const handlePhotoSkip = () => {
    router.push('/home');
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 p-4">
        {step === 'form' && (
            <div className="w-full max-w-md">
                <RegistrationForm onSuccess={handleFormSuccess} onBack={handleBack} />
            </div>
        )}
        {step === 'photo' && (
            <Card className="w-full max-w-md p-8">
                <ProfileImageUpload onNext={handlePhotoNext} onSkip={handlePhotoSkip} onBack={handleBack}/>
            </Card>
        )}
    </div>
  );
}
