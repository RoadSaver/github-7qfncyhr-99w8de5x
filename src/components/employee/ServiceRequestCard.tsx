
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceRequest } from '@/types/serviceRequest';
import { useTranslation } from '@/utils/translations';
import { useApp } from '@/contexts/AppContext';
import { getServiceIconAndTitle, ServiceType } from '@/components/service/serviceIcons';

interface ServiceRequestCardProps {
  request: ServiceRequest;
  onClick: (request: ServiceRequest) => void;
}

const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({ request, onClick }) => {
  const { language } = useApp();
  const t = useTranslation(language);
  
  const getRequestTitle = (type: string) => {
    // First try to use translation key based on the type
    const translatedType = t(type);
    if (translatedType !== type) {
      return translatedType;
    }
    
    // Fallback to hardcoded translations
    switch (type) {
      case 'flat-tyre':
        return t('flat-tyre-assistance');
      case 'out-of-fuel':
        return t('out-of-fuel');
      case 'small-issue':
        return t('small-issue');
      case 'tow-truck':
        return t('tow-truck-request');
      default:
        return t('service-request');
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'accepted':
        return t('accepted-status');
      case 'declined':
        return t('declined-status');
      default:
        return t('new');
    }
  };

  // Get the service icon using the same logic as user version
  const iconSizeClass = "h-6 w-6";
  const { icon } = getServiceIconAndTitle(request.type as ServiceType, t, null, iconSizeClass);

  return (
    <Card 
      className={`cursor-pointer border-l-4 ${
        request.status === 'accepted' ? 'border-l-green-500' : 
        request.status === 'declined' ? 'border-l-red-500' : 
        'border-l-amber-500'
      }`}
      onClick={() => onClick(request)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{getRequestTitle(request.type)}</CardTitle>
              <CardDescription>{new Date(request.timestamp).toLocaleTimeString()}</CardDescription>
            </div>
          </div>
          <div className="flex items-center">
            <span className={`text-sm font-medium rounded-full px-2 py-1 ${
              request.status === 'accepted' ? 'bg-green-100 text-green-800' : 
              request.status === 'declined' ? 'bg-red-100 text-red-800' : 
              'bg-amber-100 text-amber-800 animate-pulse-subtle'
            }`}>
              {getStatusLabel(request.status)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm mb-2 line-clamp-1">{request.message}</p>
        <p className="text-xs text-muted-foreground">{t('from')}: {request.username}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceRequestCard;
