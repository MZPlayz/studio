
'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{currentContent.balance}</CardTitle>
                <button className="text-muted-foreground" onClick={toggleBalanceVisibility}>
                    {isBalanceVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">
                    {isBalanceVisible ? '৳7.00' : '৳•••••'}
                </div>
            </CardContent>
        </Card>
    )
}
