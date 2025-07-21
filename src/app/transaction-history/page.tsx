
'use client';

import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TransactionListItem from '@/components/TransactionListItem';
import Link from 'next/link';
import { addDays, subDays } from 'date-fns';

export interface Transaction {
  id: number;
  type: 'received' | 'sent';
  amount: number;
  method: string;
  party: string;
  timestamp: Date;
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: 'received',
    amount: 500,
    method: 'Bkash',
    party: '+8801712345678',
    timestamp: new Date(), // Today
  },
  {
    id: 2,
    type: 'sent',
    amount: 200,
    method: 'Nagad',
    party: '+8801812345678',
    timestamp: new Date(), // Today
  },
  {
    id: 3,
    type: 'received',
    amount: 1000,
    method: 'Bkash',
    party: '+8801912345678',
    timestamp: subDays(new Date(), 1), // Yesterday
  },
  {
    id: 4,
    type: 'sent',
    amount: 300,
    method: 'Nagad',
    party: '+8801612345678',
    timestamp: subDays(new Date(), 2), // 2 days ago
  },
  {
    id: 5,
    type: 'received',
    amount: 750,
    method: 'Bkash',
    party: '+8801512345678',
    timestamp: subDays(new Date(), 3), // 3 days ago
  },
  {
    id: 6,
    type: 'sent',
    amount: 150,
    method: 'Nagad',
    party: '+8801312345678',
    timestamp: subDays(new Date(), 4), // 4 days ago
  },
];


export default function TransactionHistoryPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTransactions = mockTransactions.filter(
        (transaction) =>
        transaction.party.includes(searchQuery) ||
        transaction.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(transaction.amount).includes(searchQuery)
    );

    return (
        <div className="min-h-screen bg-white font-sans">
            <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
                 <Link href="/home">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <h1 className="text-xl font-bold text-gray-800">Transaction History</h1>
                <div className="w-10" />
            </header>

            <main className="p-4">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search transactions"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-md border-gray-300 bg-gray-100 p-3 pl-10 text-gray-700 placeholder-gray-500"
                    />
                </div>

                <div>
                    <h2 className="mb-2 text-lg font-bold text-gray-800">Recent Transactions</h2>
                    <div className="space-y-4">
                        {filteredTransactions.map((transaction) => (
                            <TransactionListItem key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
