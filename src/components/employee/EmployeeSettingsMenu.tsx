
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from '@/utils/translations';
import { cn } from '@/lib/utils';

import EmployeeSettingsHeader from './EmployeeSettingsHeader';
import EmployeeSettingsTabsNavigation from './EmployeeSettingsTabsNavigation';
import AccountSettingsTab from './AccountSettingsTab';
import HistorySettingsTab from './HistorySettingsTab';
import AboutSettingsTab from './AboutSettingsTab';
import ThemeToggle from '@/components/ui/theme-toggle';

interface EmployeeSettingsMenuProps {
  open: boolean;
  onClose: () => void;
  onLanguageChange: (language: 'en' | 'bg') => void;
  currentLanguage: 'en' | 'bg';
}

const EmployeeSettingsMenu: React.FC<EmployeeSettingsMenuProps> = ({
  open,
  onClose,
  onLanguageChange,
  currentLanguage
}) => {
  const t = useTranslation(currentLanguage);
  const [employeeAvatar, setEmployeeAvatar] = useState<string>('/lovable-uploads/b99a5fde-0e9d-4b8e-b276-c43924ce1074.png');

  const handleLogout = () => {
    toast({
      title: t('logged-out'),
      description: t('logged-out-msg')
    });
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      console.log('Avatar file to upload for employee:', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployeeAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast({ title: "Avatar Updated (Demo)", description: "Employee avatar preview changed." });
    }
  };

  const iconAnimation = "transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:rotate-[-10deg] group-data-[state=active]:scale-110 group-data-[state=active]:text-blue-500";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "fixed top-0 left-0 w-full h-full max-w-full max-h-full p-0",
          "translate-x-0 translate-y-0",

          "sm:rounded-lg sm:max-w-2xl sm:max-h-[90vh] sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",
          
          "rounded-none border-none bg-background font-clash",
          "flex flex-col overflow-hidden",
          
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          
          "data-[state=open]:slide-in-from-left-0 data-[state=open]:slide-in-from-top-0 sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-1/2"
        )}
      >
        <div className="bg-blue-600 text-primary-foreground p-3 flex justify-between items-center flex-shrink-0 shadow-md">
          <h1 className="text-xl font-semibold font-clash">RoadSaver</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle showLabels={false} size="sm" />
            <EmployeeSettingsHeader
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
              t={t}
            />
          </div>
        </div>

        <DialogHeader className="text-left px-4 pt-4 pb-2 flex-shrink-0">
          <DialogTitle>{t('settings')}</DialogTitle>
          <DialogDescription>
            {t('configure-preferences')}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="account" className="w-full flex flex-col flex-grow overflow-hidden">
          <div className="flex-shrink-0 px-4">
            <EmployeeSettingsTabsNavigation t={t} iconAnimation={iconAnimation} />
          </div>

          <div className="flex-grow overflow-y-auto px-4 pb-4">
            <TabsContent value="account" className="m-0 h-full">
              <AccountSettingsTab
                t={t}
                employeeAvatar={employeeAvatar}
                onAvatarChange={handleAvatarChange}
                onLogout={handleLogout}
              />
            </TabsContent>

            <TabsContent value="history" className="m-0 h-full">
              <HistorySettingsTab t={t} />
            </TabsContent>

            <TabsContent value="about" className="m-0 h-full">
              <AboutSettingsTab t={t} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeSettingsMenu;
