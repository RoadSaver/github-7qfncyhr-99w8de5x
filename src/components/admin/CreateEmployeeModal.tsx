import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { EmployeeAccountService } from '@/services/employeeAccountService';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import {
  useUsernameValidation,
  useEmailValidation,
  usePhoneNumberValidation
} from '@/hooks/useAuthValidation';

interface CreateEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeCreated: () => void;
}

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({ isOpen, onClose, onEmployeeCreated }) => {
  const { language } = useApp();
  const t = useTranslation(language);
  
  const [realName, setRealName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [employeeRole, setEmployeeRole] = useState('technician');

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

  const renderValidationIcon = (isValid: boolean, error: string) => {
    if (error) return <AlertCircle className="h-5 w-5 text-red-500" />;
    if (isValid) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!realName.trim()) {
      toast({
        title: "Error",
        description: "Real name is required",
        variant: "destructive"
      });
      return;
    }

    if (!isUsernameValid || !isEmailValid || !isPhoneValid) {
      toast({
        title: "Error",
        description: "Please ensure all fields meet the requirements",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      await EmployeeAccountService.createEmployeeAccount({
        username: username,
        email: email,
        phone_number: phoneNumber || undefined,
        employee_role: employeeRole,
        real_name: realName.trim()
      });

      toast({
        title: "Success",
        description: "Employee account created successfully"
      });

      // Reset form
      setRealName('');
      setUsername('');
      setEmail('');
      setPhoneNumber('+359');
      setEmployeeRole('technician');

      onEmployeeCreated();
      onClose();
    } catch (error) {
      console.error('Error creating employee:', error);
      toast({
        title: "Error",
        description: "Failed to create employee account",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = realName.trim() && isUsernameValid && isEmailValid && isPhoneValid;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Employee Account</DialogTitle>
          <DialogDescription>
            Create a new employee account that will be stored in the employee accounts database.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Real Name Field */}
            <div className="space-y-2">
              <Label htmlFor="realName">Real Name *</Label>
              <Input
                id="realName"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder="Enter employee's full name"
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

            {/* Employee Role Field */}
            <div className="space-y-2">
              <Label htmlFor="role">Employee Role</Label>
              <Select value={employeeRole} onValueChange={setEmployeeRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technician">Technician</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !isFormValid} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Creating...' : 'Create Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEmployeeModal;