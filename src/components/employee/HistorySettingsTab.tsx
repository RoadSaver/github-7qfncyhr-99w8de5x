
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from 'lucide-react';
import { getServiceIconAndTitle, ServiceType } from '@/components/service/serviceIcons';
import { useApp } from '@/contexts/AppContext';

interface HistorySettingsTabProps {
  t: (key: string) => string;
}

const HistorySettingsTab: React.FC<HistorySettingsTabProps> = ({ t }) => {
  const { requestHistory } = useApp();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="text-center py-4 flex-shrink-0">
        <History className="h-12 w-12 mx-auto text-blue-600 mb-2" />
        <h3 className="text-lg font-medium mb-1">{t('completed-requests')}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {t('completed-requests-desc')}
        </p>
      </div>
      <ScrollArea className="flex-grow">
        <div className="space-y-2 pb-4">
          {requestHistory && requestHistory.length > 0 ? (
            requestHistory.map((request) => {
              const iconSizeClass = "h-5 w-5";
              const { icon } = getServiceIconAndTitle(request.type as ServiceType, t, null, iconSizeClass);
              
              return (
                <div key={request.id} className="p-3 bg-secondary rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{t(request.type)}</span>
                      {icon}
                    </div>
                    <span className="text-sm text-blue-600">{t('completed')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{request.user}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.date} {request.completedTime && `- ${t('completed-at')}: ${request.completedTime}`}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground">{t('no-requests')}</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default HistorySettingsTab;
