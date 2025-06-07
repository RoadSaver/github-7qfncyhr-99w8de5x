
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Ambulance } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';

interface EmergencyServicesProps {
  open: boolean;
  onClose: () => void;
}

const EmergencyServices: React.FC<EmergencyServicesProps> = ({ open, onClose }) => {
  const [isCallButtonPressed, setIsCallButtonPressed] = useState(false);
  const { language } = useApp();
  const t = useTranslation(language);
  
  const handleEmergencyCall = () => {
    const phoneNumber = '112'; // European emergency number
    
    toast({
      title: t('calling-emergency'),
      description: t('connecting-emergency'),
    });
    
    setIsCallButtonPressed(true);
    
    // Simulate call initiation
    setTimeout(() => {
      window.location.href = `tel:${phoneNumber}`;
      setIsCallButtonPressed(false);
    }, 500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{t('emergency-services')}</DialogTitle>
          <DialogDescription className="text-center">
            {t('emergency-services-desc')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <button
            className="bg-red-600 hover:bg-red-700 text-white p-6 rounded-lg w-full flex items-center justify-between shadow-md transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
            onClick={handleEmergencyCall}
            disabled={isCallButtonPressed}
          >
            <div className="flex items-center">
              <Ambulance className="mr-3 h-6 w-6" />
              <span>{t('national-emergency')}</span>
            </div>
            <span className="text-sm opacity-80">{t('emergency-number')}</span>
          </button>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full"
          >
            {t('cancel')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyServices;
