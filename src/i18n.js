import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import trTranslation from './locales/tr/translation.json';

// i18next initialization
i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      tr: {
        translation: trTranslation,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if the selected language translation is missing
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
    debug: true, // Set to false in production
    react: {
      useSuspense: false, // Disables suspense for loading translations
    },
  });

export default i18n;
