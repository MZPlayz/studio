
'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <footer className="sticky bottom-0 border-t bg-white p-2">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow rounded-full border-gray-300 bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="off"
        />
        <Button type="submit" size="icon" className="h-10 w-10 flex-shrink-0 rounded-full bg-blue-500 text-white hover:bg-blue-600">
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </footer>
  );
}
