
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import InfoIcon from '@/components/ui/info-icon';

interface RegisterFormFieldInputProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  isValid: boolean;
  renderValidationIcon: (isValid: boolean, error: string) => React.ReactNode;
  successMessage?: string;
  helperText?: string;
  showPasswordToggle?: boolean;
  onToggleShowPassword?: () => void;
  currentShowPasswordState?: boolean;
  t: (key: string) => string;
  required?: boolean;
  inputClassName?: string;
  validationIconContainerClassName?: string;
  showInfoIcon?: boolean;
  infoTitle?: string;
  infoContent?: string;
}

const RegisterFormFieldInput: React.FC<RegisterFormFieldInputProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  isValid,
  renderValidationIcon,
  successMessage,
  helperText,
  showPasswordToggle = false,
  onToggleShowPassword,
  currentShowPasswordState = false,
  t,
  required = false,
  inputClassName = "",
  validationIconContainerClassName = "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
  showInfoIcon = false,
  infoTitle = "",
  infoContent = ""
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center">
        {label}
        {showInfoIcon && (
          <InfoIcon titleKey={infoTitle} contentKey={infoContent} />
        )}
      </Label>
      {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
      <div className="relative">
        <Input
          id={id}
          type={showPasswordToggle && type === 'password' ? (currentShowPasswordState ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`border-2 focus:ring-green-600 focus:border-green-600 ${inputClassName} ${error ? 'border-red-500' : isValid ? 'border-green-500' : ''}`}
        />
        {showPasswordToggle && type === 'password' && onToggleShowPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3"
            onClick={onToggleShowPassword}
            style={{ zIndex: 1 }}
            aria-label={currentShowPasswordState ? t('hide-password') : t('show-password')}
          >
            {currentShowPasswordState ? (
              <EyeOff size={18} className="text-gray-500" />
            ) : (
              <Eye size={18} className="text-gray-500" />
            )}
          </button>
        )}
        <div className={validationIconContainerClassName}>
          {renderValidationIcon(isValid, error)}
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {!error && isValid && successMessage && <p className="text-green-500 text-xs mt-1">{successMessage}</p>}
    </div>
  );
};

export default RegisterFormFieldInput;
