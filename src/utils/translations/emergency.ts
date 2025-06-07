
interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

// Emergency services related translations
export const emergencyTranslations: TranslationGroup = {
  'police': {
    en: 'Police',
    bg: 'Полиция'
  },
  'ambulance': {
    en: 'Ambulance',
    bg: 'Линейка'
  },
  'fire': {
    en: 'Fire Department',
    bg: 'Пожарна'
  },
  'emergency-services': {
    en: 'Emergency Services',
    bg: 'Спешни служби'
  },
  'emergency-services-desc': {
    en: 'Contact emergency services for immediate assistance',
    bg: 'Свържете се със спешните служби за незабавна помощ'
  },
  'national-emergency': {
    en: 'Call the National Emergency Number',
    bg: 'Обадете се на Националния Спешен Номер'
  },
  'emergency-number': {
    en: '112',
    bg: '112'
  },
  'calling-emergency': {
    en: 'Calling Emergency Services',
    bg: 'Обаждане към Спешните Служби'
  },
  'connecting-emergency': {
    en: 'Connecting to emergency services...',
    bg: 'Свързване със спешните служби...'
  },
};
