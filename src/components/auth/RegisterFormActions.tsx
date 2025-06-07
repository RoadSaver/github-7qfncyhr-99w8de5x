import React from 'react';
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface RegisterFormActionsProps {
  t: (key: string) => string;
  onCancel: () => void;
  isLoading: boolean;
  isFormValid: boolean;
}

const RegisterFormActions: React.FC<RegisterFormActionsProps> = ({ t, onCancel, isLoading, isFormValid }) => {
  return (
    <CardFooter className="flex justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="border-green-600 text-green-600 hover:bg-green-50"
      >
        {t('Back to Login')}
      </Button>
      <Button
        type="submit"
        className="bg-green-600 hover:bg-green-700"
        disabled={isLoading || !isFormValid}
      >
        {isLoading ? t('creating-account') : t('create-account')}
      </Button>
    </CardFooter>
  );
};

export default RegisterFormActions;
