
import React from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { Clock, CheckCircle, XCircle, Phone, FileText } from 'lucide-react';
import GoogleMap from '@/components/GoogleMap';

interface ServiceRequestStatusProps {
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  declineReason: string;
  userLocation: { lat: number; lng: number };
  employeeLocation?: { lat: number; lng: number };
  onContactSupport: () => void;
  onClose: () => void;
  onReviewPriceQuote?: () => void;
  hasPriceQuote?: boolean;
  hasStoredSnapshot?: boolean;
  onShowStoredPriceQuote?: () => void;
  eta?: string | null;
  employeeName?: string;
}

const ServiceRequestStatus: React.FC<ServiceRequestStatusProps> = ({
  message,
  status,
  declineReason,
  userLocation,
  employeeLocation,
  onContactSupport,
  onClose,
  onReviewPriceQuote,
  hasPriceQuote = false,
  hasStoredSnapshot = false,
  onShowStoredPriceQuote,
  eta,
  employeeName = ''
}) => {
  const { language } = useApp();
  const t = useTranslation(language);

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-600" />;
      case 'accepted':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'declined':
        return <XCircle className="h-6 w-6 text-red-600" />;
      default:
        return <Clock className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Service Request Status</h2>
        <div className="flex items-center justify-center gap-3">
          {getStatusIcon()}
          <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
        
        {/* Employee information */}
        {employeeName && status !== 'declined' && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">
              Assigned Employee: <span className="font-medium">{employeeName}</span>
            </p>
          </div>
        )}
        
        {/* Review Price Quote buttons */}
        <div className="mt-4 space-y-2">
          {status === 'pending' && hasPriceQuote && onReviewPriceQuote && (
            <Button 
              onClick={onReviewPriceQuote}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 w-full"
            >
              Review the price and decide
            </Button>
          )}
          
          {hasStoredSnapshot && onShowStoredPriceQuote && (
            <Button 
              onClick={onShowStoredPriceQuote}
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-2 w-full flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              View Stored Price Quote
            </Button>
          )}
        </div>
      </div>

      {/* Request Details */}
      <div className="bg-secondary rounded-lg p-4">
        <h3 className="font-semibold mb-2">Request Details</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>

      {/* Google Maps showing locations */}
      <div className="bg-secondary rounded-lg p-4">
        <h3 className="font-semibold mb-3">Live Location Tracking</h3>
        <div className="rounded-lg overflow-hidden">
          <GoogleMap
            userLocation={userLocation}
            employeeLocation={employeeLocation}
            height="250px"
          />
        </div>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Your location</span>
          </div>
          {employeeLocation && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>{employeeName ? `${employeeName}'s location` : 'Employee location'}</span>
            </div>
          )}
          {/* Show ETA if available */}
          {employeeLocation && eta && status === 'accepted' && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-700">ETA:</span>
              <span>{eta}</span>
            </div>
          )}
        </div>
      </div>

      {/* Status-specific content */}
      {status === 'declined' && declineReason && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">Service Unavailable</h3>
          <p className="text-sm text-red-700">{declineReason}</p>
        </div>
      )}

      {status === 'accepted' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">Service Accepted</h3>
          <p className="text-sm text-green-700">
            {employeeName} has accepted your request and is on the way to your location.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button 
          onClick={onContactSupport}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Phone className="h-4 w-4" />
          Contact Support
        </Button>
        
        <Button 
          onClick={onClose}
          variant="secondary"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ServiceRequestStatus;
