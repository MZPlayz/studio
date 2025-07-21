
'use client';

import { useState, useRef, useEffect } from 'react';
import ChatHeader from '@/components/ChatHeader';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';

export interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: 'user' | 'agent';
}

const mockMessages: Message[] = [
  {
    id: 1,
    text: 'Hello! I am having an issue with my last ride.',
    timestamp: '10:00 AM',
    sender: 'user',
  },
  {
    id: 2,
    text: 'Hi there! I can help with that. Could you please provide the booking ID?',
    timestamp: '10:01 AM',
    sender: 'agent',
  },
  {
    id: 3,
    text: 'Sure, the ID is #RBK90433.',
    timestamp: '10:02 AM',
    sender: 'user',
  },
  {
    id: 4,
    text: 'Thank you. Let me check the details for you. One moment please.',
    timestamp: '10:03 AM',
    sender: 'agent',
  },
];

export default function SupportChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the message list whenever messages change
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (text.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'user',
    };
    setMessages([...messages, newMessage]);

    // Simulate agent response
    setTimeout(() => {
        const agentResponse: Message = {
            id: messages.length + 2,
            text: 'Thank you for your message. We are looking into it and will get back to you shortly.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: 'agent'
        };
        setMessages(prevMessages => [...prevMessages, agentResponse]);
    }, 1500);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100 font-sans">
      <ChatHeader />
      <MessageList messages={messages} ref={messageListRef} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
