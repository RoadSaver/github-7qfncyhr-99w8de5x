
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface PaymentTabContentProps {
  t: (key: string) => string;
}

const PaymentTabContent: React.FC<PaymentTabContentProps> = ({ t }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">{t('payment-options')}</h3>
      <p className="text-sm text-muted-foreground text-center mb-4">
        {t('payment-future-update')}
      </p>
      
      <Button className="bg-green-600 hover:bg-green-700" disabled>
        {t('add-payment-method')}
      </Button>
    </div>
  );
};

export default PaymentTabContent;
