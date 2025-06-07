interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const authRegisterTranslations: TranslationGroup = {
  'create-account': {
    en: 'Create Account',
    bg: 'Създаване на акаунт'
  },
  'creating-account': {
    en: 'Creating Account...',
    bg: 'Създаване на акаунт...'
  },
  'registration-successful': {
    en: 'Registration Successful',
    bg: 'Успешна регистрация'
  },
  'account-created': {
    en: 'Your account has been created successfully',
    bg: 'Вашият акаунт беше създаден успешно'
  },
  'account-created-welcome': {
    en: 'Your account has been created. Welcome!',
    bg: 'Акаунтът ви е създаден. Добре дошли!'
  },
  'join-roadsaver-desc': {
    en: 'Join RoadSaver to get assistance with your problems on the road.',
    bg: 'Присъединете се към RoadSaver, за да получите съдействие при проблеми на пътя.'
  },
  'fill-all-fields': {
    en: 'Please fill in all required fields',
    bg: 'Моля, попълнете всички задължителни полета'
  },
  'password-requirements': {
    en: 'Must be at least 8 characters with 1 uppercase letter',
    bg: 'Трябва да е поне 8 символа с 1 главна буква'
  },
  'create-account-title': {
    en: 'Create Account',
    bg: 'Създаване на акаунт'
  },
  'create-account-desc': {
    en: 'Join RoadSaver to get assistance with your problems on the road.',
    bg: 'Присъединете се към RoadSaver, за да получите съдействие при проблеми на пътя.'
  },
  'username-placeholder': {
    en: 'Enter your username',
    bg: 'Въведете вашето потребителско име'
  },
  'email-placeholder': {
    en: 'Enter your email address',
    bg: 'Въведете вашия имейл адрес'
  },
  'phone-placeholder': {
    en: '+359',
    bg: '+359'
  },
  'phone-helper-text': {
    en: 'Must be 13 characters starting with +359',
    bg: 'Трябва да е 13 символа, започващ с +359'
  },
  'gender-man': {
    en: 'Man',
    bg: 'Мъж'
  },
  'gender-woman': {
    en: 'Woman',
    bg: 'Жена'
  },
  'gender-unspecified': {
    en: 'Not specified',
    bg: 'Не е посочено'
  },
  'password-helper-text': {
    en: 'Must be at least 8 characters with 1 uppercase letter',
    bg: 'Трябва да е поне 8 символа с 1 главна буква'
  },
  'password-placeholder': {
    en: 'Create a password',
    bg: 'Създайте парола'
  },
  'confirm-password-placeholder': {
    en: 'Confirm your password',
    bg: 'Потвърдете вашата парола'
  },
  'back-to-login': {
    en: 'Back to Login',
    bg: 'Обратно към входа'
  }
};
