import { allTranslations } from './consolidated';

export const useTranslation = (language: 'en' | 'bg') => {
  return (key: string): string => {
    const translation = allTranslations[key];
    if (!translation) return key;
    return language === 'en' ? translation.en : translation.bg;
  };
};