import React from 'react';
import { AlertCircle, CheckCircle2 } from "lucide-react";
import RegisterFormFieldInput from './RegisterFormFieldInput';
import RegisterGenderSelector from './RegisterGenderSelector';
import SecretQuestionField from './SecretQuestionField';

interface RegisterFormFieldsProps {
  // User validation fields
  username: string;
  setUsername: (value: string) => void;
  usernameError: string;
  isUsernameValid: boolean;
  
  email: string;
  setEmail: (value: string) => void;
  emailError: string;
  isEmailValid: boolean;
  
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  phoneError: string;
  isPhoneValid: boolean;
  
  password: string;
  setPassword: (value: string) => void;
  passwordError: string;
  isPasswordValid: boolean;
  showPassword: boolean;
  handleToggleShowPassword: () => void;
  
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  confirmPasswordError: string;
  isConfirmPasswordValid: boolean;
  
  gender: string;
  setGender: (value: string) => void;
  
  // Secret question fields
  secretQuestion1: string;
  handleSecretQuestion1Change: (value: string) => void;
  secretAnswer1: string;
  setSecretAnswer1: (value: string) => void;
  secretQuestion1Error: string;
  secretAnswer1Error: string;
  isSecretQuestion1Valid: boolean;
  isSecretAnswer1Valid: boolean;
  customQuestion1: string;
  handleCustomQuestion1Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customQuestion1Error: string;
  isCustomQuestion1Valid: boolean;
  
  secretQuestion2: string;
  handleSecretQuestion2Change: (value: string) => void;
  secretAnswer2: string;
  setSecretAnswer2: (value: string) => void;
  secretQuestion2Error: string;
  secretAnswer2Error: string;
  isSecretQuestion2Valid: boolean;
  isSecretAnswer2Valid: boolean;
  customQuestion2: string;
  handleCustomQuestion2Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customQuestion2Error: string;
  isCustomQuestion2Valid: boolean;
  
  t: (key: string) => string;
}

const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({
  username, setUsername, usernameError, isUsernameValid,
  email, setEmail, emailError, isEmailValid,
  phoneNumber, setPhoneNumber, phoneError, isPhoneValid,
  password, setPassword, passwordError, isPasswordValid, showPassword, handleToggleShowPassword,
  confirmPassword, setConfirmPassword, confirmPasswordError, isConfirmPasswordValid,
  gender, setGender,
  secretQuestion1, handleSecretQuestion1Change, secretAnswer1, setSecretAnswer1,
  secretQuestion1Error, secretAnswer1Error, isSecretQuestion1Valid, isSecretAnswer1Valid,
  customQuestion1, handleCustomQuestion1Change, customQuestion1Error, isCustomQuestion1Valid,
  secretQuestion2, handleSecretQuestion2Change, secretAnswer2, setSecretAnswer2,
  secretQuestion2Error, secretAnswer2Error, isSecretQuestion2Valid, isSecretAnswer2Valid,
  customQuestion2, handleCustomQuestion2Change, customQuestion2Error, isCustomQuestion2Valid,
  t
}) => {
  const renderValidationIcon = (isValid: boolean, error: string) => {
    if (error) return <AlertCircle className="h-5 w-5 text-red-500" />;
    if (isValid) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    return null;
  };

  return (
    <div className="space-y-4">
      <RegisterFormFieldInput
        id="register-username"
        label={t('username')}
        type="text"
        placeholder={t('enter-username')}
        value={username}
        onChange={(e) => setUsername(e.target.value.toLowerCase())}
        error={usernameError}
        isValid={isUsernameValid}
        renderValidationIcon={renderValidationIcon}
        successMessage={t('username-valid')}
        helperText={t('username-requirements')}
        showInfoIcon={true}
        infoTitle={t('info-icon-username-title')}
        infoContent={t('info-icon-username-content')}
        t={t}
        required
      />
      
      <RegisterFormFieldInput
        id="register-email"
        label={t('email')}
        type="email"
        placeholder={t('enter-email-placeholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
        isValid={isEmailValid}
        renderValidationIcon={renderValidationIcon}
        successMessage={t('email-valid')}
        t={t}
        required
      />

      <RegisterFormFieldInput
        id="register-phone"
        label={t('phone-number-label')}
        type="tel"
        placeholder={t('phone-placeholder')}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        error={phoneError}
        isValid={isPhoneValid}
        renderValidationIcon={renderValidationIcon}
        helperText={t('phone-helper-text')}
        t={t}
        required
      />
      
      <RegisterGenderSelector
        gender={gender}
        onGenderChange={setGender}
        t={t}
      />
      
      <RegisterFormFieldInput
        id="register-password"
        label={t('password')}
        type="password"
        placeholder={t('create-password-placeholder')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        isValid={isPasswordValid}
        renderValidationIcon={renderValidationIcon}
        successMessage={t('password-valid')}
        showPasswordToggle
        onToggleShowPassword={handleToggleShowPassword}
        currentShowPasswordState={showPassword}
        showInfoIcon={true}
        infoTitle={t('info-icon-password-title')}
        infoContent={t('info-icon-password-content-detailed')}
        t={t}
        required
        inputClassName="pr-10"
        validationIconContainerClassName="absolute inset-y-0 right-10 pr-1 flex items-center pointer-events-none"
      />
      
      <RegisterFormFieldInput
        id="confirm-password"
        label={t('confirm-password')}
        type="password"
        placeholder={t('confirm-password-placeholder')}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={confirmPasswordError}
        isValid={isConfirmPasswordValid}
        renderValidationIcon={renderValidationIcon}
        successMessage={t('confirm-password-valid')}
        currentShowPasswordState={showPassword}
        t={t}
        required
      />
      
      <SecretQuestionField
        questionNumber={1}
        selectedQuestion={secretQuestion1}
        onQuestionChange={handleSecretQuestion1Change}
        answer={secretAnswer1}
        onAnswerChange={(e) => setSecretAnswer1(e.target.value)}
        questionError={secretQuestion1Error}
        answerError={secretAnswer1Error}
        isQuestionValid={isSecretQuestion1Valid}
        isAnswerValid={isSecretAnswer1Valid}
        customQuestion={customQuestion1}
        onCustomQuestionChange={handleCustomQuestion1Change}
        customQuestionError={customQuestion1Error}
        isCustomQuestionValid={isCustomQuestion1Valid}
        t={t}
      />

      <SecretQuestionField
        questionNumber={2}
        selectedQuestion={secretQuestion2}
        onQuestionChange={handleSecretQuestion2Change}
        answer={secretAnswer2}
        onAnswerChange={(e) => setSecretAnswer2(e.target.value)}
        questionError={secretQuestion2Error}
        answerError={secretAnswer2Error}
        isQuestionValid={isSecretQuestion2Valid}
        isAnswerValid={isSecretAnswer2Valid}
        customQuestion={customQuestion2}
        onCustomQuestionChange={handleCustomQuestion2Change}
        customQuestionError={customQuestion2Error}
        isCustomQuestionValid={isCustomQuestion2Valid}
        t={t}
      />
    </div>
  );
};

export default RegisterFormFields;
