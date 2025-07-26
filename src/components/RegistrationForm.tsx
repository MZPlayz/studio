
'use client';

import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';
import { supabase } from '@/lib/supabase-client';

interface RegistrationFormProps {
  onSuccess: (phone: string) => void;
  onBack: () => void;
  referralCode?: string;
}

export default function RegistrationForm({ onSuccess, onBack, referralCode }: RegistrationFormProps) {
  const { t } = useLanguage();
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (pin !== confirmPin) {
      setMessage('PINs do not match.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      phone: `+88${mobileNumber}`,
      password: pin,
      options: {
        data: {
          full_name: fullName,
          address: address,
        },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Registration successful! Please check your phone for a verification code.');
      onSuccess(mobileNumber);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 md:items-center md:justify-center">
      <div className="w-full bg-white dark:bg-black md:max-w-md md:rounded-xl md:border dark:border-gray-700 md:shadow-lg">
        <div className="flex flex-col p-4 md:p-8">
          <header className="relative flex items-center justify-center py-4">
            <button className="absolute left-0" onClick={onBack}>
              <ArrowLeft className="h-6 w-6 text-gray-800 dark:text-gray-100" />
            </button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t('register_title')}</h1>
          </header>
          <main className="flex-1">
            <form onSubmit={handleSubmit} className="flex h-full flex-col">
              <div className="flex-1 space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="pin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    6-digit PIN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="pin"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm PIN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPin"
                    maxLength={6}
                    placeholder="Confirm 6-digit PIN"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter your current address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="referral" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    id="referral"
                    placeholder="Enter referral code"
                    value={referralCode}
                    disabled={!!referralCode}
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500 disabled:bg-gray-800 disabled:text-gray-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
              {message && <p className="text-center text-sm font-medium text-red-500">{message}</p>}
              <div className="mt-8 pb-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-[#8A2BE2] py-3 font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400"
                >
                  {loading ? 'Registering...' : t('register_title')}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
