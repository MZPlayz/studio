
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Car, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RegistrationForm from '@/components/RegistrationForm';
import ProfileImageUpload from '@/components/ProfileImageUpload';
import RetroGrid from '@/components/ui/retro-grid';
import HyperText from '@/components/ui/hyper-text';

type AccountType = 'customer' | 'driver' | 'agent' | null;
type Step = 'select_type' | 'form' | 'photo';

const TypeSelectionCard = ({ icon: Icon, title, description, onClick }: { icon: React.ElementType, title: string, description: string, onClick: () => void }) => (
    <Card onClick={onClick} className="cursor-pointer bg-white/50 hover:bg-white/80 transition-colors border-gray-300">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="bg-blue-100 p-3 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
    </Card>
);

export default function CreateAccountPage() {
    const [step, setStep] = useState<Step>('select_type');
    const [accountType, setAccountType] = useState<AccountType>(null);
    const agentReferralCode = "AGENT789"; // This would come from agent's session

    const handleTypeSelect = (type: AccountType) => {
        setAccountType(type);
        setStep('form');
    };
    
    const handleFormSuccess = () => {
        setStep('photo');
    };

    const handleBack = () => {
        if (step === 'form') {
            setStep('select_type');
            setAccountType(null);
        } else if (step === 'photo') {
            setStep('form');
        }
    }
    
    const handlePhotoSkip = () => {
        console.log(`Skipped photo for ${accountType}, redirecting to dashboard...`);
        // In a real app, you would probably redirect to a success page or dashboard.
        setStep('select_type');
        setAccountType(null);
    }
    
    const handlePhotoNext = () => {
        console.log(`Finished account creation for ${accountType}, redirecting...`);
        setStep('select_type');
        setAccountType(null);
    }

    const getTitle = () => {
        if(step === 'select_type') return 'Create an Account';
        if(step === 'photo') return 'Profile Image';
        if(accountType) return `New ${accountType.charAt(0).toUpperCase() + accountType.slice(1)} Account`;
        return 'Register';
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
            <RetroGrid className="absolute inset-0 w-full h-full" />
            
            {step === 'select_type' && (
                <div className="z-10 flex w-full max-w-md flex-col items-center space-y-6 rounded-xl border bg-white/80 p-8 shadow-2xl backdrop-blur-sm dark:border-gray-700 dark:bg-black/80 animate-in fade-in-50 duration-500 data-[state=closed]:animate-out data-[state=closed]:fade-out-50">
                     <HyperText className="text-2xl font-bold text-gray-800">
                       Choose Your Account Type
                    </HyperText>
                    <p className="text-gray-600">Select the type of account you would like to create.</p>
                    <div className="w-full space-y-4">
                        <TypeSelectionCard 
                            icon={User} 
                            title="Customer" 
                            description="Create a standard user account for booking rides." 
                            onClick={() => handleTypeSelect('customer')} 
                        />
                         <TypeSelectionCard 
                            icon={Car} 
                            title="Driver" 
                            description="Create a driver account to offer rides and earn." 
                            onClick={() => handleTypeSelect('driver')} 
                        />
                         <TypeSelectionCard 
                            icon={Briefcase} 
                            title="Agent" 
                            description="Create another agent account with referral capabilities." 
                            onClick={() => handleTypeSelect('agent')} 
                        />
                    </div>
                     <div className="mt-8 text-center">
                        <p className="text-gray-600">Already have an account? <Link href="/" className="font-medium text-accent hover:underline">Log in</Link></p>
                    </div>
                </div>
            )}
            
            {step === 'form' && accountType && (
                <div className="w-full animate-in fade-in-50 duration-500">
                    <RegistrationForm
                        onSuccess={handleFormSuccess}
                        onBack={handleBack}
                        referralCode={agentReferralCode}
                    />
                </div>
            )}

            {step === 'photo' && (
                 <div className="z-10 flex w-full max-w-md flex-col items-center space-y-6 rounded-xl border bg-white/80 p-8 shadow-2xl backdrop-blur-sm dark:border-gray-700 dark:bg-black/80 animate-in fade-in-50 duration-500">
                    <ProfileImageUpload onNext={handlePhotoNext} onSkip={handlePhotoSkip} onBack={handleBack}/>
                </div>
            )}
        </div>
    );
}
