
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const authPhoneTranslations: TranslationGroup = {
  'phone-number-label': {
    en: 'Phone Number',
    bg: 'Телефонен номер'
  },
  'phone-placeholder': {
    en: '+359XXXXXXXXX',
    bg: '+359XXXXXXXXX'
  },
  'phone-helper-text': {
    en: 'Must be 13 characters starting with +359',
    bg: 'Трябва да е 13 символа, започващ с +359'
  },
  'phone-error-title': {
    en: 'Phone Number Error',
    bg: 'Грешка в телефонния номер'
  },
  'phone-invalid-format': {
    en: 'Phone number must be exactly 13 characters starting with +359',
    bg: 'Телефонният номер трябва да е точно 13 символа, започващ с +359'
  },
  'change-phone-colon': {
    en: 'Change phone number:',
    bg: 'Промяна на телефонен номер:'
  },
  'phone-update-success': {
    en: 'Phone number updated successfully.',
    bg: 'Телефонният номер е актуализиран успешно.'
  }
};

