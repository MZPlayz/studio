
'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

const content = {
    bn: {
        balance: "ব্যালেন্স"
    },
    en: {
        balance: "Balance"
    }
}

export default function BalanceCard() {
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const { language } = useLanguage();
    const currentContent = content[language] || content.bn;

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    return (
        <Card className="shadow-lg">
            <CardContent className="p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">{currentContent.balance}</p>
                        {isBalanceVisible ? (
                        <p className="text-2xl font-bold">৳7.00</p>
                        ) : (
                        <p className="text-2xl font-bold">৳ ●●●●</p>
                        )}
                    </div>
                    <button className="text-gray-400" onClick={toggleBalanceVisibility}>
                        {isBalanceVisible ? <Eye size={24} /> : <EyeOff size={24} />}
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
