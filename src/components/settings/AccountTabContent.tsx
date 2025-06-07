import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import AvatarUpload from '@/components/ui/avatar-upload';
import { LogOut } from 'lucide-react';

interface AccountInfoDisplayProps {
  label: string;
  value: string;
}

const AccountInfoDisplay: React.FC<AccountInfoDisplayProps> = ({ label, value }) => (
  <div className="text-sm">
    <span className="font-medium text-muted-foreground">{label}: </span>
    <span>{value || 'N/A'}</span>
  </div>
);

interface AccountTabContentProps {
  t: (key: string) => string;
  userAvatar: string;
  handleAvatarChange: (file: File | null) => void;
  initialUsername: string;
  initialEmail: string;
  initialPhoneNumber: string;
  onEditAccountInfo: () => void;
  onLogout: () => void;
  defaultAvatar: string;
}

const AccountTabContent: React.FC<AccountTabContentProps> = ({
  t,
  userAvatar,
  handleAvatarChange,
  initialUsername,
  initialEmail,
  initialPhoneNumber,
  onEditAccountInfo,
  onLogout,
  defaultAvatar,
}) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <ScrollArea className="flex-grow">
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center">
            <AvatarUpload
              currentAvatar={userAvatar}
              onAvatarChange={handleAvatarChange}
              defaultAvatar={defaultAvatar}
              size={100}
            />
          </div>

          <div className="space-y-3 rounded-lg border p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold">{t('account-information')}</h3>
              <Button
                size="sm"
                onClick={onEditAccountInfo}
                className="bg-green-600 hover:bg-green-700 text-primary-foreground text-xs whitespace-normal leading-tight px-3" 
              >
                {t('change-account-info')}
              </Button>
            </div>
            <AccountInfoDisplay label={t('username')} value={initialUsername} />
            <AccountInfoDisplay label={t('email')} value={initialEmail} />
            <AccountInfoDisplay label={t('phone-number')} value={initialPhoneNumber} />
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

export default AccountTabContent;
