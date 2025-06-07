interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

// UI elements and buttons translations
export const uiTranslations: TranslationGroup = {
  'cancel': {
    en: 'Cancel.',
    bg: 'Отказ'
  },
  'submit': {
    en: 'Submit.',
    bg: 'Изпращане'
  },
  'close': {
    en: 'Close.',
    bg: 'Затвори'
  },
  'send': {
    en: 'Send.',
    bg: 'Изпрати'
  },
  'accept': {
    en: 'Accept.',
    bg: 'Приеми'
  },
  'decline': {
    en: 'Decline.',
    bg: 'Откажи'
  },
  'error': {
    en: 'Error.',
    bg: 'Грешка'
  },
  'please-fill-fields': {
    en: 'Please fill in all fields.',
    bg: 'Моля, попълнете всички полета'
  },
  'valid-email': {
    en: 'Please enter a valid email address.',
    bg: 'Моля, въведете валиден имейл адрес'
  },
  'password-error': {
    en: 'Password error.',
    bg: 'Грешка в паролата'
  },
  'passwords-no-match': {
    en: 'Passwords do not match.',
    bg: 'Паролите не съвпадат'
  },
  'alert': {
    en: 'Alert.',
    bg: 'Предупреждение'
  },
  'alert-title': {
    en: 'Alert title.',
    bg: 'Заглавие на предупреждение'
  },
  'alert-description': {
    en: 'Alert description.',
    bg: 'Описание на предупреждение'
  },
  'confirm-cancellation-title': {
    en: 'Cancel request?',
    bg: 'Отказ на заявката?'
  },
  'confirm-cancellation-desc': {
    en: 'Are you sure you want to cancel your service request?',
    bg: 'Сигурни ли сте, че искате да отмените заявката си за услуга?'
  },
  'no': {
    en: 'No.',
    bg: 'Не'
  },
  'yes-cancel': {
    en: 'Yes, cancel.',
    bg: 'Да, отмени'
  },
  'info-icon-username-title': {
    en: 'Username Requirements',
    bg: 'Изисквания за потребителско име'
  },
  'info-icon-username-content': {
    en: "Usernames can contain letters (a-z), numbers (0-9), dashes (-), underscores (_), apostrophes ('), and periods (.). Usernames can't contain more than one period (.) in a row, accents, accented letters, ampersands (&), equal signs (=), brackets (<,>), plus signs (+), commas (,), or exclamation points (!). Usernames must begin with alphanumeric characters and can end with non-alphanumeric characters.",
    bg: "Потребителските имена могат да съдържат букви (a-z), цифри (0-9), тирета (-), долни черти (_), апострофи (') и точки (.). Потребителските имена не могат да съдържат повече от една точка (.) подред, ударения, букви с ударения, амперсанди (&), знаци за равенство (=), скоби (<,>), знаци плюс (+), запетаи (,) или удивителни знаци (!). Потребителските имена трябва да започват с буква или цифра и могат да завършват с неалфанумеричен символ."
  },
  'info-icon-password-title': {
    en: 'Password Requirements',
    bg: 'Изисквания за парола'
  },
  'info-icon-password-content': {
    en: 'Passwords must be at least 8 characters, include uppercase, lowercase, a number, a special character, and not contain forbidden words.',
    bg: 'Паролите трябва да са поне 8 символа, да съдържат главна и малка буква, цифра, специален символ и да не съдържат забранени думи.'
  },
  'info-icon-password-content-detailed': {
    en: 'Passwords must contain:\n1. A minimum of 1 upper case letter [A-Z] and\n2. A minimum of 1 lower case letter [a-z] and\n3. A minimum of 1 numeric character [0-9] and\n4. A minimum of 1 special character:\n ~`!@#$%^&*()-_+={}[]|\\;:\"<>,./? ',
    bg: 'Паролите трябва да съдържат:\n1. Поне 1 главна буква [A-Z] и\n2. Поне 1 малка буква [a-z] и\n3. Поне 1 цифра [0-9] и\n4. Поне 1 специален символ:\n ~`!@#$%^&*()-_+={}[]|\\;:\"<>,./? '
  },
};
