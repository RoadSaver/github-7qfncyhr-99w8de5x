
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface RegisterFormHeaderProps {
  t: (key: string) => string;
}

const RegisterFormHeader: React.FC<RegisterFormHeaderProps> = ({ t }) => {
  return (
    <CardHeader>
      <CardTitle className="text-2xl font-bold">{t('create-account')}</CardTitle>
      <CardDescription>
        {t('join-roadsaver-desc')}
      </CardDescription>
    </CardHeader>
  );
};

export default RegisterFormHeader;
