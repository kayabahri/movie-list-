import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import trTranslation from './locales/tr/translation.json';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      tr: {
        translation: trTranslation,
      },
    },
    lng: 'en',
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false,
    },
    debug: true,
    react: {
      useSuspense: false,
    },
  });

export default i18n;
