
'use client';

import { ArrowLeft } from 'lucide-react';

interface RegistrationFormProps {
  onSuccess: () => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="flex h-screen flex-col p-4">
      <header className="relative flex items-center justify-center py-4">
        <button className="absolute left-0">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Register</h1>
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
                className="mt-1 block w-full rounded-md border-none bg-gray-100 p-3 shadow-sm focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="mt-auto pb-4">
            <button
              type="submit"
              className="w-full rounded-md bg-[#8A2BE2] py-3 font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
