
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ChevronRight, FileUp, ScanFace, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const steps = [
  { id: 1, title: 'National ID', description: 'Upload a clear image of your NID card' },
  { id: 2, title: 'Driving License', description: 'Upload your driving license' },
  { id: 3, title: 'Car Image', description: 'Upload a photo of your vehicle' },
  { id: 4, title: 'Face Verification', description: 'Verify your identity with a quick scan' },
];

const UploadStep = ({ title, description, onNext }: { title: string; description: string; onNext: () => void }) => {
    return (
        <div className="text-center p-6 flex flex-col items-center justify-center h-full animate-in fade-in-50 duration-500">
            <div className="bg-blue-100 rounded-full p-4 mb-6">
                <FileUp className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 mb-8">{description}</p>
            <Button variant="outline" className="w-full max-w-xs border-dashed h-32 text-gray-500">
                Tap to upload file
            </Button>
             <Button onClick={onNext} className="w-full max-w-xs mt-8 h-12">
                Next <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
    );
};

const FaceVerificationStep = ({ onNext }: { onNext: () => void }) => {
     return (
        <div className="text-center p-6 flex flex-col items-center justify-center h-full animate-in fade-in-50 duration-500">
            <div className="bg-purple-100 rounded-full p-4 mb-6">
                <ScanFace className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Face Verification</h2>
            <p className="text-gray-600 mb-8">Please look directly into the camera</p>
            <div className="w-full max-w-xs aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Camera View</p>
            </div>
             <Button onClick={onNext} className="w-full max-w-xs mt-8 h-12">
                Start Face Verification
            </Button>
        </div>
    );
};

const CompletionStep = () => {
     return (
        <div className="text-center p-6 flex flex-col items-center justify-center h-full animate-in fade-in-50 duration-500">
            <div className="bg-green-100 rounded-full p-4 mb-6">
                <ShieldCheck className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Submitted</h2>
            <p className="text-gray-600 mb-8">Thank you! We will review your documents and notify you within 2-3 business days.</p>
             <Link href="/home" className="w-full max-w-xs">
                <Button className="w-full h-12">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
};


export default function IdentityVerificationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;
  const progress = ((currentStep -1) / totalSteps) * 100;

  const handleNext = () => {
    setCurrentStep((prev) => (prev < totalSteps + 1 ? prev + 1 : prev));
  };
  
  const handleBack = () => {
    if(currentStep > 1) {
        setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch(currentStep) {
        case 1:
            return <UploadStep title="National ID" description="Upload a clear image of the front and back" onNext={handleNext} />
        case 2:
            return <UploadStep title="Driving License" description="Ensure the license is valid and not expired" onNext={handleNext} />
        case 3:
            return <UploadStep title="Car Image" description="Upload a clear photo of your vehicle" onNext={handleNext} />
        case 4:
            return <FaceVerificationStep onNext={handleNext} />
        case 5:
            return <CompletionStep />
        default:
            return null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
        {currentStep <= totalSteps ? (
            <Button variant="ghost" size="icon" onClick={handleBack} disabled={currentStep === 1}>
                <ArrowLeft className="h-6 w-6" />
            </Button>
        ) : <div className="w-10"/>}

        <div className="flex-1 text-center">
            { currentStep <= totalSteps &&
                <h1 className="text-xl font-bold text-gray-800">
                    {steps[currentStep-1].title}
                </h1>
            }
        </div>
        <div className="w-10 text-sm text-gray-500">
             {currentStep <= totalSteps && `Step ${currentStep}/${totalSteps}`}
        </div>
      </header>

      { currentStep <= totalSteps &&
        <div className="p-4">
            <Progress value={progress} className="w-full" />
        </div>
      }
      
      <main className="flex-grow">
        {renderStepContent()}
      </main>

    </div>
  );
}
