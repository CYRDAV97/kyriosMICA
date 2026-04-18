/* ==============================================================
   kyriosMICA · i18n.js
   Shared FR/EN toggle with localStorage persistence.
   v3 · 2026
   ============================================================== */
(function () {
  'use strict';

  var KEY = 'kyrios_lang';
  var DEFAULT = 'fr';

  function detectInitial() {
    try {
      var stored = localStorage.getItem(KEY);
      if (stored === 'fr' || stored === 'en') return stored;
    } catch (_) { /* localStorage may be unavailable */ }
    // Fallback to browser language
    var nav = (navigator.language || 'fr').toLowerCase();
    return nav.startsWith('en') ? 'en' : DEFAULT;
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    // Update all elements carrying data-fr / data-en
    var nodes = document.querySelectorAll('[data-fr][data-en]');
    nodes.forEach(function (el) {
      var v = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-fr');
      if (v === null) return;
      // Detect placeholder-bearing inputs
      if (el.hasAttribute('data-i18n-placeholder')) {
        el.setAttribute('placeholder', v);
      } else if (el.hasAttribute('data-i18n-title')) {
        el.setAttribute('title', v);
      } else {
        el.innerHTML = v;
      }
    });

    // Swap logo source (horizontal EN/FR)
    document.querySelectorAll('img.kmica-logo-img').forEach(function (img) {
      var base = img.getAttribute('data-logo-base') || '/assets/logos/logo_horizontal';
      img.src = base + '_' + lang.toUpperCase() + '.svg';
      img.alt = 'kyriosMICA';
    });

    // Notify listeners
    try {
      window.dispatchEvent(new CustomEvent('kmica:langchange', { detail: { lang: lang } }));
    } catch (_) {}
  }

  function setLang(lang) {
    if (lang !== 'fr' && lang !== 'en') lang = DEFAULT;
    try { localStorage.setItem(KEY, lang); } catch (_) {}
    apply(lang);
  }

  function getLang() {
    return document.documentElement.getAttribute('data-lang') || DEFAULT;
  }

  // Auto-init on DOMContentLoaded (safe to call after too)
  function init() { apply(detectInitial()); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.kyriosI18n = {
    setLang: setLang,
    getLang: getLang,
    apply: apply
  };
})();
