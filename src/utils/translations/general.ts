interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const generalTranslations: TranslationGroup = {
  'welcome': {
    en: 'Welcome',
    bg: 'Добре дошли'
  },
  'dashboard': {
    en: 'Dashboard',
    bg: 'Табло'
  },
  'settings': {
    en: 'Settings',
    bg: 'Настройки'
  },
  'logout': {
    en: 'Logout',
    bg: 'Изход'
  },
  'cancel': {
    en: 'Cancel',
    bg: 'Отказ'
  },
  'confirm': {
    en: 'Confirm',
    bg: 'Потвърди'
  },
  'save': {
    en: 'Save.',
    bg: 'Запази.'
  },
  'edit': {
    en: 'Edit.',
    bg: 'Редактирай.'
  },
  'delete': {
    en: 'Delete.',
    bg: 'Изтрий.'
  },
  'close': {
    en: 'Close.',
    bg: 'Затвори.'
  },
  'back': {
    en: 'Back.',
    bg: 'Назад.'
  },
  'next': {
    en: 'Next.',
    bg: 'Напред.'
  },
  'loading': {
    en: 'Loading...',
    bg: 'Зарежда...'
  },
  'error': {
    en: 'Error.',
    bg: 'Грешка.'
  },
  'success': {
    en: 'Success.',
    bg: 'Успех.'
  },
  'warning': {
    en: 'Warning.',
    bg: 'Предупреждение.'
  },
  'info': {
    en: 'Information.',
    bg: 'Информация.'
  },
  'yes': {
    en: 'Yes.',
    bg: 'Да.'
  },
  'no': {
    en: 'No.',
    bg: 'Не.'
  },
  'ok': {
    en: 'OK.',
    bg: 'ОК.'
  },
  'continue': {
    en: 'Continue.',
    bg: 'Продължи.'
  },
  'skip': {
    en: 'Skip.',
    bg: 'Прескочи.'
  },
  'retry': {
    en: 'Retry.',
    bg: 'Опитай отново.'
  },
  'refresh': {
    en: 'Refresh.',
    bg: 'Обнови.'
  },
  'update': {
    en: 'Update.',
    bg: 'Актуализирай.'
  },
  'upload': {
    en: 'Upload.',
    bg: 'Качи.'
  },
  'download': {
    en: 'Download.',
    bg: 'Свали.'
  },
  'share': {
    en: 'Share.',
    bg: 'Сподели.'
  },
  'copy': {
    en: 'Copy.',
    bg: 'Копирай.'
  },
  'paste': {
    en: 'Paste.',
    bg: 'Постави.'
  },
  'cut': {
    en: 'Cut.',
    bg: 'Изрежи.'
  },
  'select-all': {
    en: 'Select all.',
    bg: 'Избери всички.'
  },
  'clear': {
    en: 'Clear.',
    bg: 'Изчисти.'
  },
  'reset': {
    en: 'Reset.',
    bg: 'Нулирай.'
  },
  'submit': {
    en: 'Submit.',
    bg: 'Изпрати.'
  },
  'send': {
    en: 'Send.',
    bg: 'Изпрати.'
  },
  'receive': {
    en: 'Receive.',
    bg: 'Получи.'
  },
  'connect': {
    en: 'Connect.',
    bg: 'Свържи.'
  },
  'disconnect': {
    en: 'Disconnect.',
    bg: 'Прекъсни.'
  },
  'online': {
    en: 'Online.',
    bg: 'Онлайн.'
  },
  'offline': {
    en: 'Offline.',
    bg: 'Офлайн.'
  },
  'available': {
    en: 'Available.',
    bg: 'Достъпен.'
  },
  'unavailable': {
    en: 'Unavailable.',
    bg: 'Недостъпен.'
  },
  'enabled': {
    en: 'Enabled.',
    bg: 'Включен.'
  },
  'disabled': {
    en: 'Disabled.',
    bg: 'Изключен.'
  },
  'active': {
    en: 'Active.',
    bg: 'Активен.'
  },
  'inactive': {
    en: 'Inactive.',
    bg: 'Неактивен.'
  },
  'completed': {
    en: 'Completed',
    bg: 'Завършен'
  },
  'pending': {
    en: 'Pending',
    bg: 'Изчакване'
  },
  'failed': {
    en: 'Failed',
    bg: 'Неуспешен'
  },
  'processing': {
    en: 'Processing',
    bg: 'Обработва'
  },
  'searching': {
    en: 'Searching...',
    bg: 'Търси...'
  },
  'no-results': {
    en: 'No results found',
    bg: 'Няма намерени резултати'
  },
  'location-updated': {
    en: 'Location Updated',
    bg: 'Местоположението е обновено'
  },
  'location-updated-msg': {
    en: 'Your location has been successfully updated.',
    bg: 'Вашето местоположение беше успешно обновено.'
  },
  'location-access-denied': {
    en: 'Location Access Denied',
    bg: 'Достъпът до местоположение е отказан'
  },
  'location-access-message': {
    en: 'Please enable location access to get better service.',
    bg: 'Моля, разрешете достъп до местоположението за по-добро обслужване.'
  },
  'tap-to-view-details': {
    en: 'Tap to view details',
    bg: 'Докоснете за детайли'
  },
  'review-price-and-decide': {
    en: 'Review The Price And Decide',
    bg: 'Прегледайте цената и решете'
  },
  // Fixed index page texts - these will never change
  'app-subtitle': {
    en: 'Emergency road assistance when you need it most',
    bg: 'Спешна пътна помощ когато най-много се нуждаете от нея'
  },
  'user-app': {
    en: 'User App',
    bg: 'Потребителско приложение'
  },
  'for-customers': {
    en: 'For customers needing assistance',
    bg: 'За клиенти, нуждаещи се от помощ'
  },
  'open-user-app': {
    en: 'Open User App',
    bg: 'Отвори потребителското приложение'
  },
  'employee-app': {
    en: 'Employee App',
    bg: 'Служебно приложение'
  },
  'for-service-providers': {
    en: 'For service providers',
    bg: 'За доставчици на услуги'
  },
  'open-employee-app': {
    en: 'Open Employee App',
    bg: 'Отвори служебното приложение'
  },
  'account-manager-title': {
    en: 'RoadSaver Account Manager',
    bg: 'Мениджър на акаунти RoadSaver'
  },
  'account-manager-desc': {
    en: 'Manage user and employee accounts',
    bg: 'Управлявайте потребителски и служебни акаунти'
  },
  'open-account-manager': {
    en: 'Open Account Manager',
    bg: 'Отвори мениджъра на акаунти'
  },
  'ongoing-requests': {
    en: 'Ongoing Requests',
    bg: 'Текущи заявки'
  },
  'update-location': {
    en: 'Update Location',
    bg: 'Обнови местоположението'
  },
  'change-language': {
    en: 'Change Language',
    bg: 'Смени езика'
  },
  'request-history': {
    en: 'Request History',
    bg: 'История на заявките'
  },
  'requests-desc': {
    en: 'View all your previous service requests',
    bg: 'Вижте всички ваши предишни заявки за услуги'
  },
  'no-requests': {
    en: 'No requests found',
    bg: 'Няма намерени заявки'
  },
  'payment-options': {
    en: 'Payment Options',
    bg: 'Опции за плащане'
  },
  'payment-options-desc': {
    en: 'Payment options will be available in a future update.',
    bg: 'Опциите за плащане ще бъдат налични в бъдеща актуализация.'
  },
  'add-payment-method': {
    en: 'Add Payment Method',
    bg: 'Добави метод на плащане'
  },
  'account-info': {
    en: 'Account Information',
    bg: 'Информация за акаунта'
  },
  'change-account-info': {
    en: 'Change Account Information',
    bg: 'Промяна на информацията за акаунта'
  },
  'about-us': {
    en: 'About us',
    bg: 'За нас'
  },
  'about-us-desc': {
    en: 'We are committed to providing the best service possible.',
    bg: 'Ние сме ангажирани да предоставяме най-доброто възможно обслужване.'
  },
  'terms-and-conditions': {
    en: 'Terms and Conditions',
    bg: 'Общи условия'
  },
  'terms-and-conditions-desc': {
    en: 'Please read our terms and conditions before using the app.',
    bg: 'Моля, прочетете нашите общи условия преди да използвате приложението.'
  },
  'privacy-policy': {
    en: 'Privacy Policy',
    bg: 'Политика за поверителност'
  },
  'privacy-policy-desc': {
    en: 'Your privacy is important to us. Read our policy here.',
    bg: 'Вашата поверителност е важна за нас. Прочетете нашата политика тук.'
  },
  'help-and-support': {
    en: 'Help and Support',
    bg: 'Помощ и поддръжка'
  },
  'help-and-support-desc': {
    en: 'Contact us for help with any issues.',
    bg: 'Свържете се с нас за помощ при всякакви проблеми.'
  },
  'faq': {
    en: 'Frequently Asked Questions',
    bg: 'Често задавани въпроси'
  },
  'faq-desc': {
    en: 'Find answers to common questions here.',
    bg: 'Намерете отговори на често задавани въпроси тук.'
  },
  'version': {
    en: 'Version',
    bg: 'Версия'
  },
  'work-hours': {
    en: 'Emergency road assistance service work hours:',
    bg: 'Работно време на спешната пътна помощ:'
  },
  'work-hours-range': {
    en: 'Mon - Friday from 09:00 - 17:00.',
    bg: 'Понеделник - Петък от 09:00 до 17:00.'
  },
  'outside-hours': {
    en: 'For service requests outside of working hours, please contact support',
    bg: 'За заявки извън работното време, моля свържете се с поддръжката'
  },
  'contact-information': {
    en: 'Contact Information',
    bg: 'Контактна информация'
  },
  'email': {
    en: 'Email',
    bg: 'Имейл'
  },
  'phone': {
    en: 'Phone',
    bg: 'Телефон'
  },
  'facebook': {
    en: 'Facebook',
    bg: 'Фейсбук'
  },
  'messenger': {
    en: 'Messenger',
    bg: 'Месинджър'
  },
  'whatsapp': {
    en: 'WhatsApp',
    bg: 'УатсАп'
  },
  'viber': {
    en: 'Viber',
    bg: 'Вайбър'
  }
};
