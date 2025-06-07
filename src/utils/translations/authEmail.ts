
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const authEmailTranslations: TranslationGroup = {
  'email': {
    en: 'Email',
    bg: 'Имейл'
  },
  'enter-email-placeholder': {
    en: 'Enter your email address',
    bg: 'Въведете вашия имейл адрес'
  },
  'email-invalid-format': {
    en: 'Please enter a valid email address',
    bg: 'Моля, въведете валиден имейл адрес'
  },
  'email-taken-error': {
    en: 'This email is already registered',
    bg: 'Този имейл вече е регистриран'
  },
  'email-profanity-error': {
    en: 'Email contains inappropriate words',
    bg: 'Имейлът съдържа неподходящи думи'
  },
  'email-valid': {
    en: 'Email address is valid',
    bg: 'Имейл адресът е валиден'
  },
  'change-email-colon': {
    en: 'Change email:',
    bg: 'Промяна на имейл:'
  },
  'email-update-success': {
    en: 'Email updated successfully.',
    bg: 'Имейлът е актуализиран успешно.'
  }
};

