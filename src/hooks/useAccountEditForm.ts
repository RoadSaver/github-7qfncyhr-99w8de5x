
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

interface UseAccountEditFormProps {
  initialData: {
    username: string;
    email: string;
    phoneNumber: string;
  };
  t: (key: string) => string;
}

export const useAccountEditForm = ({ initialData, t }: UseAccountEditFormProps) => {
  const [newUsername, setNewUsername] = useState(initialData.username);
  const [isUsernameChanged, setIsUsernameChanged] = useState(false);

  const [newEmail, setNewEmail] = useState(initialData.email);
  const [isEmailChanged, setIsEmailChanged] = useState(false);

  const [newPhoneNumber, setNewPhoneNumber] = useState(initialData.phoneNumber);
  const [isPhoneNumberChanged, setIsPhoneNumberChanged] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [isNewPasswordChanged, setIsNewPasswordChanged] = useState(false);

  const [showPasswordConfirmDialog, setShowPasswordConfirmDialog] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState<string | null>(null);

  // Reset form when modal opens or data changes
  useEffect(() => {
    setNewUsername(initialData.username);
    setNewEmail(initialData.email);
    setNewPhoneNumber(initialData.phoneNumber);
    setNewPassword('');
    setIsUsernameChanged(false);
    setIsEmailChanged(false);
    setIsPhoneNumberChanged(false);
    setIsNewPasswordChanged(false);
    setPhoneError('');
  }, [initialData]);

  // Track changes
  useEffect(() => {
    setIsUsernameChanged(newUsername !== initialData.username);
  }, [newUsername, initialData.username]);

  useEffect(() => {
    setIsEmailChanged(newEmail !== initialData.email);
  }, [newEmail, initialData.email]);

  useEffect(() => {
    setIsPhoneNumberChanged(newPhoneNumber !== initialData.phoneNumber);
  }, [newPhoneNumber, initialData.phoneNumber]);

  useEffect(() => {
    setIsNewPasswordChanged(newPassword !== '');
  }, [newPassword]);

  const validatePhoneNumber = (phone: string) => {
    if (phone.length !== 13 || !phone.startsWith('+359')) {
      setPhoneError(t('phone-invalid-format'));
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPhoneNumber(value);
    validatePhoneNumber(value);
  };

  const isPasswordValid = (password: string) => {
    return password.length >= 8 && /[A-Z]/.test(password);
  };

  const handleSaveAttempt = (field: string) => {
    if (field === 'phone' && !validatePhoneNumber(newPhoneNumber)) {
      toast({ title: t('phone-error-title'), description: t('phone-invalid-format'), variant: 'destructive' });
      return;
    }
    if (field === 'password' && !isPasswordValid(newPassword)) {
      toast({ title: t('password-error-title'), description: t('password-requirements'), variant: 'destructive' });
      return;
    }
    setFieldToUpdate(field);
    setShowPasswordConfirmDialog(true);
  };

  return {
    newUsername,
    setNewUsername,
    isUsernameChanged,
    
    newEmail,
    setNewEmail,
    isEmailChanged,
    
    newPhoneNumber,
    handlePhoneChange,
    isPhoneNumberChanged,
    phoneError,
    
    newPassword,
    setNewPassword,
    isNewPasswordChanged,
    isPasswordValid,
    
    showPasswordConfirmDialog,
    setShowPasswordConfirmDialog,
    fieldToUpdate,
    setFieldToUpdate,
    
    handleSaveAttempt,
  };
};
