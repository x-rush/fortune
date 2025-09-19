import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入语言资源
import en from './locales/en.json';
import zh from './locales/zh.json';

const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh', // 默认语言
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false // React 已经做了转义
    },

    // 调试模式
    debug: false,

    // 检测语言
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;