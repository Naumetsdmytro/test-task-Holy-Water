import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';
import translationFR from './locales/fr/translation.json';
import translationES from './locales/es/translation.json';

const resources = {
  English: { translation: translationEN },
  German: { translation: translationDE },
  French: { translation: translationFR },
  Spanish: { translation: translationES },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'English',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
