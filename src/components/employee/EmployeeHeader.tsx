
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Globe, LogOut } from 'lucide-react'; // Changed User to LogOut for clarity, added Globe
import { useTranslation } from '@/utils/translations';

interface EmployeeHeaderProps {
  language: 'en' | 'bg';
  onLanguageChange: (language: 'en' | 'bg') => void;
  onLogout: () => void;
  onSettingsOpen: () => void;
}

const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({
  language,
  onLanguageChange,
  onLogout,
  onSettingsOpen
}) => {
  const t = useTranslation(language);
  
  return (
    // Using bg-blue-600 for the employee theme
    <header className="bg-blue-600 text-white p-3 sm:p-4 flex justify-between items-center sticky top-0 z-10 font-clash">
      {/* Matched h1 style to user dashboard header */}
      <h1 className="text-xl font-semibold">RoadSaver</h1>
      <div className="flex gap-1 sm:gap-2">
        <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onLanguageChange(language === 'en' ? 'bg' : 'en')}
              className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
              title={t('change-language')}
            >
              <Globe className="h-3 w-3 sm:h-4 sm:w-4 animate-globe-pulse" />
            </Button>
            <span className="absolute -bottom-1 -right-1 text-xs bg-white text-blue-600 px-1 rounded">
              {language.toUpperCase()}
            </span>
          </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onSettingsOpen}
          className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10"
          title={t('settings')}
        >
          <Settings className="h-4 w-4 sm:h-5 sm:w-5 animate-settings-gear-turn" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" // Kept sm for text button
          onClick={onLogout}
          className="text-white hover:bg-white/20 h-8 sm:h-10 px-2 sm:px-3 flex items-center" // Adjusted padding and height
          title={t('logout')}
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" /> {/* Icon before text */}
          <span className="hidden sm:inline">{t('logout')}</span> {/* Hide text on smaller screens if needed or keep it */}
        </Button>
      </div>
    </header>
  );
};

export default EmployeeHeader;
