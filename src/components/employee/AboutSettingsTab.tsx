
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface AboutSettingsTabProps {
  t: (key: string) => string;
}

const AboutSettingsTab: React.FC<AboutSettingsTabProps> = ({ t }) => {
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
          </div>

          <div>
            <h3 className="font-medium mb-2">{t('contact-information')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('email')}: roadsaverapp@gmail.com
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {t('phone')}: +359 888 123 456
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AboutSettingsTab;
