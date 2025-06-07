
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const authUsernameTranslations: TranslationGroup = {
  'username': {
    en: 'Username',
    bg: 'Потребителско име'
  },
  'enter-username': {
    en: 'Enter your username',
    bg: 'Въведете вашето потребителско име'
  },
  'username-requirements': {
    en: 'Must be between 6 - 20 characters. Spaces are not allowed.',
    bg: 'Трябва да е между 6 - 20 символа. Интервалите не са позволени.'
  },
  'username-info-title': {
    en: 'Username Requirements',
    bg: 'Изисквания за потребителско име'
  },
  'username-info-content': {
    en: 'You will not have an option to change your username after registration.\n\nUsernames can contain letters (a-z), numbers (0-9), dashes (-), underscores (_), apostrophes (\'), and periods (.).\n\nUsernames can\'t contain more than one period (.) in a row, accents, accented letters, ampersands (&), equal signs (=), brackets (<,>), plus signs (+), commas (,), or exclamation points (!).\n\nUsernames must begin with alphanumeric characters and can end with non-alphanumeric characters.',
    bg: 'Няма да имате опция да промените потребителското си име след регистрация.\n\nПотребителските имена могат да съдържат букви (a-z), цифри (0-9), тирета (-), долни черти (_), апострофи (\') и точки (.).\n\nПотребителските имена не могат да съдържат повече от една точка (.) подред, ударения, букви с ударения, амперсанди (&), знаци за равенство (=), скоби (<,>), знаци плюс (+), запетаи (,) или удивителни знаци (!).\n\nПотребителските имена трябва да започват с буквено-цифрови знаци и могат да завършват с не-буквено-цифрови знаци.'
  },
  'username-min-length-error': {
    en: 'Username must be at least 6 characters',
    bg: 'Потребителското име трябва да е поне 6 символа'
  },
  'username-taken-error': {
    en: 'This username is already taken',
    bg: 'Това потребителско име е заето'
  },
  'username-profanity-error': {
    en: 'Username contains inappropriate words',
    bg: 'Потребителското име съдържа неподходящи думи'
  },
  'username-valid': {
    en: 'Username is available',
    bg: 'Потребителското име е налично'
  },
  'change-username-colon': {
    en: 'Change username:',
    bg: 'Промяна на потребителско име:'
  },
  'username-update-success': {
    en: 'Username updated successfully.',
    bg: 'Потребителското име е актуализирано успешно.'
  }
};
