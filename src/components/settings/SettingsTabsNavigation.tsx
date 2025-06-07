
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, History, Euro, Info } from 'lucide-react';

interface SettingsTabsNavigationProps {
  t: (key: string) => string;
}

const SettingsTabsNavigation: React.FC<SettingsTabsNavigationProps> = ({ t }) => {
  const iconAnimation = "transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:rotate-[-10deg] group-data-[state=active]:scale-110 group-data-[state=active]:text-green-600";

  return (
    // Adjusted mb-2 to mb-3 due to increased size
    <TabsList className="grid grid-cols-4 mb-3 -mt-2 h-auto"> 
      <TabsTrigger 
        value="account" 
        // Increased padding, gap, icon size, and text size
        className="group flex flex-col items-center gap-1.5 py-2 px-1.5 text-sm data-[state=active]:p-1.5" 
      >
        <User className={`h-4 w-4 ${iconAnimation}`} /> {/* Icon size h-4 w-4 */}
        <span className="leading-none">{t('account')}</span>
      </TabsTrigger>
      <TabsTrigger 
        value="history" 
        className="group flex flex-col items-center gap-1.5 py-2 px-1.5 text-sm data-[state=active]:p-1.5"
      >
        <History className={`h-4 w-4 ${iconAnimation}`} />
        <span className="leading-none">{t('history')}</span>
      </TabsTrigger>
      <TabsTrigger 
        value="payment" 
        className="group flex flex-col items-center gap-1.5 py-2 px-1.5 text-sm data-[state=active]:p-1.5"
      >
        <Euro className={`h-4 w-4 ${iconAnimation}`} /> 
        <span className="leading-none">{t('payment')}</span>
      </TabsTrigger>
      <TabsTrigger 
        value="about" 
        className="group flex flex-col items-center gap-1.5 py-2 px-1.5 text-sm data-[state=active]:p-1.5"
      >
        <Info className={`h-4 w-4 ${iconAnimation}`} />
        <span className="leading-none">{t('about')}</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default SettingsTabsNavigation;
