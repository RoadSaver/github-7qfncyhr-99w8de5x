
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Facebook, MessageSquare, Phone } from 'lucide-react';

interface AboutTabContentProps {
  t: (key: string) => string;
}

const AboutTabContent: React.FC<AboutTabContentProps> = ({ t }) => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <ScrollArea className="flex-grow">
        <div className="space-y-4 text-center py-4">
          <div>
            <h2 className="text-xl font-bold">RoadSaver</h2>
            <p className="text-sm text-muted-foreground">{t('version')} 1.0.0</p>
          </div>
          
          <div className="text-sm">
            <p>{t('work-hours-line1')}</p>
            <p>{t('work-hours-line2')}</p>
            <p className="mt-2 text-orange-600 px-2 leading-relaxed">
              {t('outside-hours-contact')}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">{t('contact-information')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('email')}: roadsaverapp@gmail.com
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {t('phone')}: +359 888 123 456
            </p>
            
            <div className="grid grid-cols-2 gap-2 px-4 max-w-xs mx-auto">
              <Button variant="outline" size="sm" className="text-xs flex items-center justify-center gap-1.5">
                <Facebook className="h-3.5 w-3.5" /> Facebook
              </Button>
              <Button variant="outline" size="sm" className="text-xs flex items-center justify-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" /> Messenger
              </Button>
              <Button variant="outline" size="sm" className="text-xs flex items-center justify-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> WhatsApp
              </Button>
              <Button variant="outline" size="sm" className="text-xs flex items-center justify-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> Viber
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AboutTabContent;
