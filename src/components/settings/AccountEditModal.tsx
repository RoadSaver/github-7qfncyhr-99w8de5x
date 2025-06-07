
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from '@/utils/translations';
import PasswordConfirmDialog from './dialogs/PasswordConfirmDialog';
import { useAccountEditForm } from '@/hooks/useAccountEditForm';
import AccountEditFormFields from './form-sections/AccountEditFormFields';

interface AccountEditModalProps {
  open: boolean;
  onClose: () => void;
  currentLanguage: 'en' | 'bg';
  initialData: {
    username: string;
    email: string;
    phoneNumber: string;
  };
  currentPasswordForVerification: string;
  onUsernameSave: (username: string) => void;
  onEmailSave: (email: string) => void;
  onPhoneNumberSave: (phone: string) => void;
  onPasswordSave: (password: string) => void;
}

const AccountEditModal: React.FC<AccountEditModalProps> = ({
  open,
  onClose,
  currentLanguage,
  initialData,
  currentPasswordForVerification,
  onUsernameSave,
  onEmailSave,
  onPhoneNumberSave,
  onPasswordSave,
}) => {
  const t = useTranslation(currentLanguage);
  const formState = useAccountEditForm({ initialData, t });
  
  const {
    newUsername,
    newEmail,
    newPhoneNumber,
    newPassword,
    showPasswordConfirmDialog,
    setShowPasswordConfirmDialog,
    fieldToUpdate,
    setFieldToUpdate,
  } = formState;

  const executeSave = () => {
    if (fieldToUpdate === 'username') {
      onUsernameSave(newUsername);
      toast({ title: t('update-success-title'), description: t('username-update-success') });
    } else if (fieldToUpdate === 'email') {
      onEmailSave(newEmail);
      toast({ title: t('update-success-title'), description: t('email-update-success') });
    } else if (fieldToUpdate === 'phone') {
      onPhoneNumberSave(newPhoneNumber);
      toast({ title: t('update-success-title'), description: t('phone-update-success') });
    } else if (fieldToUpdate === 'password') {
      onPasswordSave(newPassword);
      toast({ title: t('update-success-title'), description: t('password-update-success') });
    }
    setShowPasswordConfirmDialog(false);
    setFieldToUpdate(null);
  };
  
  const handlePasswordDialogCancel = () => {
    setShowPasswordConfirmDialog(false);
    setFieldToUpdate(null);
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="bg-background rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('change-account-info')}</DialogTitle>
        </DialogHeader>
        
        <AccountEditFormFields 
          t={t} 
          formState={formState} 
          onClose={onClose} 
        />
      </DialogContent>

      <PasswordConfirmDialog
        open={showPasswordConfirmDialog}
        onOpenChange={setShowPasswordConfirmDialog}
        t={t}
        currentPasswordForVerification={currentPasswordForVerification}
        onConfirm={executeSave}
        onCancel={handlePasswordDialogCancel}
      />
    </Dialog>
  );
};

export default AccountEditModal;
