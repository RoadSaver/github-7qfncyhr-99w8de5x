
import React from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import { Phone } from 'lucide-react';
import GoogleMap from '@/components/GoogleMap';

interface EmployeeLocationDialogProps {
  open: boolean;
  onClose: () => void;
}

const EmployeeLocationDialog: React.FC<EmployeeLocationDialogProps> = ({ open, onClose }) => {
  const { language, ongoingRequest, userLocation } = useApp();
  const t = useTranslation(language);

  const handleCallEmployee = () => {
    if (ongoingRequest?.employeePhone) {
      window.location.href = `tel:${ongoingRequest.employeePhone}`;
    }
  };

  if (!ongoingRequest) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="space-y-4">
          {/* Request Info */}
          <div className="bg-gray-50 p-3 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{t(ongoingRequest.type)}</h3>
              <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                {t(ongoingRequest.status)}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Started: {ongoingRequest.timestamp}
            </p>
            <p className="text-sm text-gray-600">
              Location: {ongoingRequest.location}
            </p>
          </div>

          {/* Google Map with both user and employee locations */}
          <div className="w-full">
            <GoogleMap
              userLocation={userLocation}
              employeeLocation={ongoingRequest.employeeLocation}
              height="300px"
            />
          </div>

          {/* Employee Info and Actions */}
          {ongoingRequest.status === 'accepted' && ongoingRequest.employeeName && (
            <div className="bg-green-50 p-3 rounded-lg space-y-3">
              <p className="text-sm font-medium text-green-700">
                {t('employee-assigned')}: {ongoingRequest.employeeName}
              </p>
              {ongoingRequest.employeePhone && (
                <Button 
                  onClick={handleCallEmployee}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {t('call-employee')}
                </Button>
              )}
            </div>
          )}

          {/* Close Button */}
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full"
          >
            {t('close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeLocationDialog;
