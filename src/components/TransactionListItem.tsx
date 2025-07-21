
'use client';

import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/app/transaction-history/page';

interface TransactionListItemProps {
  transaction: Transaction;
}

const formatTimestamp = (date: Date): string => {
  if (isToday(date)) {
    return `Today, ${format(date, 'p')}`;
  }
  if (isYesterday(date)) {
    return `Yesterday, ${format(date, 'p')}`;
  }
  return `${formatDistanceToNow(date, { addSuffix: true })}, ${format(date, 'p')}`;
};

export default function TransactionListItem({ transaction }: TransactionListItemProps) {
  const isReceived = transaction.type === 'received';

  return (
    <div className="flex items-start gap-4 p-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
        {isReceived ? (
          <ArrowDownLeft className="h-6 w-6 text-green-600" />
        ) : (
          <ArrowUpRight className="h-6 w-6 text-red-600" />
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
            <div>
                 <p className="font-bold text-gray-800">{isReceived ? 'Received' : 'Sent'}</p>
                 <p className="text-sm text-gray-500">
                    {isReceived ? 'Received from' : 'Sent to'} {transaction.party} via {transaction.method} | BDT {isReceived ? '' : '-'}{transaction.amount}
                 </p>
                 <p className="text-sm text-gray-500">{isReceived ? 'Received' : 'Sent'}</p>
            </div>
            <p className="whitespace-nowrap text-right text-xs text-gray-500">
                {formatTimestamp(transaction.timestamp)}
            </p>
        </div>
      </div>
    </div>
  );
}
