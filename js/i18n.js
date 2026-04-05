/**
 * CoinTrendz Radar - Internationalization Module
 */

const I18n = (() => {
  const supportedLangs = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
  let currentLang = 'en';
  let translations = {};

  function detectLanguage() {
    // 1. URL ?lang= param takes highest priority
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && supportedLangs.includes(urlLang)) return urlLang;

    // 2. LocalStorage saved preference
    const saved = localStorage.getItem('ctr_lang');
    if (saved && supportedLangs.includes(saved)) return saved;

    // 3. Browser language
    const userLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    return supportedLangs.find(l => userLang.startsWith(l)) || 'en';
  }

  async function loadTranslations() {
    try {
      const res = await fetch('data/translations.json');
      translations = await res.json();
    } catch (err) {
      console.warn('Failed to load translations:', err);
      translations = {};
    }
  }

  function t(key) {
    if (translations[currentLang] && translations[currentLang][key]) {
      return translations[currentLang][key];
    }
    if (translations['en'] && translations['en'][key]) {
      return translations['en'][key];
    }
    return key;
  }

  function setLanguage(lang) {
    if (!supportedLangs.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem('ctr_lang', lang);
    document.documentElement.lang = lang;
    applyTranslations();
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.title = t(key);
    });
  }

  function getCurrentLang() {
    return currentLang;
  }

  async function init() {
    await loadTranslations();
    currentLang = detectLanguage();
    document.documentElement.lang = currentLang;
    applyTranslations();

    // Populate language selector
    const selector = document.getElementById('lang-selector');
    if (selector) {
      selector.value = currentLang;
      selector.addEventListener('change', (e) => {
        setLanguage(e.target.value);
      });
    }
  }

  return { init, t, setLanguage, getCurrentLang, applyTranslations };
})();
