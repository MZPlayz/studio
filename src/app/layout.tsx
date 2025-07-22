
'use client'

import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import SmoothCursor from '@/components/ui/smooth-cursor';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en">
        <body className={`${inter.variable} font-sans`}>
          <SmoothCursor />
          {children}
        </body>
      </html>
    </LanguageProvider>
  );
}
