import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/utils/translations';
import ContactDialog from './ContactDialog';
import { ServiceType, getServiceIconAndTitle } from './serviceIcons';

interface ServiceCardProps {
  type: ServiceType;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = memo(({ type, onClick }) => {
  const { language } = useApp();
  const t = useTranslation(language);
  const [showContactDialog, setShowContactDialog] = React.useState(false);
  
  const handleClick = React.useCallback(() => {
    if (type === 'support') {
      setShowContactDialog(true);
    } else {
      onClick();
    }
  }, [type, onClick]);
  
  const handleEmailContact = React.useCallback(() => {
    window.location.href = 'mailto:roadsaverapp@gmail.com';
    setShowContactDialog(false);
  }, []);
  
  const handlePhoneContact = React.useCallback(() => {
    window.location.href = 'tel:+359888123456';
    setShowContactDialog(false);
  }, []);
  
  const { icon, title, description } = getServiceIconAndTitle(type, t, null, "h-8 w-8 sm:h-10 sm:w-10");
  
  return (
    <>
      <Card 
        className="group p-3 sm:p-4 hover:bg-secondary/70 transition-colors cursor-pointer flex flex-col min-h-[120px] sm:min-h-[140px]" 
        onClick={handleClick}
      >
        <div className="flex justify-center items-center h-12 sm:h-16 mb-2 sm:mb-3">
          <div className="bg-roadsaver-primary/10 p-3 sm:p-4 text-roadsaver-primary transition-transform duration-200 group-hover:scale-110 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center text-center">
          <h3 className="text-sm sm:text-lg font-semibold mb-1 leading-tight min-h-[1.5rem] sm:min-h-[2rem] flex items-center justify-center">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-tight min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center">
            {description}
          </p>
        </div>
      </Card>

      {showContactDialog && (
        <ContactDialog 
          open={showContactDialog} 
          onOpenChange={setShowContactDialog} 
          onEmailContact={handleEmailContact} 
          onPhoneContact={handlePhoneContact} 
          contactOptionsText={t('contact-options')} 
          supportDescText={t('support-desc')} 
          writeEmailText={t('write-email')} 
          giveCallText={t('give-call')} 
        />
      )}
    </>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;