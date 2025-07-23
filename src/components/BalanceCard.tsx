
'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BalanceCard() {
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const { t } = useLanguage();

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    return (
        <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t('balance')}</CardTitle>
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
