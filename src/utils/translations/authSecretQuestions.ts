interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const authSecretQuestions: TranslationGroup = {
  'secret-question-1': {
    en: 'Secret Question 1',
    bg: 'Таен въпрос 1'
  },
  'secret-question-2': {
    en: 'Secret Question 2',
    bg: 'Таен въпрос 2'
  },
  'select-question': {
    en: 'Select a question',
    bg: 'Изберете въпрос'
  },
  'your-answer': {
    en: 'Your Answer',
    bg: 'Вашият отговор'
  },
  'enter-your-answer': {
    en: 'Enter your answer',
    bg: 'Въведете вашия отговор'
  },
  'create-your-own-question': {
    en: 'Create your own question',
    bg: 'Създайте свой въпрос'
  },
  'enter-your-custom-question': {
    en: 'Enter your custom question',
    bg: 'Въведете вашия персонален въпрос'
  },
  'back-to-questions': {
    en: 'Back to questions',
    bg: 'Обратно към въпросите'
  },
  'secret-question-required': {
    en: 'Please select a secret question',
    bg: 'Моля, изберете таен въпрос'
  },
  'secret-answer-required': {
    en: 'Please provide an answer',
    bg: 'Моля, предоставете отговор'
  },
  'secret-answer-too-short': {
    en: 'Answer must be at least 2 characters',
    bg: 'Отговорът трябва да е поне 2 символа'
  },
  'custom-question-required': {
    en: 'Please enter a custom question',
    bg: 'Моля, въведете персонален въпрос'
  },
  'custom-question-too-short': {
    en: 'Custom question must be at least 5 characters',
    bg: 'Персоналният въпрос трябва да е поне 5 символа'
  },
  'secret-questions-must-be-different': {
    en: 'Secret questions must be different from each other',
    bg: 'Тайните въпроси трябва да се различават един от друг'
  },
  
  // Predefined secret questions
  'mothers-maiden-name': {
    en: "What is your mother's maiden name?",
    bg: 'Какво е моминското име на майка ви?'
  },
  'first-pet-name': {
    en: 'What was the name of your first pet?',
    bg: 'Как се казваше първият ви домашен любимец?'
  },
  'birth-city': {
    en: 'In what city were you born?',
    bg: 'В кой град сте родени?'
  },
  'elementary-school': {
    en: 'What was the name of your elementary school?',
    bg: 'Как се казваше началното ви училище?'
  },
  'favorite-teacher': {
    en: 'What was the name of your favorite teacher?',
    bg: 'Как се казваше любимият ви учител?'
  },
  'childhood-friend': {
    en: 'What was the name of your best childhood friend?',
    bg: 'Как се казваше най-добрият ви приятел от детството?'
  },
  'first-car': {
    en: 'What was the make of your first car?',
    bg: 'Каква беше марката на първата ви кола?'
  },
  'favorite-book': {
    en: 'What is your favorite book?',
    bg: 'Коя е любимата ви книга?'
  },
  'childhood-nickname': {
    en: 'What was your childhood nickname?',
    bg: 'Какъв беше прякорът ви в детството?'
  },
  'favorite-food': {
    en: 'What is your favorite food?',
    bg: 'Коя е любимата ви храна?'
  },
  'street-grew-up': {
    en: 'What street did you grow up on?',
    bg: 'На коя улица израснахте?'
  },
  'fathers-middle-name': {
    en: "What is your father's middle name?",
    bg: 'Какво е бащиното име на баща ви?'
  },
  'high-school-mascot': {
    en: 'What was your high school mascot?',
    bg: 'Какъв беше талисманът на гимназията ви?'
  },
  'first-job': {
    en: 'What was your first job?',
    bg: 'Каква беше първата ви работа?'
  },
  'dream-vacation': {
    en: 'What is your dream vacation destination?',
    bg: 'Къде е мечтаната ви ваканционна дестинация?'
  }
};