
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from '@/utils/translations';
import AccountEditModal from './AccountEditModal';
import AccountTabContent from './AccountTabContent';
import HistoryTabContent from './HistoryTabContent';
import PaymentTabContent from './PaymentTabContent';
import AboutTabContent from './AboutTabContent';
import SettingsTabsNavigation from './SettingsTabsNavigation';
import LanguageSwitcherControls from './LanguageSwitcherControls';
import ThemeToggle from '@/components/ui/theme-toggle';
import { useAccountSettings } from '@/hooks/useAccountSettings';
import { cn } from '@/lib/utils';

interface SettingsMenuProps {
  open: boolean;
  onClose: () => void;
  onLanguageChange: (language: 'en' | 'bg') => void;
  currentLanguage: 'en' | 'bg';
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ 
  open, 
  onClose,
  onLanguageChange,
  currentLanguage
}) => {
  const t = useTranslation(currentLanguage);
  const [showAccountEdit, setShowAccountEdit] = useState(false);

  const {
    userAvatar,
    defaultUserAvatar,
    username,
    email,
    phoneNumber,
    currentPasswordForVerification,
    handleAvatarChange,
    handleUsernameSave,
    handleEmailSave,
    handlePhoneNumberSave,
    handlePasswordSave,
  } = useAccountSettings();
  
  const handleLogout = () => {
    toast({
      title: t('logged-out'),
      description: t('logged-out-msg')
    });
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        setShowAccountEdit(false); 
      }
      onClose();
    }}>
      <DialogContent 
        className={cn(
          "fixed top-0 left-0 w-full h-full max-w-full max-h-full p-0", 
          "rounded-none border-none bg-background font-clash",
          "flex flex-col overflow-hidden",
          "translate-x-0 translate-y-0", 
          "data-[state=open]:animate-none data-[state=closed]:animate-none",
          "data-[state=open]:slide-in-from-left-0 data-[state=open]:slide-in-from-top-0" 
        )}
      > 
        <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center flex-shrink-0 shadow-md">
          <h1 className="text-xl font-semibold font-clash">RoadSaver</h1>
          <div className="flex items-center gap-4"> 
            <ThemeToggle showLabels={false} size="sm" />
            <LanguageSwitcherControls 
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
            <SettingsTabsNavigation t={t} />
          </div>
          
          <div className="flex-grow overflow-y-auto px-4 pb-4">
            <TabsContent value="account" className="m-0 h-full">
              <AccountTabContent
                t={t}
                userAvatar={userAvatar}
                handleAvatarChange={handleAvatarChange}
                initialUsername={username}
                initialEmail={email}
                initialPhoneNumber={phoneNumber}
                onEditAccountInfo={() => setShowAccountEdit(true)}
                onLogout={handleLogout}
                defaultAvatar={defaultUserAvatar}
              />
            </TabsContent>
            
            <TabsContent value="history" className="m-0 h-full">
              <HistoryTabContent t={t} />
            </TabsContent>
            
            <TabsContent value="payment" className="m-0 h-full">
              <PaymentTabContent t={t} />
            </TabsContent>
            
            <TabsContent value="about" className="m-0 h-full">
              <AboutTabContent t={t} />
            </TabsContent>
          </div>
        </Tabs>

        <AccountEditModal
          open={showAccountEdit}
          onClose={() => setShowAccountEdit(false)}
          currentLanguage={currentLanguage}
          initialData={{
            username: username,
            email: email,
            phoneNumber: phoneNumber,
          }}
          currentPasswordForVerification={currentPasswordForVerification}
          onUsernameSave={handleUsernameSave}
          onEmailSave={handleEmailSave}
          onPhoneNumberSave={handlePhoneNumberSave}
          onPasswordSave={handlePasswordSave}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SettingsMenu;
