
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegistrationForm from '@/components/RegistrationForm';
import ProfileImageUpload from '@/components/ProfileImageUpload';

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
    // Logic for the next step (e.g., payment) will go here
    console.log('Proceeding to payment');
    router.push('/home');
  };

  const handlePhotoSkip = () => {
    // Logic for skipping and proceeding to the next step
    console.log('Skipping photo, proceeding to payment');
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-white">
      {step === 'form' && <RegistrationForm onSuccess={handleFormSuccess} onBack={handleBack}/>}
      {step === 'photo' && <ProfileImageUpload onNext={handlePhotoNext} onSkip={handlePhotoSkip} onBack={handleBack}/>}
    </div>
  );
}
