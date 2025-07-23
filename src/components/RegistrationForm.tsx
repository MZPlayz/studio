
'use client';

import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface RegistrationFormProps {
  onSuccess: () => void;
  onBack: () => void;
  referralCode?: string;
}

export default function RegistrationForm({ onSuccess, onBack, referralCode }: RegistrationFormProps) {
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 md:items-center md:justify-center">
      <div className="w-full bg-white md:max-w-md md:rounded-xl md:border md:shadow-lg">
        <div className="flex flex-col p-4 md:p-8">
          <header className="relative flex items-center justify-center py-4">
            <button className="absolute left-0" onClick={onBack}>
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold">{t('register_title')}</h1>
          </header>
          <main className="flex-1">
            <form onSubmit={handleSubmit} className="flex h-full flex-col">
              <div className="flex-1 space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    placeholder="Enter your mobile number"
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
                    5-digit PIN
                  </label>
                  <input
                    type="password"
                    id="pin"
                    maxLength={5}
                    placeholder="Enter 5-digit PIN"
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPin" className="block text-sm font-medium text-gray-700">
                    Confirm PIN
                  </label>
                  <input
                    type="password"
                    id="confirmPin"
                    maxLength={5}
                    placeholder="Confirm 5-digit PIN"
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Current Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter your current address"
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="referral" className="block text-sm font-medium text-gray-700">
                    Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    id="referral"
                    placeholder="Enter referral code"
                    value={referralCode}
                    disabled={!!referralCode}
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500 disabled:bg-gray-200 disabled:text-gray-500"
                  />
                </div>
              </div>
              <div className="mt-8 pb-4">
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#8A2BE2] py-3 font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  {t('register_title')}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
