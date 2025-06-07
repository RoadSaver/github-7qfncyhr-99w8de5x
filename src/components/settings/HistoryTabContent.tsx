
import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { History as HistoryIcon, MapPin, Clock, User, DollarSign } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { UserHistoryService, UserHistoryEntry } from '@/services/userHistoryService';
import { getServiceIconAndTitle, ServiceType } from '@/components/service/serviceIcons';

interface HistoryTabContentProps {
  t: (key: string) => string;
}

const HistoryTabContent: React.FC<HistoryTabContentProps> = ({ t }) => {
  const { user } = useApp();
  const [historyEntries, setHistoryEntries] = useState<UserHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserHistory();
    }
  }, [user]);

  const loadUserHistory = async () => {
    if (!user) return;
    
    try {
      const history = await UserHistoryService.getUserHistory(user.username, user.username);
      setHistoryEntries(history);
    } catch (error) {
      console.error('Error loading user history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openGoogleMaps = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <HistoryIcon className="h-12 w-12 mx-auto text-green-600 mb-2 animate-spin" />
          <p className="text-sm text-muted-foreground">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="text-center py-4 flex-shrink-0">
        <HistoryIcon className="h-12 w-12 mx-auto text-green-600 mb-2" />
        <h3 className="text-lg font-medium mb-1">{t('request-history')}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {t('requests-desc')}
        </p>
      </div>
      
      <ScrollArea className="flex-grow">
        <div className="space-y-3 pb-4">
          {historyEntries && historyEntries.length > 0 ? (
            historyEntries.map((entry) => {
              const iconSizeClass = "h-5 w-5";
              const { icon } = getServiceIconAndTitle(entry.service_type as ServiceType, t, null, iconSizeClass);
              
              return (
                <div key={entry.id} className="p-4 bg-secondary rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {icon}
                      <span className="font-medium">{t(entry.service_type)}</span>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      entry.status === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {entry.status === 'completed' ? t('completed') : t('declined')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(entry.completion_date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{formatTime(entry.completion_date)}</span>
                    </div>
                  </div>

                  {entry.employee_name && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{t('employee')}: {entry.employee_name}</span>
                    </div>
                  )}

                  {entry.status === 'completed' && entry.total_price && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>{t('total-price')}: {entry.total_price} BGN</span>
                    </div>
                  )}

                  {entry.address_street && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span>{t('address')}: {entry.address_street}</span>
                    </div>
                  )}

                  {entry.latitude && entry.longitude && (
                    <button
                      onClick={() => openGoogleMaps(entry.latitude!, entry.longitude!)}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>{t('view-on-map')}</span>
                    </button>
                  )}

                  {entry.decline_reason && (
                    <div className="text-sm text-red-600">
                      <span>{t('reason')}: {entry.decline_reason}</span>
                    </div>
                  )}
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

export default HistoryTabContent;
