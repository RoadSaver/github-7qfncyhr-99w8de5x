
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GoogleMap from '@/components/GoogleMap';
import { ServiceRequest } from '@/types/serviceRequest';
import { useTranslation } from '@/utils/translations';

interface RequestDetailsDialogProps {
  request: ServiceRequest | null;
  employeeLocation: { lat: number; lng: number };
  onClose: () => void;
  onAccept: (requestId: string, priceQuote: number) => void;
  onDecline: () => void;
  getRequestTitle: (type: string) => string;
  language: 'en' | 'bg';
}

const RequestDetailsDialog: React.FC<RequestDetailsDialogProps> = ({
  request,
  employeeLocation,
  onClose,
  onAccept,
  onDecline,
  getRequestTitle,
  language
}) => {
  const t = useTranslation(language);
  const [priceQuote, setPriceQuote] = useState<string>('');
  
  if (!request) return null;

  // Translate request type title
  const translatedTitle = t(request.type) || getRequestTitle(request.type);

  const handleAccept = () => {
    const price = parseFloat(priceQuote);
    if (!priceQuote || isNaN(price) || price <= 0) {
      alert('Please enter a valid price quote');
      return;
    }
    onAccept(request.id, price);
  };

  return (
    <Dialog open={!!request} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{translatedTitle}</DialogTitle>
          <DialogDescription>
            {t('from')} {request.username} • {new Date(request.timestamp).toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="rounded-md bg-secondary p-3">
            <p className="text-sm">{request.message}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t('customer-location')}</h4>
            <GoogleMap 
              userLocation={request.location}
              employeeLocation={employeeLocation}
              height="200px" 
            />
          </div>

          {request.status === 'pending' && (
            <div className="space-y-2">
              <Label htmlFor="price-quote">Price Quote (BGN)</Label>
              <Input
                id="price-quote"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter price quote..."
                value={priceQuote}
                onChange={(e) => setPriceQuote(e.target.value)}
              />
            </div>
          )}
        </div>
        
        <DialogFooter className="flex gap-2 sm:justify-between">
          {request.status === 'pending' ? (
            <>
              <Button 
                variant="outline" 
                onClick={onDecline}
                className="border-roadsaver-red text-roadsaver-red hover:bg-red-50"
              >
                {t('decline')}
              </Button>
              <Button 
                onClick={handleAccept}
                className="bg-roadsaver-green text-white hover:bg-roadsaver-green/90"
              >
                Accept And Send Price Quote
              </Button>
            </>
          ) : (
            <Button onClick={onClose}>
              {t('close')}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsDialog;
