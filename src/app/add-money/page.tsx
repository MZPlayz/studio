
'use client';

import { useState } from 'react';
import { ArrowLeft, Wallet, CreditCard, Radio, Smartphone, Banknote } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const BalanceCard3D = () => {
    return (
        <div className="group [perspective:1000px]">
            <div className="relative h-56 w-full rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 shadow-2xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(8deg)]">
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm opacity-70">Current Balance</p>
                                <p className="text-4xl font-bold tracking-tight">৳7.00</p>
                            </div>
                            <Wallet className="h-8 w-8 opacity-80" />
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <p className="text-lg font-medium tracking-wider">Alif Hossain</p>
                        <Image src="https://placehold.co/50x32.png" data-ai-hint="credit card chip" alt="Card Chip" width={50} height={32} />
                    </div>
                </div>
            </div>
        </div>
    );
};


const paymentMethods = [
    { name: 'bKash', icon: Smartphone, logo: 'https://placehold.co/40x40.png', hint: 'payment logo' },
    { name: 'Nagad', icon: Radio, logo: 'https://placehold.co/40x40.png', hint: 'payment logo' },
    { name: 'Rocket', icon: Banknote, logo: 'https://placehold.co/40x40.png', hint: 'payment logo' },
    { name: 'Card', icon: CreditCard, logo: 'https://placehold.co/40x40.png', hint: 'credit card' }
];

export default function AddMoneyPage() {
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('bKash');

    const handleQuickAdd = (value: number) => {
        setAmount(prev => String(Number(prev || 0) + value));
    };
    
    const displayAmount = amount || '0';

    return (
        <div className="flex min-h-screen flex-col bg-gray-800 font-sans text-white">
            <header className="flex items-center justify-between p-4">
                <Link href="/home">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6 text-white" />
                    </Button>
                </Link>
                <h1 className="text-xl font-bold">Add Money</h1>
                <div className="w-10" />
            </header>

            <main className="flex-1 flex flex-col p-4">
                <BalanceCard3D />
                
                <div className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="amount" className="text-sm font-medium text-gray-400">Enter Amount (৳)</label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="mt-1 h-14 w-full border-0 border-b-2 border-gray-600 bg-transparent text-center text-4xl font-bold tracking-wider text-white focus:border-purple-400 focus:ring-0"
                        />
                    </div>
                    
                    <div className="flex justify-center gap-2">
                        {[100, 500, 1000].map(val => (
                            <Button
                                key={val}
                                onClick={() => handleQuickAdd(val)}
                                className="rounded-full bg-gray-700/50 text-white shadow-md transition-all hover:bg-gray-600 hover:scale-105"
                            >
                                +৳{val}
                            </Button>
                        ))}
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-400">Select Payment Method</p>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {paymentMethods.map(method => (
                                <button
                                    key={method.name}
                                    onClick={() => setSelectedMethod(method.name)}
                                    className={cn(
                                        "flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 w-24 h-24 transition-all duration-300",
                                        selectedMethod === method.name 
                                            ? 'border-purple-500 bg-purple-500/10 scale-105 shadow-lg' 
                                            : 'border-gray-700 bg-gray-900/50 hover:border-gray-500'
                                    )}
                                >
                                    <Image src={method.logo} data-ai-hint={method.hint} alt={method.name} width={32} height={32} className="rounded-md" />
                                    <span className="text-xs font-medium">{method.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="p-4">
                <Button 
                    disabled={!amount || Number(amount) <= 0}
                    className="w-full h-16 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-lg font-bold shadow-lg transition-all hover:shadow-purple-500/50 hover:scale-[1.02] disabled:opacity-50"
                >
                    Proceed to Add ৳{displayAmount}
                </Button>
            </footer>
        </div>
    );
}
