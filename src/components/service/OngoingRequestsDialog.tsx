
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { Clock, MapPin, Phone, TouchpadOff } from 'lucide-react';
import EmployeeLocationDialog from './EmployeeLocationDialog';

interface OngoingRequestsDialogProps {
  open: boolean;
  onClose: () => void;
  onViewRequest: () => void;
  onReviewPriceQuote: () => void;
}

const OngoingRequestsDialog: React.FC<OngoingRequestsDialogProps> = ({ 
  open, 
  onClose, 
  onViewRequest,
  onReviewPriceQuote
}) => {
  const { language, ongoingRequest } = useApp();
  const t = useTranslation(language);
  const [showEmployeeLocation, setShowEmployeeLocation] = useState(false);

  const handleCallEmployee = () => {
    if (ongoingRequest?.employeePhone) {
      window.location.href = `tel:${ongoingRequest.employeePhone}`;
    }
  };

  const openEmployeeLocationDialog = () => {
    setShowEmployeeLocation(true);
  };

  const handleRequestClick = () => {
    onViewRequest();
    onClose();
  };

  const handleReviewPriceQuote = () => {
    onReviewPriceQuote();
    onClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {t('Ongoing Requests')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {!ongoingRequest ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>{t('No ongoing requests')}</p>
              </div>
            ) : (
              <div className="relative">
                <div 
                  className="border rounded-lg p-4 space-y-3 cursor-pointer hover:bg-gray-50 transition-colors relative" 
                  onClick={handleRequestClick}
                >
                  {/* Animated touch hint */}
                  <div className="absolute top-2 right-2 animate-bounce">
                    <TouchpadOff className="h-5 w-5 text-blue-500 animate-pulse" />
                  </div>
                  
                  <div className="flex items-center justify-between pr-8">
                    <h3 className="font-medium">{t(ongoingRequest.type)}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      ongoingRequest.status === 'accepted' 
                        ? 'bg-green-100 text-green-800' 
                        : ongoingRequest.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {t(ongoingRequest.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {ongoingRequest.timestamp}
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {ongoingRequest.location}
                  </div>

                  {ongoingRequest.status === 'accepted' && ongoingRequest.employeeName && (
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-green-600 mb-2">
                        {t('employee-assigned')}: {ongoingRequest.employeeName}
                      </p>
                      {ongoingRequest.employeePhone && (
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCallEmployee();
                          }}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {t('call-employee')}
                        </Button>
                      )}
                    </div>
                  )}
                  
                  {/* Hint text */}
                  <div className="text-xs text-blue-600 text-center pt-2 border-t border-blue-100">
                    {t('tap-to-view-details')} 👆
                  </div>
                </div>

                {ongoingRequest.status === 'pending' && (
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReviewPriceQuote();
                    }}
                    className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {t('review-price-and-decide')}
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Employee Location Dialog */}
      <EmployeeLocationDialog
        open={showEmployeeLocation}
        onClose={() => setShowEmployeeLocation(false)}
      />
    </>
  );
};

export default OngoingRequestsDialog;
