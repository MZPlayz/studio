
import { PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

export default function SavingsBanner() {
  const { t } = useLanguage();
  return (
    <div className="bg-primary rounded-2xl p-4 flex items-center space-x-4 text-white">
      <div className="flex-shrink-0 text-center">
        <div className="bg-white rounded-lg w-16 h-16 flex items-center justify-center mb-1">
          <PiggyBank className="h-10 w-10 text-primary" />
        </div>
        <p className="text-xs font-bold text-white">সেভিংস</p>
      </div>
      <div>
        <p className="font-bold">{t('savings_banner_title')}</p>
        <p className="text-xs mb-2">{t('savings_banner_subtitle')}</p>
        <Button variant="secondary" className="border border-white rounded-full px-4 py-1 text-xs h-auto bg-transparent hover:bg-white/20 text-white">
          {t('savings_banner_button')}
        </Button>
      </div>
    </div>
  );
}
