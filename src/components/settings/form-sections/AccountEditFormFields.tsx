import React from 'react';
import { Button } from "@/components/ui/button";
import AccountEditFormField from '../form-fields/AccountEditFormField';
import PasswordEditField from '../form-fields/PasswordEditField';

interface AccountEditFormFieldsProps {
  t: (key: string) => string;
  formState: ReturnType<typeof import('@/hooks/useAccountEditForm').useAccountEditForm>;
  onClose: () => void;
}

const AccountEditFormFields: React.FC<AccountEditFormFieldsProps> = ({
  t,
  formState,
  onClose,
}) => {
  const {
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
    
    handleSaveAttempt,
  } = formState;

  return (
    <div className="space-y-4 mt-4">
      <AccountEditFormField
        id="emailEdit"
        label={t('change-email-colon')}
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        onSave={() => handleSaveAttempt('email')}
        isChanged={isEmailChanged}
        type="email"
        t={t}
      />
      
      <AccountEditFormField
        id="phoneEdit"
        label={t('change-phone-colon')}
        value={newPhoneNumber}
        onChange={handlePhoneChange}
        onSave={() => handleSaveAttempt('phone')}
        isChanged={isPhoneNumberChanged}
        saveButtonDisabled={!!phoneError}
        placeholder={t('phone-placeholder')}
        error={phoneError}
        t={t}
      />
      
      <PasswordEditField
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        onSave={() => handleSaveAttempt('password')}
        isChanged={isNewPasswordChanged}
        isValid={isPasswordValid(newPassword)}
        t={t}
      />
      
      <div className="flex space-x-2 pt-4">
        <Button
          onClick={onClose}
          variant="outline"
          className="flex-1"
        >
          {t('cancel')}
        </Button>
      </div>
    </div>
  );
};

export default AccountEditFormFields;
