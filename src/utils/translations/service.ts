import { startTransition } from "react";

interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

// Service-related translations
export const serviceTranslations: TranslationGroup = {
  'flat-tyre': {
    en: 'Flat Tyre',
    bg: 'Спукана Гума'
  },
  'flat-tyre-desc': {
    en: 'Get help changing a flat tyre.',
    bg: 'Получете помощ за смяна на спукана гума.'
  },
  'out-of-fuel': {
    en: 'Out of Fuel',
    bg: 'Без Гориво'
  },
  'out-of-fuel-desc': {
    en: 'Request fuel delivery.',
    bg: 'Заявете доставка на гориво.'
  },
  'car-battery': {
    en: 'Car Battery Issues/ Starting Issues',
    bg: 'Проблеми С Акумулатора/Проблеми Със Запалването'
  },
  'car-battery-desc': {
    en: 'Get help with your car battery issues or vehicle starting problems.',
    bg: 'Получете помощ при проблеми с акумулатора,или ако колата ви не може да запали.'
  },
  'other-car-problems': {
    en: 'Other Car Problems',
    bg: 'Други проблеми с колата'
  },
  'other-car-problems-desc': {
    en: 'Get help with various car problems.',
    bg: 'Получете помощ при различни проблеми с автомобила.'
  },
  'tow-truck': {
    en: 'Tow Truck',
    bg: 'Пътна Помощ(Репатрак)'
  },
  'tow-truck-desc': {
    en: 'Request towing service',
    bg: 'Заявете пътна помощ(репатрак).'
  },
  'support': {
    en: 'Contact Support',
    bg: 'Свържете Се С Поддръжката'
  },
  'support-desc': {
    en: 'Speak with our support team or sendus an email..',
    bg: 'Говорете с нашия екип за поддръжка или ни изпратете имейл.'
  },
  'service': {
    en: 'Service',
    bg: 'Услуга'
  },
  'service-desc': {
    en: 'Request assistance',
    bg: 'Заявка за помощ'
  },
  'services': {
    en: 'Services',
    bg: 'Услуги'
  },
  'ongoing-requests': {
    en: 'Ongoing Requests',
    bg: 'Текущи заявки'
  },
  'service-requests': {
    en: 'Service Requests',
    bg: 'Заявки за услуги'
  },
  'service-request': {
    en: 'Service Request:',
    bg: 'Заявка за услуга:'
  },
  'new-service-request': {
    en: 'You have received a new service request.',
    bg: 'Получихте нова заявка за услуга.'
  },
  'decline-service-request': {
    en: 'Decline Service Request',
    bg: 'Отказване на заявката за услуга'
  },
  'from': {
    en: 'From:',
    bg: 'От:'
  },
  'write-email': {
    en: 'Write us an email.',
    bg: 'Напишете ни имейл.'
  },
  'give-call': {
    en: 'Give us a call.',
    bg: 'Обадете ни се.'
  },
  'contact-options': {
    en: 'Contact Options',
    bg: 'Опции за контакт'
  },
  'new-request': {
    en: 'New Request',
    bg: 'Нова заявка'
  },
  'outside-hours': {
    en: 'For service requests outside of working hours, please contact support.',
    bg: 'За заявки за услуги извън работното време, моля свържете се с поддръжката.'
  },
  'phone-number': {
    en: 'Phone number:',
    bg: 'Телефонен номер:'
  },
  'completed-at': {
    en: 'Completed at',
    bg: 'Завършено в'
  }
};
