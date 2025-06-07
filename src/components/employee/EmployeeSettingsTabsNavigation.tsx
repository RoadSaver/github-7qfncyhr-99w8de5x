
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, History, Info } from 'lucide-react';

interface EmployeeSettingsTabsNavigationProps {
  t: (key: string) => string;
  iconAnimation: string;
}

const EmployeeSettingsTabsNavigation: React.FC<EmployeeSettingsTabsNavigationProps> = ({ t, iconAnimation }) => {
  return (
    <TabsList className="grid grid-cols-3 mb-3 -mt-2 h-auto">
      <TabsTrigger
        value="account"
        className="group flex flex-col items-center gap-1.5 py-2 px-1.5 text-xs sm:text-sm data-[state=active]:p-1.5 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
      >
        <User className={`h-3 w-3 sm:h-4 sm:w-4 ${iconAnimation}`} />
        <span className="leading-none">{t('account')}</span>
      </TabsTrigger>
      <TabsTrigger
        value="history"
        className="group flex flex-col items-center gap-1.5 py-2 px-1.5 text-xs sm:text-sm data-[state=active]:p-1.5 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
      >
        <History className={`h-3 w-3 sm:h-4 sm:w-4 ${iconAnimation}`} />
        <span className="leading-none">{t('history')}</span>
      </TabsTrigger>
      <TabsTrigger
        value="about"
        className="group flex flex-col items-center gap-1.5 py-2 px-1.5 text-xs sm:text-sm data-[state=active]:p-1.5 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500"
      >
        <Info className={`h-3 w-3 sm:h-4 sm:w-4 ${iconAnimation}`} />
        <span className="leading-none">{t('about')}</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default EmployeeSettingsTabsNavigation;
