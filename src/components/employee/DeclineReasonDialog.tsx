
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/utils/translations';

interface DeclineReasonDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  reason: string;
  onChange: (value: string) => void;
  language: 'en' | 'bg';
}

const DeclineReasonDialog: React.FC<DeclineReasonDialogProps> = ({
  open,
  onClose,
  onSubmit,
  reason,
  onChange,
  language
}) => {
  const t = useTranslation(language);
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('decline-service-request')}</DialogTitle>
          <DialogDescription>
            {t('decline-reason')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Textarea 
            placeholder={t('enter-decline-reason')}
            value={reason}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[150px]"
          />
          <p className={`text-xs ${reason.length < 50 || reason.length > 300 ? 'text-red-500' : 'text-muted-foreground'}`}>
            {reason.length}/300 {t('characters')} ({t('minimum')} 50)
          </p>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            {t('cancel')}
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={reason.length < 50 || reason.length > 300}
            className="bg-roadsaver-red text-white hover:bg-roadsaver-red/90"
          >
            {t('send')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeclineReasonDialog;
