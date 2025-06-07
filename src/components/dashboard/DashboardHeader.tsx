import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, MapPin, Globe, Siren, Clock } from 'lucide-react';

interface DashboardHeaderProps {
  language: 'en' | 'bg';
  t: (key: string) => string;
  onEmergencyClick: () => void;
  onLocationClick: () => void;
  onSettingsClick: () => void;
  onLanguageToggle: () => void;
  onOngoingRequestsClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  language,
  t,
  onEmergencyClick,
  onLocationClick,
  onSettingsClick,
  onLanguageToggle,
  onOngoingRequestsClick
}) => {
  const editMode = false; // This should be replaced with actual edit mode state

  return <>
      {/* Header */}
      <header className="bg-green-600 text-white p-3 sm:p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-semibold font-clash text-white dark:text-black">RoadSaver</h1>
        <div className="flex gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" onClick={onEmergencyClick} className="text-white dark:text-black hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10" title={t('emergency-services')}>
            <Siren className="h-4 w-4 sm:h-5 sm:w-5 animate-emergency-alert-flash" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onLocationClick} className="text-white dark:text-black hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10" title={t('update-location')}>
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 animate-map-pin-bob" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onSettingsClick} className="text-white dark:text-black hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10" title={t('settings')}>
            <Settings className="h-4 w-4 sm:h-5 sm:w-5 animate-settings-gear-turn" />
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon" onClick={onLanguageToggle} className="text-white dark:text-black hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10" title={t('change-language')}>
              <Globe className="h-3 w-3 sm:h-4 sm:w-4 animate-globe-pulse" />
            </Button>
            <span className="absolute -bottom-1 -right-1 text-xs bg-white text-green-600 px-1 rounded">
              {language.toUpperCase()}
            </span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container max-w-md mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            {t('services')}
          </h2>
          <Button variant="outline" size="sm" onClick={onOngoingRequestsClick} className="text-xs font-normal sm:text-base">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {t('Ongoing Requests')}
          </Button>
        </div>
      </main>
    </>;
};

export default DashboardHeader;