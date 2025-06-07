
import React from 'react';
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

interface DeclineConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeclineConfirmDialog: React.FC<DeclineConfirmDialogProps> = ({
  open,
  onOpenChange,
  employeeName,
  onConfirm,
  onCancel
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Decline Price Quote?</AlertDialogTitle>
          <AlertDialogDescription>
            {employeeName} will be notified and will send you a revised quote. This is their only opportunity to revise.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            Keep Current Quote
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            Yes, Decline Quote
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeclineConfirmDialog;
