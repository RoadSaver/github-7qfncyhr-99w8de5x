
import { ServiceRequest } from "@/types/serviceRequest";

export const getRequestTitle = (type: string) => {
  switch (type) {
    case 'flat-tyre':
      return 'Flat Tyre Assistance';
    case 'out-of-fuel':
      return 'Out of Fuel';
    case 'small-issue':
      return 'Small Issue';
    case 'tow-truck':
      return 'Tow Truck Request';
    case 'emergency':
      return 'Emergency Assistance';
    case 'support':
      return 'Contact Support';
    default:
      return 'Service Request';
  }
};

export const generateDemoRequests = (): ServiceRequest[] => {
  return [
    {
      id: '1',
      type: 'flat-tyre',
      message: 'I have a flat tyre and need assistance',
      location: { lat: 42.698, lng: 23.319 },
      status: 'pending',
      timestamp: new Date().toISOString(),
      username: 'user123'
    },
    {
      id: '2',
      type: 'out-of-fuel',
      message: 'I am out of fuel and need assistance',
      location: { lat: 42.701, lng: 23.322 },
      status: 'pending',
      timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
      username: 'driver456'
    },
    {
      id: '3',
      type: 'tow-truck',
      message: 'I have a major problem with my car and need a tow truck',
      location: { lat: 42.693, lng: 23.315 },
      status: 'pending',
      timestamp: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
      username: 'traveler789'
    }
  ];
};
