
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';

interface PasswordEditFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  isChanged: boolean;
  t: (key: string) => string;
  isValid: boolean; // To disable save if password doesn't meet requirements
}

const PasswordEditField: React.FC<PasswordEditFieldProps> = ({
  value,
  onChange,
  onSave,
  isChanged,
  t,
  isValid,
}) => {
  return (
    <div>
      <Label htmlFor="passwordEdit" className="text-sm font-medium">{t('change-password-colon')}</Label>
      <div className="flex items-center space-x-2">
        <Input
          id="passwordEdit"
          value={value}
          onChange={onChange}
          type="password"
          placeholder={t('new-password-placeholder')}
        />
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700"
          disabled={!isChanged || !isValid}
          onClick={onSave}
        >
          <Save className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">{t('save')}</span>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{t('password-requirements')}</p>
    </div>
  );
};

export default PasswordEditField;
