
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RegisterGenderSelectorProps {
  gender: string;
  onGenderChange: (value: string) => void;
  t: (key: string) => string;
}

const RegisterGenderSelector: React.FC<RegisterGenderSelectorProps> = ({ gender, onGenderChange, t }) => {
  return (
    <div className="space-y-2">
      <Label>{t('gender-label')}</Label>
      <RadioGroup value={gender} onValueChange={onGenderChange} className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="man" id="man" />
          <Label htmlFor="man" className="text-sm">{t('man-label')}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="woman" id="woman" />
          <Label htmlFor="woman" className="text-sm">{t('woman-label')}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="not-specified" id="not-specified" />
          <Label htmlFor="not-specified" className="text-sm">{t('not-specified-label')}</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RegisterGenderSelector;
