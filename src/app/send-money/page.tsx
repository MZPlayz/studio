
'use client';

import { useState } from 'react';
import { ArrowLeft, UserPlus, Bank, CreditCard, Send } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import Image from 'next/image';

const TabSwitcher = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: 'p2p' | 'cashout') => void; }) => {
    return (
        <div className="flex justify-center p-1 bg-gray-200 rounded-lg">
            <Button
                onClick={() => setActiveTab('p2p')}
                className={cn(
                    "flex-1 transition-all",
                    activeTab === 'p2p' ? 'bg-white text-gray-800 shadow-md' : 'bg-transparent text-gray-500'
                )}
            >
                To RideGo User
            </Button>
            <Button
                onClick={() => setActiveTab('cashout')}
                className={cn(
                    "flex-1 transition-all",
                    activeTab === 'cashout' ? 'bg-white text-gray-800 shadow-md' : 'bg-transparent text-gray-500'
                )}
            >
                Withdrawal
            </Button>
        </div>
    );
};

const P2PTransferForm = () => {
    return (
        <div className="space-y-6 animate-in fade-in-0 duration-300">
            <div>
                <label htmlFor="recipient" className="text-sm font-medium text-gray-700">Recipient's Mobile Number</label>
                <div className="relative mt-1">
                    <Input id="recipient" placeholder="+8801XXXXXXXXX" className="bg-gray-100 border-none pr-10" />
                    <UserPlus className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
            </div>
            <div>
                <label htmlFor="amount-p2p" className="text-sm font-medium text-gray-700">Amount to Send (৳)</label>
                <Input id="amount-p2p" type="number" placeholder="0.00" className="bg-gray-100 border-none mt-1" />
                <p className="text-xs text-gray-500 mt-1">Available: ৳7.00</p>
            </div>
            <div>
                <label htmlFor="note" className="text-sm font-medium text-gray-700">Note (Optional)</label>
                <Textarea id="note" placeholder="e.g., For lunch" className="bg-gray-100 border-none mt-1" />
            </div>
            <Button className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold">
                <Send className="mr-2 h-5 w-5" /> Send Money
            </Button>
        </div>
    );
};

const CashOutForm = () => {
    const [method, setMethod] = useState('bKash');

    return (
        <div className="space-y-6 animate-in fade-in-0 duration-300">
            <div>
                <label className="text-sm font-medium text-gray-700">Withdrawal Method</label>
                <Select onValueChange={setMethod} defaultValue="bKash">
                    <SelectTrigger className="w-full bg-gray-100 border-none h-14 mt-1">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="bKash">
                            <div className="flex items-center gap-3">
                                <Image src="https://placehold.co/40x40.png" data-ai-hint="payment logo" alt="bKash" width={32} height={32} />
                                <span>bKash</span>
                            </div>
                        </SelectItem>
                         <SelectItem value="Nagad">
                            <div className="flex items-center gap-3">
                                <Image src="https://placehold.co/40x40.png" data-ai-hint="payment logo" alt="Nagad" width={32} height={32} />
                                <span>Nagad</span>
                            </div>
                        </SelectItem>
                         <SelectItem value="Rocket">
                            <div className="flex items-center gap-3">
                                <Image src="https://placehold.co/40x40.png" data-ai-hint="payment logo" alt="Rocket" width={32} height={32} />
                                <span>Rocket</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div>
                <label htmlFor="account-number" className="text-sm font-medium text-gray-700">{method} Account Number</label>
                <div className="relative mt-1">
                    <Input id="account-number" placeholder="Enter account number" className="bg-gray-100 border-none" />
                </div>
            </div>
            <div>
                <label htmlFor="amount-cashout" className="text-sm font-medium text-gray-700">Amount to Withdraw (৳)</label>
                <Input id="amount-cashout" type="number" placeholder="0.00" className="bg-gray-100 border-none mt-1" />
                 <p className="text-xs text-gray-500 mt-1">A 1.5% processing fee will be applied.</p>
            </div>
            <Button className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold">
                Confirm Withdrawal
            </Button>
        </div>
    );
};


export default function SendMoneyPage() {
    const [activeTab, setActiveTab] = useState<'p2p' | 'cashout'>('p2p');

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 font-sans">
            <header className="flex items-center justify-between p-4 bg-white shadow-sm">
                <Link href="/home">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6 text-gray-700" />
                    </Button>
                </Link>
                <h1 className="text-xl font-bold text-gray-800">Send Money</h1>
                <div className="w-10" />
            </header>

            <main className="flex-1 flex flex-col p-4 space-y-6">
                <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                    {activeTab === 'p2p' ? <P2PTransferForm /> : <CashOutForm />}
                </div>
            </main>
        </div>
    );
}
