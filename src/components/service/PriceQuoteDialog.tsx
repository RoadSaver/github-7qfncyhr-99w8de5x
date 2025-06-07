
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WaitingForRevisionDialog from './price-quote/WaitingForRevisionDialog';
import PriceQuoteContent from './price-quote/PriceQuoteContent';
import DeclineConfirmDialog from './price-quote/DeclineConfirmDialog';
import CancelConfirmDialog from './price-quote/CancelConfirmDialog';

interface PriceQuoteDialogProps {
  open: boolean;
  onClose: () => void;
  serviceType: string;
  priceQuote: number;
  onAccept: () => void;
  onDecline: (isSecondDecline?: boolean) => void;
  onCancelRequest: () => void;
  hasDeclinedOnce?: boolean;
  employeeName?: string;
  showWaitingForRevision?: boolean;
}

const PriceQuoteDialog: React.FC<PriceQuoteDialogProps> = ({
  open,
  onClose,
  serviceType,
  priceQuote,
  onAccept,
  onDecline,
  onCancelRequest,
  hasDeclinedOnce = false,
  employeeName = '',
  showWaitingForRevision = false
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showDeclineConfirm, setShowDeclineConfirm] = useState(false);

  console.log('PriceQuoteDialog props:', { 
    open, 
    serviceType, 
    priceQuote, 
    employeeName, 
    hasDeclinedOnce,
    showWaitingForRevision 
  });

  const handleCancelRequest = () => {
    console.log('handleCancelRequest called');
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    console.log('confirmCancel called');
    onCancelRequest();
    setShowCancelConfirm(false);
    onClose();
  };

  const handleDecline = () => {
    if (!hasDeclinedOnce) {
      // First decline - show confirmation
      setShowDeclineConfirm(true);
    } else {
      // Second decline - direct decline (blacklist employee)
      onDecline(true);
    }
  };

  const confirmDecline = () => {
    console.log('confirmDecline called - first decline');
    setShowDeclineConfirm(false);
    onDecline(false); // First decline
  };

  const handleAccept = () => {
    console.log('handleAccept called');
    onAccept();
  };

  // Allow dialog to close when clicking outside or pressing escape
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // Show waiting for revision dialog
  if (showWaitingForRevision) {
    return (
      <WaitingForRevisionDialog
        open={open}
        onOpenChange={handleOpenChange}
        employeeName={employeeName}
        onCancelRequest={handleCancelRequest}
      />
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {hasDeclinedOnce ? 'Revised Price Quote' : 'Price Quote Received'}
            </DialogTitle>
          </DialogHeader>
          <PriceQuoteContent
            serviceType={serviceType}
            priceQuote={priceQuote}
            employeeName={employeeName}
            hasDeclinedOnce={hasDeclinedOnce}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onCancelRequest={handleCancelRequest}
          />
        </DialogContent>
      </Dialog>
      
      <DeclineConfirmDialog
        open={showDeclineConfirm}
        onOpenChange={setShowDeclineConfirm}
        employeeName={employeeName}
        onConfirm={confirmDecline}
        onCancel={() => setShowDeclineConfirm(false)}
      />
      
      <CancelConfirmDialog
        open={showCancelConfirm}
        onOpenChange={setShowCancelConfirm}
        onConfirm={confirmCancel}
        onCancel={() => setShowCancelConfirm(false)}
      />
    </>
  );
};

export default PriceQuoteDialog;
