'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase-client';

interface OtpVerificationProps {
  phone: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function OtpVerification({ phone, onSuccess, onBack }: OtpVerificationProps) {
  const { t } = useLanguage();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.verifyOtp({
      phone: `+88${phone}`,
      token: otp,
      type: 'sms',
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Verification successful!');
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 md:items-center md:justify-center">
      <div className="w-full bg-white dark:bg-black md:max-w-md md:rounded-xl md:border dark:border-gray-700 md:shadow-lg">
        <div className="flex flex-col p-4 md:p-8">
          <header className="relative flex items-center justify-center py-4">
            <button className="absolute left-0" onClick={onBack}>
              &larr;
            </button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Verify OTP</h1>
          </header>
          <main className="flex-1">
            <form onSubmit={handleSubmit} className="flex h-full flex-col">
              <div className="flex-1 space-y-4">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Enter the 6-digit code sent to your phone.
                </p>
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    OTP
                  </label>
                  <Input
                    type="text"
                    id="otp"
                    maxLength={6}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
              {message && <p className="text-center text-sm font-medium text-red-500">{message}</p>}
              <div className="mt-8 pb-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-[#8A2BE2] py-3 font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400"
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </Button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
