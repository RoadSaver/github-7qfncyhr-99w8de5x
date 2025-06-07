import React, { memo } from 'react';
import ServiceCard from '@/components/service/ServiceCard';

type ServiceType = 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';

interface DashboardServicesProps {
  onServiceSelect: (service: ServiceType) => void;
}

const services: ServiceType[] = [
  'flat-tyre',
  'out-of-fuel', 
  'car-battery',
  'other-car-problems',
  'tow-truck',
  'support'
];

const DashboardServices: React.FC<DashboardServicesProps> = memo(({ onServiceSelect }) => {
  return (
    <div className="container max-w-md mx-auto px-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {services.map((service) => (
          <ServiceCard 
            key={service}
            type={service} 
            onClick={() => onServiceSelect(service)} 
          />
        ))}
      </div>
    </div>
  );
});

DashboardServices.displayName = 'DashboardServices';

export default DashboardServices;