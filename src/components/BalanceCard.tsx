
'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

export default function BalanceCard() {
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const { t } = useLanguage();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    return (
        <Card className="rounded-xl shadow-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <CardContent className="p-4 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{isClient ? t('balance') : 'Balance'}</p>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        {isBalanceVisible ? '৳7.00' : '৳•••••'}
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" onClick={toggleBalanceVisibility}>
                    {isBalanceVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </CardContent>
        </Card>
    )
}
