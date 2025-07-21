
'use client';

import type { Message } from '@/app/support/page';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <div className={cn('flex items-end gap-2', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-xs rounded-2xl px-4 py-2 md:max-w-md',
          isUser
            ? 'rounded-br-lg bg-blue-500 text-white'
            : 'rounded-bl-lg bg-gray-200 text-gray-800'
        )}
      >
        <p className="text-sm">{message.text}</p>
        <p className={cn('mt-1 text-right text-xs', isUser ? 'text-blue-200' : 'text-gray-500')}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}
