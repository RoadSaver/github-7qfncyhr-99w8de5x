
import React, { useState, useEffect } from 'react';
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
import { Input } from "@/components/ui/input";

interface PasswordConfirmDialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  t: (key: string) => string;
  currentPasswordForVerification: string;
  onConfirm: () => void; // Called when password is correct and user confirms
  onCancel: () => void;  // Called when user cancels the dialog
}

const PasswordConfirmDialog: React.FC<PasswordConfirmDialogProps> = ({
  open,
  onOpenChange,
  t,
  currentPasswordForVerification,
  onConfirm,
  onCancel,
}) => {
  const [passwordToConfirm, setPasswordToConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  useEffect(() => {
    if (open) {
      setPasswordToConfirm('');
      setPasswordConfirmError('');
    }
  }, [open]);

  const handleConfirm = () => {
    if (passwordToConfirm !== currentPasswordForVerification) {
      setPasswordConfirmError(t('incorrect-password-error'));
      return;
    }
    setPasswordConfirmError('');
    onConfirm(); // Proceed with the action in the parent
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('current-password-prompt-title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('current-password-prompt-desc')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder={t('enter-current-password')}
            value={passwordToConfirm}
            onChange={(e) => {
              setPasswordToConfirm(e.target.value);
              setPasswordConfirmError(''); // Clear error on change
            }}
          />
          {passwordConfirmError && <p className="text-red-500 text-sm">{passwordConfirmError}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!passwordToConfirm}
            className="bg-green-600 hover:bg-green-700"
          >
            {t('save')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasswordConfirmDialog;
