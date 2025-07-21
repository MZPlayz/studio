
'use client';

import React from 'react';
import type { Message } from '@/app/support/page';
import MessageBubble from './MessageBubble';

interface MessageListProps {
  messages: Message[];
}

const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(({ messages }, ref) => {
  return (
    <main ref={ref} className="flex-grow space-y-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </main>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;
