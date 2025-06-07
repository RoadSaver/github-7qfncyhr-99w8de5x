
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from '@/utils/translations';

interface EmployeePriceAdjustDialogProps {
  open: boolean;
  onClose: () => void;
  currentPrice: number;
  onSendQuote: (newPrice: number) => void;
  language: 'en' | 'bg';
  isRevision?: boolean;
  customerDeclined?: boolean;
}

const EmployeePriceAdjustDialog: React.FC<EmployeePriceAdjustDialogProps> = ({
  open,
  onClose,
  currentPrice,
  onSendQuote,
  language,
  isRevision = false,
  customerDeclined = false
}) => {
  const t = useTranslation(language);
  const [newPrice, setNewPrice] = useState<string>(currentPrice.toString());

  const handleSendQuote = () => {
    const price = parseFloat(newPrice);
    if (!newPrice || isNaN(price) || price <= 0) {
      alert('Please enter a valid price quote');
      return;
    }
    onSendQuote(price);
    onClose();
  };

  const handleDeclineRevision = () => {
    // Employee chooses not to revise the quote
    onClose();
  };

  const title = customerDeclined 
    ? 'Customer Declined - Send Revised Quote?' 
    : isRevision 
    ? 'Revise Price Quote' 
    : 'Adjust Price Quote';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {customerDeclined && (
            <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                The customer has declined your quote of {currentPrice.toFixed(2)} BGN. 
                You have one opportunity to send a revised quote.
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="new-price">
              {customerDeclined ? 'Revised Price Quote (BGN)' : 'New Price Quote (BGN)'}
            </Label>
            <Input
              id="new-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter new price quote..."
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={customerDeclined ? handleDeclineRevision : onClose}
          >
            {customerDeclined ? "Don't Revise" : 'Cancel'}
          </Button>
          <Button 
            onClick={handleSendQuote}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {customerDeclined ? 'Send Revised Quote' : 'Send Price Quote'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeePriceAdjustDialog;
