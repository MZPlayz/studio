
'use client';

import { useState } from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import ProfileImageUpload from '@/components/ProfileImageUpload';

export default function CustomerRegistrationPage() {
  const [step, setStep] = useState('form');

  const handleFormSuccess = () => {
    setStep('photo');
  };

  const handlePhotoNext = () => {
    // Logic for the next step (e.g., payment) will go here
    console.log('Proceeding to payment');
  };

  const handlePhotoSkip = () => {
    // Logic for skipping and proceeding to the next step
    console.log('Skipping photo, proceeding to payment');
  };

  return (
    <div className="min-h-screen bg-white">
      {step === 'form' && <RegistrationForm onSuccess={handleFormSuccess} />}
      {step === 'photo' && <ProfileImageUpload onNext={handlePhotoNext} onSkip={handlePhotoSkip} />}
    </div>
  );
}
