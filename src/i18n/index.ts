import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { ru } from './translations/ru'
import { en } from './translations/en'
import { tg } from './translations/tg'
import { uz } from './translations/uz'
import { ky } from './translations/ky'
import { zh } from './translations/zh'
import { fa } from './translations/fa'

const resources = {
  ru: {
    translation: ru
  },
  en: {
    translation: en
  },
  tg: {
    translation: tg
  },
  uz: {
    translation: uz
  },
  ky: {
    translation: ky
  },
  zh: {
    translation: zh
  },
  fa: {
    translation: fa
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: true, // Включаем отладку для проверки
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupSessionStorage: 'i18nextLng',
    },
    
    react: {
      useSuspense: false,
    },
  })

export default i18n
