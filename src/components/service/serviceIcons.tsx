import React from 'react';
import { Fuel, Wrench, Phone, AlertTriangle, Mail, Disc3, BatteryCharging } from 'lucide-react';

export type ServiceType = 'flat-tyre' | 'out-of-fuel' | 'other-car-problems' | 'tow-truck' | 'emergency' | 'support' | 'car-battery';

interface ServiceIconData {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const iconConfigurations: Record<ServiceType, {
  customSvgUrl?: string;
  animationClass: string;
  fallbackLucideIcon: React.ComponentType<any>;
}> = {
  'flat-tyre': {
    customSvgUrl: '/lovable-uploads/flat-tire.svg',
    animationClass: 'animate-deflate-wobble',
    fallbackLucideIcon: Disc3
  },
  'out-of-fuel': {
    customSvgUrl: '/lovable-uploads/low-fuel.svg',
    animationClass: 'animate-fuel-pulse-flash',
    fallbackLucideIcon: Fuel
  },
  'other-car-problems': {
    customSvgUrl: '/lovable-uploads/other-car-problems.svg',
    animationClass: 'animate-wrench-turn',
    fallbackLucideIcon: Wrench
  },
  'car-battery': {
    customSvgUrl: '/lovable-uploads/jumper_cables_with_battery.svg',
    animationClass: 'animate-battery-flash-red',
    fallbackLucideIcon: BatteryCharging
  },
  'tow-truck': {
    customSvgUrl: '/lovable-uploads/tow-truck.svg',
    animationClass: 'animate-truck-pull',
    fallbackLucideIcon: Wrench
  },
  'support': {
    customSvgUrl: '/lovable-uploads/contact-support.svg',
    animationClass: 'animate-phone-ring',
    fallbackLucideIcon: Phone
  },
  'emergency': {
    animationClass: 'animate-emergency-alert-flash',
    fallbackLucideIcon: AlertTriangle
  }
};

export const getServiceIconAndTitle = (
  type: ServiceType, 
  t: (key: string) => string, 
  processedTowTruckIconUrl: string | null, 
  iconSizeClass: string
): ServiceIconData => {
  const config = iconConfigurations[type];
  
  if (config.customSvgUrl) {
    return {
      icon: (
        <img 
          src={config.customSvgUrl} 
          alt={t(type)} 
          className={`${iconSizeClass} ${config.animationClass} object-contain filter-icon-color`}
          loading="lazy"
        />
      ),
      title: t(type),
      description: t(`${type}-desc`)
    };
  }

  const LucideIcon = config.fallbackLucideIcon;
  const iconColor = type === 'emergency' ? 'text-red-500' : 'text-black dark:text-white';
  
  return {
    icon: <LucideIcon className={`${iconSizeClass} ${config.animationClass} ${iconColor}`} />,
    title: t(type),
    description: t(`${type}-desc`)
  };
};

export const ContactDialogIcons = {
  email: <Mail className="h-4 w-4 mr-2" />,
  phone: <Phone className="h-4 w-4 mr-2" />
};