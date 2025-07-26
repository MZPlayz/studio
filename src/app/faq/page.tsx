
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
    {
        question: "How do I book a ride?",
        answer: "To book a ride, open the app and enter your destination in the 'Where to?' box. Confirm your pickup location, choose your vehicle type, and tap 'Confirm Booking'."
    },
    {
        question: "Can I schedule a ride in advance?",
        answer: "Yes, you can schedule a ride up to 30 days in advance. On the booking screen, tap the 'Schedule' button next to the confirmation button to set a future date and time."
    },
    {
        question: "How is the fare calculated?",
        answer: "Fares are calculated based on a combination of distance, travel time, and demand. You will always see an upfront price before you confirm your booking."
    },
    {
        question: "What are the payment options?",
        answer: "We accept payments through our in-app wallet, credit/debit cards, and mobile banking services like bKash and Nagad. You can add money to your wallet from the 'Add Money' section."
    },
     {
        question: "How do I cancel a ride?",
        answer: "You can cancel a ride from the 'Booking History' page. Find the active trip and select the 'Cancel Trip' option. Please note that a cancellation fee may apply depending on how long after booking you cancel."
    }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black font-sans">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white dark:bg-gray-900 dark:border-gray-800 p-4">
        <Link href="/menu">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6 text-gray-800 dark:text-gray-100" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800 dark:text-gray-100">FAQ</h1>
        <div className="w-10" />
      </header>

      <main className="p-4">
        <Accordion type="single" collapsible className="w-full bg-white dark:bg-gray-900 dark:border-gray-800 rounded-lg px-4">
            {faqItems.map((item, index) => (
                 <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-700">
                    <AccordionTrigger className="text-left text-gray-800 dark:text-gray-100">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-700 dark:text-gray-300">
                        {item.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </main>
    </div>
  );
}
