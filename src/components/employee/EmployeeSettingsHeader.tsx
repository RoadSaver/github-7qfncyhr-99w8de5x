
import React from 'react';
import LanguageSwitcherControls from '@/components/settings/LanguageSwitcherControls';

interface EmployeeSettingsHeaderProps {
  currentLanguage: 'en' | 'bg';
  onLanguageChange: (language: 'en' | 'bg') => void;
  t: (key: string) => string;
}

const EmployeeSettingsHeader: React.FC<EmployeeSettingsHeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  t,
}) => {
  return (
    <LanguageSwitcherControls
      currentLanguage={currentLanguage}
      onLanguageChange={onLanguageChange}
      t={t}
      theme="employee"
    />
  );
};

export default EmployeeSettingsHeader;
