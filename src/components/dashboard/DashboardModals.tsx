
import React from 'react';
import { Button } from '@/components/ui/button';
import ServiceRequest from '@/components/service/ServiceRequest';
import EmergencyServices from '@/components/service/EmergencyServices';
import SettingsMenu from '@/components/settings/SettingsMenu';
import OngoingRequestsDialog from '@/components/service/OngoingRequestsDialog';
import MapInput from '@/components/MapInput';

type ServiceType = 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';

interface DashboardModalsProps {
  selectedService: ServiceType | null;
  showEmergencyServices: boolean;
  showSettings: boolean;
  showLocationPicker: boolean;
  showOngoingRequests: boolean;
  userLocation: { lat: number; lng: number };
  language: 'en' | 'bg';
  t: (key: string) => string;
  onServiceRequestClose: () => void;
  onEmergencyServicesClose: () => void;
  onSettingsClose: () => void;
  onLocationPickerClose: () => void;
  onOngoingRequestsClose: () => void;
  onLocationChange: (location: { lat: number; lng: number }) => void;
  onLanguageChange: (language: 'en' | 'bg') => void;
  onViewRequest: () => void;
  onReviewPriceQuote: () => void;
  shouldShowPriceQuote?: boolean;
}

const DashboardModals: React.FC<DashboardModalsProps> = ({
  selectedService,
  showEmergencyServices,
  showSettings,
  showLocationPicker,
  showOngoingRequests,
  userLocation,
  language,
  t,
  onServiceRequestClose,
  onEmergencyServicesClose,
  onSettingsClose,
  onLocationPickerClose,
  onOngoingRequestsClose,
  onLocationChange,
  onLanguageChange,
  onViewRequest,
  onReviewPriceQuote,
  shouldShowPriceQuote = false
}) => {
  const handleViewRequest = () => {
    // Close ongoing requests dialog and open the service request status
    onOngoingRequestsClose();
    onViewRequest();
  };

  const handleReviewPriceQuote = () => {
    // Close ongoing requests dialog and open the price quote
    onOngoingRequestsClose();
    onReviewPriceQuote();
  };

  return (
    <>
      {/* Service Request Modal */}
      {selectedService && (
        <ServiceRequest
          type={selectedService}
          open={!!selectedService}
          onClose={onServiceRequestClose}
          userLocation={userLocation}
          shouldShowPriceQuote={shouldShowPriceQuote}
        />
      )}
      
      {/* Emergency Services Modal */}
      {showEmergencyServices && (
        <EmergencyServices
          open={showEmergencyServices}
          onClose={onEmergencyServicesClose}
        />
      )}
      
      {/* Settings Modal */}
      {showSettings && (
        <SettingsMenu
          open={showSettings}
          onClose={onSettingsClose}
          onLanguageChange={onLanguageChange}
          currentLanguage={language}
        />
      )}
      
      {/* Ongoing Requests Modal */}
      {showOngoingRequests && (
        <OngoingRequestsDialog
          open={showOngoingRequests}
          onClose={onOngoingRequestsClose}
          onViewRequest={handleViewRequest}
          onReviewPriceQuote={handleReviewPriceQuote}
        />
      )}
      
      {/* Location Picker Modal */}
      {showLocationPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg shadow-lg p-4 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {t('update-location')}
            </h2>
            <MapInput 
              onLocationSelect={onLocationChange} 
              initialLocation={userLocation} 
            />
            <Button 
              variant="outline" 
              onClick={onLocationPickerClose}
              className="mt-4 w-full"
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardModals;
