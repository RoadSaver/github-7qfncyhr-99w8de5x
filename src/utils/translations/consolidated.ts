interface TranslationEntry {
  en: string;
  bg: string;
}

interface TranslationGroup {
  [key: string]: TranslationEntry;
}

export const allTranslations: TranslationGroup = {
  // Auth General
  'logged-out': { en: 'Logged Out', bg: 'Излязохте' },
  'logged-out-msg': { en: 'You have been successfully logged out.', bg: 'Успешно излязохте от системата.' },
  'auth-error': { en: 'Authentication Failed', bg: 'Неуспешна автентикация' },
  'user-account': { en: 'User Account', bg: 'Потребителски акаунт' },
  'auth-subtitle': { en: 'Road assistance services for every need.', bg: 'Услуги за пътна помощ за всяка нужда.' },
  'error-title': { en: 'Error', bg: 'Грешка' },
  'save': { en: 'Save', bg: 'Запази' },
  'cancel': { en: 'Cancel', bg: 'Отказ' },
  'close': { en: 'Close', bg: 'Затвори' },
  'ongoing-requests': { en: 'Ongoing Requests', bg: 'Текущи заявки' },

  // Auth Username
  'username': { en: 'Username', bg: 'Потребителско име' },
  'enter-username': { en: 'Enter your username', bg: 'Въведете вашето потребителско име' },
  'enter-username-placeholder': { en: 'Enter username', bg: 'Въведете потребителско име' },
  'username-requirements': { en: 'Must be 6-20 characters, start with letter/number', bg: 'Трябва да е 6-20 символа, започва с буква/цифра' },
  'username-taken-error': { en: 'This username is already taken', bg: 'Това потребителско име е заето' },
  'username-valid': { en: 'Username is valid', bg: 'Потребителското име е валидно' },
  'username-update-success': { en: 'Username updated successfully.', bg: 'Потребителското име е актуализирано успешно.' },

  // Auth Email
  'email': { en: 'Email', bg: 'Имейл' },
  'enter-email-placeholder': { en: 'Enter your email address', bg: 'Въведете вашия имейл адрес' },
  'email-invalid-format': { en: 'Please enter a valid email address', bg: 'Моля, въведете валиден имейл адрес' },
  'email-taken-error': { en: 'This email is already registered', bg: 'Този имейл вече е регистриран' },
  'email-valid': { en: 'Email address is valid', bg: 'Имейл адресът е валиден' },
  'email-update-success': { en: 'Email updated successfully.', bg: 'Имейлът е актуализиран успешно.' },

  // Auth Password
  'password': { en: 'Password', bg: 'Парола' },
  'enter-password-placeholder': { en: 'Enter password', bg: 'Въведете парола' },
  'create-password-placeholder': { en: 'Create a password', bg: 'Създайте парола' },
  'confirm-password': { en: 'Confirm Password', bg: 'Потвърдете паролата' },
  'confirm-password-placeholder': { en: 'Confirm your password', bg: 'Потвърдете вашата парола' },
  'password-requirements': { en: 'Must be 8+ characters with uppercase, lowercase, number, and special character', bg: 'Трябва да е 8+ символа с главна, малка буква, цифра и специален символ' },
  'passwords-do-not-match': { en: 'Passwords do not match', bg: 'Паролите не съвпадат' },
  'password-valid': { en: 'Password is valid', bg: 'Паролата е валидна' },
  'confirm-password-valid': { en: 'Passwords match', bg: 'Паролите съвпадат' },
  'password-update-success': { en: 'Password updated successfully.', bg: 'Паролата е актуализирана успешно.' },
  'show-password': { en: 'Show password', bg: 'Покажи паролата' },
  'hide-password': { en: 'Hide password', bg: 'Скрий паролата' },

  // Auth Phone
  'phone-number-label': { en: 'Phone Number', bg: 'Телефонен номер' },
  'phone-placeholder': { en: '+359XXXXXXXXX', bg: '+359XXXXXXXXX' },
  'phone-invalid-format': { en: 'Phone number must be exactly 13 characters starting with +359', bg: 'Телефонният номер трябва да е точно 13 символа, започващ с +359' },
  'phone-update-success': { en: 'Phone number updated successfully.', bg: 'Телефонният номер е актуализиран успешно.' },

  // Auth Gender
  'gender-label': { en: 'Gender', bg: 'Пол' },
  'man-label': { en: 'Man', bg: 'Мъж' },
  'woman-label': { en: 'Woman', bg: 'Жена' },
  'not-specified-label': { en: 'Not specified', bg: 'Не е посочено' },

  // Auth Register
  'create-account': { en: 'Create Account', bg: 'Създаване на акаунт' },
  'creating-account': { en: 'Creating Account...', bg: 'Създаване на акаунт...' },
  'registration-successful': { en: 'Registration Successful', bg: 'Успешна регистрация' },
  'account-created': { en: 'Your account has been created successfully', bg: 'Вашият акаунт беше създаден успешно' },
  'join-roadsaver-desc': { en: 'Join RoadSaver to get assistance with your problems on the road.', bg: 'Присъединете се към RoadSaver, за да получите съдействие при проблеми на пътя.' },
  'fill-all-fields': { en: 'Please fill in all required fields', bg: 'Моля, попълнете всички задължителни полета' },
  'Back to Login': { en: 'Back to Login', bg: 'Обратно към входа' },

  // Auth Login
  'Sign In': { en: 'Sign In', bg: 'Вход' },
  'signing-in': { en: 'Signing in...', bg: 'Влизане...' },
  'Create Account': { en: 'Create Account', bg: 'Създаване на акаунт' },
  'login-successful': { en: 'Login Successful', bg: 'Успешен вход' },
  'welcome-to-roadsaver': { en: 'Welcome to RoadSaver!', bg: 'Добре дошли в RoadSaver!' },
  'invalid-username-password': { en: 'Invalid username or password', bg: 'Невалидно потребителско име или парола' },
  'please-enter-both': { en: 'Please enter both username and password', bg: 'Моля, въведете потребителско име и парола' },
  'Welcome back to RoadSaver': { en: 'Welcome back to RoadSaver', bg: 'Добре дошли обратно в RoadSaver' },

  // Secret Questions
  'secret-question-1': { en: 'Secret Question 1', bg: 'Таен въпрос 1' },
  'secret-question-2': { en: 'Secret Question 2', bg: 'Таен въпрос 2' },
  'select-question': { en: 'Select a question', bg: 'Изберете въпрос' },
  'your-answer': { en: 'Your Answer', bg: 'Вашият отговор' },
  'enter-your-answer': { en: 'Enter your answer', bg: 'Въведете вашия отговор' },
  'create-your-own-question': { en: 'Create your own question', bg: 'Създайте свой въпрос' },
  'secret-questions-must-be-different': { en: 'Secret questions must be different from each other', bg: 'Тайните въпроси трябва да се различават един от друг' },

  // Services
  'services': { en: 'Services', bg: 'Услуги' },
  'flat-tyre': { en: 'Flat Tyre', bg: 'Спукана гума' },
  'flat-tyre-desc': { en: 'Quick tyre replacement service', bg: 'Бърза смяна на гуми' },
  'out-of-fuel': { en: 'Out of Fuel', bg: 'Без гориво' },
  'out-of-fuel-desc': { en: 'Emergency fuel delivery', bg: 'Спешна доставка на гориво' },
  'car-battery': { en: 'Car Battery', bg: 'Акумулатор' },
  'car-battery-desc': { en: 'Battery jump start service', bg: 'Стартиране на акумулатор' },
  'other-car-problems': { en: 'Other Problems', bg: 'Други проблеми' },
  'other-car-problems-desc': { en: 'General car assistance', bg: 'Обща помощ за автомобил' },
  'tow-truck': { en: 'Tow Truck', bg: 'Пътна помощ' },
  'tow-truck-desc': { en: 'Vehicle towing service', bg: 'Услуга за теглене на превозни средства' },
  'support': { en: 'Support', bg: 'Поддръжка' },
  'support-desc': { en: 'Contact customer support', bg: 'Свържете се с поддръжката' },

  // Emergency
  'emergency-services': { en: 'Emergency Services', bg: 'Спешни услуги' },
  'emergency-services-desc': { en: 'Call emergency services immediately', bg: 'Обадете се на спешните услуги незабавно' },
  'national-emergency': { en: 'National Emergency', bg: 'Национална спешност' },
  'emergency-number': { en: '112', bg: '112' },
  'calling-emergency': { en: 'Calling Emergency Services', bg: 'Обаждане на спешните услуги' },
  'connecting-emergency': { en: 'Connecting to emergency services...', bg: 'Свързване със спешните услуги...' },

  // General
  'dashboard': { en: 'Dashboard', bg: 'Табло' },
  'settings': { en: 'Settings', bg: 'Настройки' },
  'logout': { en: 'Logout', bg: 'Изход' },
  'loading': { en: 'Loading...', bg: 'Зарежда...' },
  'completed': { en: 'Completed', bg: 'Завършен' },
  'pending': { en: 'Pending', bg: 'Изчакване' },
  'yes': { en: 'Yes', bg: 'Да' },
  'no': { en: 'No', bg: 'Не' },
  'update-location': { en: 'Update Location', bg: 'Обнови местоположението' },
  'change-language': { en: 'Change Language', bg: 'Смени езика' },
  'location-updated': { en: 'Location Updated', bg: 'Местоположението е обновено' },
  'location-updated-msg': { en: 'Your location has been successfully updated.', bg: 'Вашето местоположение беше успешно обновено.' },

  // Settings
  'account': { en: 'Account', bg: 'Акаунт' },
  'history': { en: 'History', bg: 'История' },
  'payment': { en: 'Payment', bg: 'Плащане' },
  'about': { en: 'About', bg: 'За нас' },
  'configure-preferences': { en: 'Configure your preferences and account settings', bg: 'Конфигурирайте вашите предпочитания и настройки на акаунта' },
  'account-information': { en: 'Account Information', bg: 'Информация за акаунта' },
  'change-account-info': { en: 'Change account information', bg: 'Промяна на информацията за акаунта' },
  'request-history': { en: 'Request History', bg: 'История на заявките' },
  'requests-desc': { en: 'View all your previous service requests', bg: 'Вижте всички ваши предишни заявки за услуги' },
  'no-requests': { en: 'No requests found', bg: 'Няма намерени заявки' },
  'payment-options': { en: 'Payment Options', bg: 'Опции за плащане' },
  'payment-future-update': { en: 'Payment options will be available in a future update.', bg: 'Опциите за плащане ще бъдат налични в бъдеща актуализация.' },
  'add-payment-method': { en: 'Add Payment Method', bg: 'Добави метод на плащане' },
  'version': { en: 'Version', bg: 'Версия' },
  'contact-information': { en: 'Contact Information', bg: 'Контактна информация' },
  'phone': { en: 'Phone', bg: 'Телефон' },

  // Status
  'accepted': { en: 'Accepted', bg: 'Приет' },
  'declined': { en: 'Declined', bg: 'Отказан' },
  'new': { en: 'New', bg: 'Нов' },
  'from': { en: 'from', bg: 'от' },
  'accept': { en: 'Accept', bg: 'Приеми' },
  'decline': { en: 'Decline', bg: 'Откажи' },

  // Employee
  'employee-dashboard': { en: 'Employee Dashboard', bg: 'Служебно табло' },
  'service-requests': { en: 'Service Requests', bg: 'Заявки за услуги' },
  'new-request': { en: 'New Request', bg: 'Нова заявка' },
  'new-service-request': { en: 'A new service request has arrived', bg: 'Пристигна нова заявка за услуга' },
  'request-accepted': { en: 'Request Accepted', bg: 'Заявката е приета' },
  'request-declined': { en: 'Request Declined', bg: 'Заявката е отказана' },
  'customer-location': { en: 'Customer Location', bg: 'Местоположение на клиента' },
  'decline-service-request': { en: 'Decline Service Request', bg: 'Отказване на заявка за услуга' },
  'decline-reason': { en: 'Please provide a reason for declining this request (minimum 50 characters):', bg: 'Моля, предоставете причина за отказването на тази заявка (минимум 50 символа):' },
  'enter-decline-reason': { en: 'Enter reason for declining...', bg: 'Въведете причина за отказването...' },
  'characters': { en: 'characters', bg: 'символа' },
  'minimum': { en: 'minimum', bg: 'минимум' },
  'send': { en: 'Send', bg: 'Изпрати' },
  'employee-login-successful': { en: 'Employee Login Successful', bg: 'Успешен вход на служител' },
  'welcome-employee-dashboard': { en: 'Welcome to the employee dashboard', bg: 'Добре дошли в служебното табло' },

  // Index page
  'app-subtitle': { en: 'Emergency road assistance when you need it most', bg: 'Спешна пътна помощ когато най-много се нуждаете от нея' },
  'user-app': { en: 'User App', bg: 'Потребителско приложение' },
  'for-customers': { en: 'For customers needing assistance', bg: 'За клиенти, нуждаещи се от помощ' },
  'open-user-app': { en: 'Open User App', bg: 'Отвори потребителското приложение' },
  'employee-app': { en: 'Employee App', bg: 'Служебно приложение' },
  'for-service-providers': { en: 'For service providers', bg: 'За доставчици на услуги' },
  'open-employee-app': { en: 'Open Employee App', bg: 'Отвори служебното приложение' },
  'account-manager-title': { en: 'RoadSaver Account Manager', bg: 'Мениджър на акаунти RoadSaver' },
  'account-manager-desc': { en: 'Manage user and employee accounts', bg: 'Управлявайте потребителски и служебни акаунти' },
  'open-account-manager': { en: 'Open Account Manager', bg: 'Отвори мениджъра на акаунти' },

  // Contact
  'contact-options': { en: 'Contact Options', bg: 'Опции за контакт' },
  'write-email': { en: 'Write Email', bg: 'Напишете имейл' },
  'give-call': { en: 'Give us a call', bg: 'Обадете ни се' },

  // Misc
  'confirm-cancellation-title': { en: 'Cancel request?', bg: 'Отказ на заявката?' },
  'confirm-cancellation-desc': { en: 'Are you sure you want to cancel your service request?', bg: 'Сигурни ли сте, че искате да отмените заявката си за услуга?' },
  'yes-cancel': { en: 'Yes, cancel', bg: 'Да, отмени' },
  'tap-to-view-details': { en: 'Tap to view details', bg: 'Докоснете за детайли' },
  'review-price-and-decide': { en: 'Review The Price And Decide', bg: 'Прегледайте цената и решете' },
  'No ongoing requests': { en: 'No ongoing requests', bg: 'Няма текущи заявки' },
  'Ongoing Requests': { en: 'Ongoing Requests', bg: 'Текущи заявки' },
  'employee-assigned': { en: 'Employee assigned', bg: 'Назначен служител' },
  'call-employee': { en: 'Call Employee', bg: 'Обади се на служителя' },
  'switch-to-bulgarian': { en: 'Switch to Bulgarian', bg: 'Превключи на български' },
  'switch-to-english': { en: 'Switch to English', bg: 'Превключи на английски' },
  'account-created-welcome': { en: 'Your account has been created. Welcome!', bg: 'Акаунтът ви е създаден. Добре дошли!' },
  'update-success-title': { en: 'Update Successful', bg: 'Успешно актуализиране' },
  'current-password-prompt-title': { en: 'Enter Current Password', bg: 'Въведете текущата парола' },
  'current-password-prompt-desc': { en: 'For security, please enter your current password to continue.', bg: 'За сигурност, моля въведете текущата си парола, за да продължите.' },
  'enter-current-password': { en: 'Enter your current password', bg: 'Въведете текущата си парола' },
  'incorrect-password-error': { en: 'Incorrect password. Please try again.', bg: 'Неправилна парола. Моля, опитайте отново.' },
  'change-avatar': { en: 'Change avatar', bg: 'Смени аватара' },
  'work-hours-line1': { en: 'Emergency road assistance service work hours:', bg: 'Работно време на спешната пътна помощ:' },
  'work-hours-line2': { en: 'Mon - Friday from 09:00 - 17:00.', bg: 'Понеделник - Петък от 09:00 до 17:00.' },
  'outside-hours-contact': { en: 'For service requests outside of working hours, please contact support', bg: 'За заявки извън работното време, моля свържете се с поддръжката' },
  'completed-at': { en: 'completed at', bg: 'завършено в' },
  'employee': { en: 'Employee', bg: 'Служител' },
  'total-price': { en: 'Total price', bg: 'Обща цена' },
  'address': { en: 'Address', bg: 'Адрес' },
  'view-on-map': { en: 'View on map', bg: 'Виж на картата' },
  'reason': { en: 'Reason', bg: 'Причина' },
  'completed-requests': { en: 'Completed requests', bg: 'Завършени заявки' },
  'completed-requests-desc': { en: 'View all completed service requests.', bg: 'Вижте всички завършени заявки за услуги.' }
};