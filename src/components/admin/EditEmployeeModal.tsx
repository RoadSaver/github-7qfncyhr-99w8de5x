import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { EmployeeAccountService } from '@/services/employeeAccountService';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import {
  useUsernameValidation,
  useEmailValidation,
  usePhoneNumberValidation
} from '@/hooks/useAuthValidation';

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeUpdated: () => void;
  employee: any;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ isOpen, onClose, onEmployeeUpdated, employee }) => {
  const { language } = useApp();
  const t = useTranslation(language);
  
  const [realName, setRealName] = useState(employee?.real_name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [employeeRole, setEmployeeRole] = useState(employee?.employee_role || 'technician');

  // Use validation hooks with initial values
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

  // Initialize form values when employee changes
  React.useEffect(() => {
    if (employee) {
      setUsername(employee.username || '');
      setEmail(employee.email || '');
      setPhoneNumber(employee.phone_number || '+359');
      setRealName(employee.real_name || '');
      setEmployeeRole(employee.employee_role || 'technician');
    }
  }, [employee, setUsername, setEmail, setPhoneNumber]);

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
      // Update employee account
      await EmployeeAccountService.updateEmployee(employee.id, {
        username: username,
        email: email,
        phone_number: phoneNumber || undefined,
        employee_role: employeeRole,
        real_name: realName.trim()
      });

      toast({
        title: "Success",
        description: "Employee account updated successfully"
      });

      onEmployeeUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating employee:', error);
      toast({
        title: "Error",
        description: "Failed to update employee account",
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
          <DialogTitle>Edit Employee Account</DialogTitle>
          <DialogDescription>
            Update the employee account information.
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
              {isLoading ? 'Updating...' : 'Update Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeModal;