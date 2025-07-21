
'use client';

import { Truck, Users, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Income } from '@/app/income-history/page';

interface IncomeHistoryItemProps {
  income: Income;
}

const sourceConfig = {
  booking: {
    icon: Truck,
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
    title: 'Booking Commission',
  },
  referral: {
    icon: Users,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
    title: 'Referral Bonus',
  },
  creation: {
    icon: UserPlus,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
    title: 'Account Creation Fee',
  },
};

export default function IncomeHistoryItem({ income }: IncomeHistoryItemProps) {
  const config = sourceConfig[income.source];
  const Icon = config.icon;

  return (
    <div className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-sm">
      <div className={cn('flex h-12 w-12 items-center justify-center rounded-full', config.bgColor)}>
        <Icon className={cn('h-6 w-6', config.textColor)} />
      </div>
      <div className="flex-grow">
        <p className="font-bold text-gray-800">{config.title}</p>
        <p className="text-sm text-gray-600">{income.details}</p>
        <p className="text-xs text-gray-400">{income.date}</p>
      </div>
      <div className="text-right">
        <p className={cn('text-lg font-bold', config.textColor)}>
          + ৳{income.amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
