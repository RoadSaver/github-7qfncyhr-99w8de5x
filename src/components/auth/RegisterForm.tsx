import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Globe } from "lucide-react";
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import RegisterFormHeader from './RegisterFormHeader';
import RegisterFormActions from './RegisterFormActions';
import RegisterFormFields from './RegisterFormFields';
import {
  useUsernameValidation,
  useEmailValidation,
  usePhoneNumberValidation,
  usePasswordValidation,
  useConfirmPasswordValidation
} from '@/hooks/useAuthValidation';
import { useSecretQuestions } from '@/hooks/useSecretQuestions';

interface RegisterFormProps {
  onRegister: (userData: { 
    username: string; 
    email: string; 
    password: string; 
    gender?: string; 
    phoneNumber?: string;
    secretQuestion1?: string;
    secretAnswer1?: string;
    secretQuestion2?: string;
    secretAnswer2?: string;
  }) => void;
  onCancel: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onCancel }) => {
  const { language, setLanguage } = useApp();
  const t = useTranslation(language);
  
  const {
    value: username,
    setValue: setUsername,
    error: usernameError,
    isValid: isUsernameValid
  } = useUsernameValidation(t);

  const {
    value: email,
    setValue: setEmail,
    error: emailError,
    isValid: isEmailValid
  } = useEmailValidation(t);

  const {
    value: phoneNumber,
    setValue: setPhoneNumber,
    error: phoneError,
    isValid: isPhoneValid
  } = usePhoneNumberValidation(t);

  const {
    value: password,
    setValue: setPassword,
    error: passwordError,
    isValid: isPasswordValid
  } = usePasswordValidation(t);

  const {
    value: confirmPassword,
    setValue: setConfirmPassword,
    error: confirmPasswordError,
    isValid: isConfirmPasswordValid
  } = useConfirmPasswordValidation(password, t);

  const secretQuestions = useSecretQuestions(t);

  const [gender, setGender] = useState('man');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || 
        !isPhoneValid || !gender || !secretQuestions.isSecretQuestionsValid) {
      toast({
        title: t("error-title"),
        description: t("fill-all-fields"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: t("registration-successful"),
        description: t("account-created"),
      });
      onRegister({ 
        username, 
        email, 
        password, 
        gender, 
        phoneNumber: phoneNumber,
        secretQuestion1: secretQuestions.getQuestion1Text(),
        secretAnswer1: secretQuestions.secretAnswer1,
        secretQuestion2: secretQuestions.getQuestion2Text(),
        secretAnswer2: secretQuestions.secretAnswer2
      });
      setIsLoading(false);
    }, 1500);
  };

  const isOverallFormValid = isUsernameValid && isEmailValid && isPasswordValid && 
                            isConfirmPasswordValid && isPhoneValid && !!gender &&
                            secretQuestions.isSecretQuestionsValid;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600/10 to-background font-clash">
      <div className="absolute top-4 right-4 z-10">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLanguage(language === 'en' ? 'bg' : 'en')}
            aria-label={t(language === 'en' ? 'switch-to-bulgarian' : 'switch-to-english')}
            className="h-10 w-10 bg-green-600 text-white hover:bg-green-700"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <span className="absolute -bottom-1 -right-1 text-xs bg-white text-green-600 px-1 rounded">
            {language.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md mx-auto">
          <RegisterFormHeader t={t} />
          <form onSubmit={handleSubmit}>
            <CardContent>
              <RegisterFormFields
                username={username}
                setUsername={setUsername}
                usernameError={usernameError}
                isUsernameValid={isUsernameValid}
                
                email={email}
                setEmail={setEmail}
                emailError={emailError}
                isEmailValid={isEmailValid}
                
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                phoneError={phoneError}
                isPhoneValid={isPhoneValid}
                
                password={password}
                setPassword={setPassword}
                passwordError={passwordError}
                isPasswordValid={isPasswordValid}
                showPassword={showPassword}
                handleToggleShowPassword={handleToggleShowPassword}
                
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                confirmPasswordError={confirmPasswordError}
                isConfirmPasswordValid={isConfirmPasswordValid}
                
                gender={gender}
                setGender={setGender}
                
                secretQuestion1={secretQuestions.secretQuestion1}
                handleSecretQuestion1Change={secretQuestions.handleSecretQuestion1Change}
                secretAnswer1={secretQuestions.secretAnswer1}
                setSecretAnswer1={secretQuestions.setSecretAnswer1}
                secretQuestion1Error={secretQuestions.secretQuestion1Error}
                secretAnswer1Error={secretQuestions.secretAnswer1Error}
                isSecretQuestion1Valid={secretQuestions.isSecretQuestion1Valid}
                isSecretAnswer1Valid={secretQuestions.isSecretAnswer1Valid}
                customQuestion1={secretQuestions.customQuestion1}
                handleCustomQuestion1Change={secretQuestions.handleCustomQuestion1Change}
                customQuestion1Error={secretQuestions.customQuestion1Error}
                isCustomQuestion1Valid={secretQuestions.isCustomQuestion1Valid}
                
                secretQuestion2={secretQuestions.secretQuestion2}
                handleSecretQuestion2Change={secretQuestions.handleSecretQuestion2Change}
                secretAnswer2={secretQuestions.secretAnswer2}
                setSecretAnswer2={secretQuestions.setSecretAnswer2}
                secretQuestion2Error={secretQuestions.secretQuestion2Error}
                secretAnswer2Error={secretQuestions.secretAnswer2Error}
                isSecretQuestion2Valid={secretQuestions.isSecretQuestion2Valid}
                isSecretAnswer2Valid={secretQuestions.isSecretAnswer2Valid}
                customQuestion2={secretQuestions.customQuestion2}
                handleCustomQuestion2Change={secretQuestions.handleCustomQuestion2Change}
                customQuestion2Error={secretQuestions.customQuestion2Error}
                isCustomQuestion2Valid={secretQuestions.isCustomQuestion2Valid}
                
                t={t}
              />
            </CardContent>
            
            <RegisterFormActions 
              t={t}
              onCancel={onCancel}
              isLoading={isLoading}
              isFormValid={isOverallFormValid}
            />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
