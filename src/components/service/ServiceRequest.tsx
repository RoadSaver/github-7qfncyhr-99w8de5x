
import React, { useState, useEffect } from 'react';
import ServiceRequestDialog from './ServiceRequestDialog';
import ServiceRequestForm from './ServiceRequestForm';
import ServiceRequestStatus from './ServiceRequestStatus';
import PriceQuoteDialog from './PriceQuoteDialog';
import { useServiceRequest } from './ServiceRequestLogic';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';

interface ServiceRequestProps {
  type: 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';
  open: boolean;
  onClose: () => void;
  userLocation: { lat: number; lng: number };
  shouldShowPriceQuote?: boolean;
}

const ServiceRequest: React.FC<ServiceRequestProps> = ({ type, open, onClose, userLocation, shouldShowPriceQuote = false }) => {
  const { language, ongoingRequest } = useApp();
  const t = useTranslation(language);
  const {
    message,
    setMessage,
    isSubmitting,
    showRealTimeUpdate,
    showPriceQuote,
    setShowPriceQuote,
    priceQuote,
    employeeLocation,
    status,
    declineReason,
    currentEmployeeName,
    hasDeclinedOnce,
    eta,
    showWaitingForRevision,
    handleSubmit,
    handleAcceptQuote,
    handleDeclineQuote,
    handleCancelRequest,
    handleContactSupport,
    storedSnapshot,
    showStoredPriceQuote
  } = useServiceRequest(type, userLocation);

  const [showCancelConfirmDialog, setShowCancelConfirmDialog] = useState(false);

  // Get the actual price quote and employee name from ongoing request if available
  // Use nullish coalescing (??) instead of logical OR (||) to properly handle 0 values
  const actualPriceQuote = ongoingRequest?.priceQuote ?? priceQuote;
  const actualEmployeeName = ongoingRequest?.employeeName ?? currentEmployeeName;

  // Effect to automatically show price quote if there's an ongoing request with a pending status
  // or if explicitly requested via shouldShowPriceQuote prop
  useEffect(() => {
    if (open && ongoingRequest && ongoingRequest.status === 'pending') {
      if (shouldShowPriceQuote || (ongoingRequest.priceQuote !== undefined && ongoingRequest.priceQuote >= 0)) {
        setShowPriceQuote(true);
      }
    }
  }, [open, ongoingRequest, shouldShowPriceQuote, setShowPriceQuote]);

  // Only close dialog when service is completed (not when there's no ongoing request)
  useEffect(() => {
    if (ongoingRequest === null && status === 'accepted' && open) {
      // Service was completed, close the dialog
      onClose();
    }
  }, [ongoingRequest, status, open, onClose]);

  const handleAttemptClose = () => {
    // If price quote is showing, just close the dialog but keep the request in price quote state
    if (showPriceQuote) {
      onClose();
      return;
    }
    
    // Only show confirmation dialog for pending requests (not in price quote state)
    if (status === 'pending') {
      setShowCancelConfirmDialog(true);
    } else {
      onClose(); // Close directly for accepted, declined, or initial state
    }
  };

  const confirmCancelRequest = () => {
    onClose(); 
    setShowCancelConfirmDialog(false);
  };

  const handleDecline = (isSecondDecline: boolean = false) => {
    // Use the hasDeclinedOnce from the centralized state
    if (!hasDeclinedOnce && !isSecondDecline) {
      // First decline - this will be handled by handleDeclineQuote
      handleDeclineQuote(false);
    } else {
      // This is the second decline - call the special decline logic
      handleDeclineQuote(true);
    }
  };

  const handlePriceQuoteClose = () => {
    // Close the price quote dialog but keep the ongoing request active in price quote state
    // When user reopens from ongoing requests, they'll see the price quote again
    onClose();
  };

  const handleReviewPriceQuote = () => {
    setShowPriceQuote(true);
  };

  return (
    <>
      <ServiceRequestDialog
        type={type}
        open={open && !showPriceQuote && !showWaitingForRevision}
        onClose={handleAttemptClose}
        showRealTimeUpdate={showRealTimeUpdate}
      >
        {!showRealTimeUpdate ? (
          <ServiceRequestForm
            type={type}
            message={message}
            onMessageChange={setMessage}
            userLocation={userLocation}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onCancel={handleAttemptClose}
          />
        ) : (
          <ServiceRequestStatus
            message={message}
            status={status}
            declineReason={declineReason}
            userLocation={userLocation}
            employeeLocation={employeeLocation}
            eta={eta}
            employeeName={actualEmployeeName}
            onContactSupport={handleContactSupport}
            onClose={handleAttemptClose}
            onReviewPriceQuote={handleReviewPriceQuote}
            hasPriceQuote={actualPriceQuote >= 0}
            hasStoredSnapshot={!!storedSnapshot}
            onShowStoredPriceQuote={showStoredPriceQuote}
          />
        )}
      </ServiceRequestDialog>

      <PriceQuoteDialog
        open={showPriceQuote}
        onClose={handlePriceQuoteClose}
        serviceType={type}
        priceQuote={actualPriceQuote}
        onAccept={handleAcceptQuote}
        onDecline={handleDecline}
        onCancelRequest={handleCancelRequest}
        hasDeclinedOnce={hasDeclinedOnce}
        employeeName={actualEmployeeName}
        showWaitingForRevision={showWaitingForRevision}
      />

      {showCancelConfirmDialog && (
        <AlertDialog open={showCancelConfirmDialog} onOpenChange={setShowCancelConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('confirm-cancellation-title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('confirm-cancellation-desc')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowCancelConfirmDialog(false)}>{t('no')}</AlertDialogCancel>
              <AlertDialogAction onClick={confirmCancelRequest} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                {t('yes-cancel')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default ServiceRequest;
