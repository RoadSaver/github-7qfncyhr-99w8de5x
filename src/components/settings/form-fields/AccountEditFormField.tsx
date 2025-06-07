
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';

interface AccountEditFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  isChanged: boolean;
  saveButtonDisabled?: boolean;
  placeholder?: string;
  type?: string;
  error?: string;
  t: (key: string) => string;
}

const AccountEditFormField: React.FC<AccountEditFormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  onSave,
  isChanged,
  saveButtonDisabled = false,
  placeholder,
  type = "text",
  error,
  t,
}) => {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      <div className="flex items-center space-x-2">
        <Input
          id={id}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className={error ? "border-red-500" : ""}
        />
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700"
          disabled={!isChanged || saveButtonDisabled}
          onClick={onSave}
        >
          <Save className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">{t('save')}</span>
        </Button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default AccountEditFormField;
