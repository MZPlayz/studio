
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Car, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RegistrationForm from '@/components/RegistrationForm';
import ProfileImageUpload from '@/components/ProfileImageUpload';

type AccountType = 'customer' | 'driver' | 'agent' | null;
type Step = 'select_type' | 'form' | 'photo';

const TypeSelectionCard = ({ icon: Icon, title, description, onClick }: { icon: React.ElementType, title: string, description: string, onClick: () => void }) => (
    <Card onClick={onClick} className="cursor-pointer hover:bg-gray-50 transition-colors">
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
        if(step === 'select_type') return 'অ্যাকাউন্ট তৈরি';
        if(step === 'photo') return 'Profile Image';
        if(accountType) return `New ${accountType.charAt(0).toUpperCase() + accountType.slice(1)} Account`;
        return 'Register';
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
             {step !== 'form' && (
                <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
                    <Button variant="ghost" size="icon" onClick={step === 'select_type' ? undefined : handleBack} asChild={step === 'select_type'}>
                       {step === 'select_type' ? (
                            <Link href="/agent-home">
                                <ArrowLeft className="h-6 w-6" />
                            </Link>
                       ) : (
                            <ArrowLeft className="h-6 w-6" />
                       )}
                    </Button>
                    <h1 className="flex-1 text-center text-xl font-bold text-gray-800">{getTitle()}</h1>
                    <div className="w-10" />
                </header>
             )}

            <main className={step !== 'form' ? "p-4" : ""}>
                {step === 'select_type' && (
                    <div className="space-y-4 animate-in fade-in-50">
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
                )}
                
                {step === 'form' && accountType && (
                    <RegistrationForm
                        onSuccess={handleFormSuccess}
                        onBack={handleBack}
                        referralCode={agentReferralCode}
                    />
                )}

                {step === 'photo' && (
                    <ProfileImageUpload onNext={handlePhotoNext} onSkip={handlePhotoSkip} onBack={handleBack}/>
                )}
            </main>
        </div>
    );
}
