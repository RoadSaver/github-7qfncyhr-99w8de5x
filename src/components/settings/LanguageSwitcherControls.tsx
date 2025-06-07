
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageSwitcherControlsProps {
  currentLanguage: 'en' | 'bg';
  onLanguageChange: (language: 'en' | 'bg') => void;
  t: (key: string) => string;
  className?: string; // Allow passing custom className for the wrapper
  theme?: 'user' | 'employee'; // Ensuring this prop is correctly defined and optional
}

const LanguageSwitcherControls: React.FC<LanguageSwitcherControlsProps> = ({
  currentLanguage,
  onLanguageChange,
  t,
  className,
  theme = 'user', // Default theme if not provided
}) => {
  const handleToggleLanguage = () => {
    onLanguageChange(currentLanguage === 'en' ? 'bg' : 'en');
  };

  // Adjust button style based on theme
  const buttonTextColorClass = theme === 'employee' ? 'text-primary-foreground' : 'text-current';
  const buttonHoverBgClass = theme === 'employee' ? 'hover:bg-blue-700' : 'hover:bg-black/20'; // Adjusted for consistency with user theme hover


  return (
    <div className={`mr-8 ${className}`}> 
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleLanguage}
        className={`h-8 w-auto px-2 flex items-center gap-1 rounded-md ${buttonTextColorClass} ${buttonHoverBgClass}`}
        title={t('change-language')}
      >
        <Globe className="h-4 w-4 animate-globe-pulse" />
        <span className="text-xs font-medium">
          {currentLanguage.toUpperCase()}
        </span>
      </Button>
    </div>
  );
};

export default LanguageSwitcherControls;
