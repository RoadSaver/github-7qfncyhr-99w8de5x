interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const authLoginTranslations: TranslationGroup = {
  'sign-in': {
    en: 'Sign In',
    bg: 'Вход'
  },
  'signing-in': {
    en: 'Signing in...',
    bg: 'Влизане...'
  },
  'back-to-login': {
    en: 'Back to Login',
    bg: 'Обратно към входа'
  },
  'invalid-username-password': {
    en: 'Invalid username or password',
    bg: 'Невалидно потребителско име или парола'
  },
  'please-enter-both': {
    en: 'Please enter both username and password',
    bg: 'Моля, въведете потребителско име и парола'
  },
  'login-successful': {
    en: 'Login Successful',
    bg: 'Успешен вход'
  },
  'welcome-to-roadsaver': {
    en: 'Welcome to RoadSaver!',
    bg: 'Добре дошли в RoadSaver!'
  },
  'welcome-back': {
    en: 'Welcome back to RoadSaver',
    bg: 'Добре дошли отново в RoadSaver'
  },
  'username': {
    en: 'Username',
    bg: 'Потребителско име'
  },
  'password': {
    en: 'Password',
    bg: 'Парола'
  },
  'enter-username-placeholder': {
    en: 'Enter your username',
    bg: 'Въведете вашето потребителско име'
  },
  'enter-password-placeholder': {
    en: 'Enter your password',
    bg: 'Въведете вашата парола'
  },
  'create-account': {
    en: 'Create Account',
    bg: 'Създаване на акаунт'
  },
  'employee-dashboard': {
    en: 'Dashboard for Employees',
    bg: 'Табло за служители'
  },
  'sign-in-title': {
    en: 'Sign In',
    bg: 'Вход'
  },
  'sign-in-desc': {
    en: 'Welcome back to RoadSaver',
    bg: 'Добре дошли отново в RoadSaver'
  },
  'username-label': {
    en: 'Username',
    bg: 'Потребителско име'
  },
  'password-label': {
    en: 'Password',
    bg: 'Парола'
  },
  'Sign In': {
    en: 'Sign In',
    bg: 'Вход'
  },
  'Create Account': {
    en: 'Create Account',
    bg: 'Създаване на акаунт'
  },
  'Username': {
    en: 'Username',
    bg: 'Потребителско име'
  },
  'Password': {
    en: 'Password',
    bg: 'Парола'
  },
  'Welcome back to RoadSaver': {
    en: 'Welcome back to RoadSaver',
    bg: 'Добре дошли отново в RoadSaver'
  }
};
