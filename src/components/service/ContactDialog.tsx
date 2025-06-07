
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ContactDialogIcons } from './serviceIcons';

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEmailContact: () => void;
  onPhoneContact: () => void;
  contactOptionsText: string;
  supportDescText: string;
  writeEmailText: string;
  giveCallText: string;
}

const ContactDialog: React.FC<ContactDialogProps> = ({
  open,
  onOpenChange,
  onEmailContact,
  onPhoneContact,
  contactOptionsText,
  supportDescText,
  writeEmailText,
  giveCallText
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle>{contactOptionsText}</DialogTitle>
          <DialogDescription>
            {supportDescText}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Button 
            onClick={onEmailContact}
            className="w-full justify-start bg-green-600 hover:bg-green-700"
          >
            {ContactDialogIcons.email}
            {writeEmailText}
          </Button>
          <Button 
            onClick={onPhoneContact}
            variant="outline"
            className="w-full justify-start"
          >
            {ContactDialogIcons.phone}
            {giveCallText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
