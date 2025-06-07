
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LogOut, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AccountSettingsTabProps {
  t: (key: string) => string;
  employeeAvatar: string;
  onAvatarChange: (file: File | null) => void;
  onLogout: () => void;
}

const AccountSettingsTab: React.FC<AccountSettingsTabProps> = ({
  t,
  employeeAvatar,
  onAvatarChange,
  onLogout,
}) => {
  const handleAvatarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      onAvatarChange(file || null);
    };
    input.click();
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <ScrollArea className="flex-grow">
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-blue-500">
                  <AvatarImage src={employeeAvatar} alt="Employee Avatar" />
                  <AvatarFallback className="text-lg font-semibold">E</AvatarFallback>
                </Avatar>
                <button
                  onClick={handleAvatarClick}
                  className="absolute -bottom-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 transition-all duration-200 hover:scale-110 shadow-md"
                  aria-label={t('change-avatar')}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border p-4">
            <h3 className="text-md font-semibold">{t('user-account')}</h3>
            <p className="text-sm">
              <span className="font-medium text-muted-foreground">{t('username')}: </span>
              employee
            </p>
            <p className="text-sm">
              <span className="font-medium text-muted-foreground">{t('email')}: </span>
              employee@roadsaver.com
            </p>
          </div>
        </div>
      </ScrollArea>
      <div className="py-4 flex justify-center">
        <Button
          variant="destructive"
          size="sm"
          onClick={onLogout}
          className="w-1/2"
        >
          <LogOut className="mr-2 h-4 w-4" /> {t('logout')}
        </Button>
      </div>
    </div>
  );
};

export default AccountSettingsTab;
