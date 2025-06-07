import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';

interface InfoIconProps {
  titleKey: string;
  contentKey: string;
  contentValues?: Record<string, string | number>;
}

const InfoIcon: React.FC<InfoIconProps> = ({ titleKey, contentKey, contentValues }) => {
  const { language } = useApp();
  const t = useTranslation(language);
  let content = t(contentKey);
  if (contentValues) {
    Object.entries(contentValues).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{${key}}`, 'g'), String(value));
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1">
          <Info className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t(titleKey)}</DialogTitle>
          <DialogDescription className="whitespace-pre-line">
            {content}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InfoIcon;
