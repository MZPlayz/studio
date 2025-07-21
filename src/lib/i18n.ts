
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // Used to load translations from a server
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    lng: 'bn', // The default language
    fallbackLng: 'en', // Fallback language if a translation is missing
    
    // Namespaces are used to organize translations
    ns: ['translation'],
    defaultNS: 'translation',

    backend: {
      // Path where translations will be stored
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
