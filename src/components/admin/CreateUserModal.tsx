import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { UserAccountService } from '@/services/userAccountService';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import {
  useUsernameValidation,
  useEmailValidation,
  usePhoneNumberValidation,
  usePasswordValidation
} from '@/hooks/useAuthValidation';
import { useSecretQuestions } from '@/hooks/useSecretQuestions';
import SecretQuestionField from '@/components/auth/SecretQuestionField';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose, onUserCreated }) => {
  const { language } = useApp();
  const t = useTranslation(language);
  
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use validation hooks
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

  const [gender, setGender] = useState('');

  // Secret questions
  const secretQuestions = useSecretQuestions(t);

  const renderValidationIcon = (isValid: boolean, error: string) => {
    if (error) return <AlertCircle className="h-5 w-5 text-red-500" />;
    if (isValid) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive"
      });
      return;
    }

    if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isPhoneValid || !secretQuestions.isSecretQuestionsValid) {
      toast({
        title: "Error",
        description: "Please ensure all fields meet the requirements",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      await UserAccountService.createUserByAdmin({
        username: username,
        email: email,
        password: password,
        phone_number: phoneNumber || undefined,
        gender: gender || undefined,
        name: name.trim(),
        secretQuestion1: secretQuestions.getQuestion1Text(),
        secretAnswer1: secretQuestions.secretAnswer1,
        secretQuestion2: secretQuestions.getQuestion2Text(),
        secretAnswer2: secretQuestions.secretAnswer2
      });

      toast({
        title: "Success",
        description: "User account created successfully"
      });

      // Reset form
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setPhoneNumber('+359');
      setGender('');
      secretQuestions.setSecretAnswer1('');
      secretQuestions.setSecretAnswer2('');
      secretQuestions.handleSecretQuestion1Change('');
      secretQuestions.handleSecretQuestion2Change('');

      onUserCreated();
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Error",
        description: "Failed to create user account",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = name.trim() && isUsernameValid && isEmailValid && isPasswordValid && 
                    isPhoneValid && secretQuestions.isSecretQuestionsValid;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New User Account</DialogTitle>
          <DialogDescription>
            Create a new user account that will be stored in the existing user accounts database.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name (Name, Surname)"
                required
              />
            </div>

            {/* Username Field with Validation */}
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <div className="relative">
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  placeholder="Enter username"
                  required
                  className={`pr-10 ${usernameError ? 'border-red-500' : isUsernameValid ? 'border-green-500' : ''}`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {renderValidationIcon(isUsernameValid, usernameError)}
                </div>
              </div>
              {usernameError && <p className="text-red-500 text-xs mt-1">{usernameError}</p>}
              {!usernameError && isUsernameValid && <p className="text-green-500 text-xs mt-1">Username is valid</p>}
              <p className="text-xs text-muted-foreground">Must be 6-20 characters, start with letter/number</p>
            </div>

            {/* Email Field with Validation */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className={`pr-10 ${emailError ? 'border-red-500' : isEmailValid ? 'border-green-500' : ''}`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {renderValidationIcon(isEmailValid, emailError)}
                </div>
              </div>
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
              {!emailError && isEmailValid && <p className="text-green-500 text-xs mt-1">Email is valid</p>}
            </div>

            {/* Password Field with Validation */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className={`pr-20 ${passwordError ? 'border-red-500' : isPasswordValid ? 'border-green-500' : ''}`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-10 flex items-center px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-500" />
                  ) : (
                    <Eye size={18} className="text-gray-500" />
                  )}
                </button>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {renderValidationIcon(isPasswordValid, passwordError)}
                </div>
              </div>
              {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
              {!passwordError && isPasswordValid && <p className="text-green-500 text-xs mt-1">Password is valid</p>}
              <p className="text-xs text-muted-foreground">
                Must be 8+ characters with uppercase, lowercase, number, and special character
              </p>
            </div>

            {/* Phone Number Field with Validation */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Input
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+359XXXXXXXXX"
                  className={`pr-10 ${phoneError ? 'border-red-500' : isPhoneValid ? 'border-green-500' : ''}`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {renderValidationIcon(isPhoneValid, phoneError)}
                </div>
              </div>
              {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
              <p className="text-xs text-muted-foreground">Must be 13 characters starting with +359</p>
            </div>

            {/* Gender Field */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Secret Question 1 */}
            <SecretQuestionField
              questionNumber={1}
              selectedQuestion={secretQuestions.secretQuestion1}
              onQuestionChange={secretQuestions.handleSecretQuestion1Change}
              answer={secretQuestions.secretAnswer1}
              onAnswerChange={(e) => secretQuestions.setSecretAnswer1(e.target.value)}
              questionError={secretQuestions.secretQuestion1Error}
              answerError={secretQuestions.secretAnswer1Error}
              isQuestionValid={secretQuestions.isSecretQuestion1Valid}
              isAnswerValid={secretQuestions.isSecretAnswer1Valid}
              customQuestion={secretQuestions.customQuestion1}
              onCustomQuestionChange={secretQuestions.handleCustomQuestion1Change}
              customQuestionError={secretQuestions.customQuestion1Error}
              isCustomQuestionValid={secretQuestions.isCustomQuestion1Valid}
              t={t}
            />

            {/* Secret Question 2 */}
            <SecretQuestionField
              questionNumber={2}
              selectedQuestion={secretQuestions.secretQuestion2}
              onQuestionChange={secretQuestions.handleSecretQuestion2Change}
              answer={secretQuestions.secretAnswer2}
              onAnswerChange={(e) => secretQuestions.setSecretAnswer2(e.target.value)}
              questionError={secretQuestions.secretQuestion2Error}
              answerError={secretQuestions.secretAnswer2Error}
              isQuestionValid={secretQuestions.isSecretQuestion2Valid}
              isAnswerValid={secretQuestions.isSecretAnswer2Valid}
              customQuestion={secretQuestions.customQuestion2}
              onCustomQuestionChange={secretQuestions.handleCustomQuestion2Change}
              customQuestionError={secretQuestions.customQuestion2Error}
              isCustomQuestionValid={secretQuestions.isCustomQuestion2Valid}
              t={t}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !isFormValid} 
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? 'Creating...' : 'Create User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;