
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ServiceRequestCard from './ServiceRequestCard';
import { ServiceRequest } from '@/types/serviceRequest';

interface ServiceRequestListProps {
  requests: ServiceRequest[];
  onRequestSelect: (request: ServiceRequest) => void;
}

const ServiceRequestList: React.FC<ServiceRequestListProps> = ({
  requests,
  onRequestSelect
}) => {
  return (
    <>
      {requests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground mb-2">No pending service requests</p>
            <p className="text-sm text-muted-foreground">New requests will appear here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map(request => (
            <ServiceRequestCard 
              key={request.id} 
              request={request} 
              onClick={onRequestSelect}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ServiceRequestList;
