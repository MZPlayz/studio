
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Truck, Users, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import IncomeHistoryItem from '@/components/IncomeHistoryItem';

export interface Income {
  id: number;
  amount: number;
  source: 'booking' | 'referral' | 'creation';
  details: string;
  date: string;
}

const mockIncome: Income[] = [
  {
    id: 1,
    amount: 50,
    source: 'booking',
    details: 'Ride #RBK90433 commission',
    date: '2025-07-26',
  },
  {
    id: 2,
    amount: 12,
    source: 'referral',
    details: 'Referral bonus from user 017...',
    date: '2025-07-25',
  },
  {
    id: 3,
    amount: 20,
    source: 'creation',
    details: 'Account creation fee for 019...',
    date: '2025-07-25',
  },
  {
    id: 4,
    amount: 75,
    source: 'booking',
    details: 'Ride #RBK90434 commission',
    date: '2025-07-24',
  },
  {
    id: 5,
    amount: 20,
    source: 'creation',
    details: 'Account creation fee for 016...',
    date: '2025-07-23',
  },
  {
    id: 6,
    amount: 12,
    source: 'referral',
    details: 'Referral bonus from user 018...',
    date: '2025-07-22',
  },
];

const FilterButton = ({
  label,
  value,
  activeFilter,
  onClick,
}: {
  label: string;
  value: string;
  activeFilter: string;
  onClick: (value: string) => void;
}) => (
  <Button
    onClick={() => onClick(value)}
    variant="outline"
    className={cn(
      'rounded-full border-gray-300 bg-white',
      activeFilter === value && 'bg-primary text-primary-foreground border-primary'
    )}
  >
    {label}
  </Button>
);

export default function IncomeHistoryPage() {
  const [filter, setFilter] = useState('all');

  const filteredIncome = mockIncome.filter(
    (item) => filter === 'all' || item.source === filter
  );
  
  const totalIncome = mockIncome.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
        <Link href="/agent-home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">ইনকাম হিস্ট্রি</h1>
        <div className="w-10" />
      </header>
      
      <main className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Total Income</p>
                <p className="text-2xl font-bold text-gray-800">৳{totalIncome.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-gray-800">৳{(totalIncome * 0.75).toFixed(2)}</p>
            </div>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
            <FilterButton label="All" value="all" activeFilter={filter} onClick={setFilter} />
            <FilterButton label="Booking" value="booking" activeFilter={filter} onClick={setFilter} />
            <FilterButton label="Referral" value="referral" activeFilter={filter} onClick={setFilter} />
            <FilterButton label="Creation" value="creation" activeFilter={filter} onClick={setFilter} />
        </div>

        <div className="space-y-4">
            {filteredIncome.map((item) => (
                <IncomeHistoryItem key={item.id} income={item} />
            ))}
        </div>
      </main>
    </div>
  );
}
