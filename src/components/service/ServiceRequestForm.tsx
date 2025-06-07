
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import GoogleMap from '@/components/GoogleMap';

interface ServiceRequestFormProps {
  type: 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';
  message: string;
  onMessageChange: (message: string) => void;
  userLocation: { lat: number; lng: number };
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const serviceMessages = {
  'flat-tyre': 'I have a flat tyre and need assistance',
  'out-of-fuel': 'I am out of fuel and need assistance',
  'car-battery': 'My car battery is dead. I need assistance.',
  'tow-truck': 'I have a major problem with my car and need a tow truck',
  'other-car-problems': '',
  'emergency': 'I need emergency assistance immediately',
  'support': 'I need to speak with customer support',
};

const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({
  type,
  message,
  onMessageChange,
  userLocation,
  isSubmitting,
  onSubmit,
  onCancel
}) => {
  const requiresDescription = type === 'other-car-problems';
  const messageMinLength = requiresDescription ? 20 : 0;
  const messageMaxLength = 300;

  return (
    <>
      {requiresDescription && (
        <div className="space-y-2">
          <Textarea
            placeholder="Describe your issue (20-300 characters)"
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            className="min-h-[100px]"
          />
          <p className={`text-xs ${message.length < messageMinLength || message.length > messageMaxLength ? 'text-red-500' : 'text-muted-foreground'}`}>
            {message.length}/{messageMaxLength} characters
          </p>
        </div>
      )}
      
      <GoogleMap userLocation={userLocation} height="200px" />
      
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button 
          onClick={onSubmit} 
          disabled={isSubmitting || (requiresDescription && (message.length < messageMinLength || message.length > messageMaxLength))}
          className="bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? "Sending..." : "Send Request"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default ServiceRequestForm;
