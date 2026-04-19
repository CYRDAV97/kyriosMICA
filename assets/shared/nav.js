/* ==============================================================
   kyriosMICA · nav.js  v3.1
   Shared navbar with Labs dropdown, back button, and SPA routing.
   ============================================================== */
(function () {
  'use strict';

  var MENU = [
    { fr: 'Science',       en: 'Science',        href: '#science' },
    { fr: 'Applications',  en: 'Applications',   href: '#applications' },
    { fr: 'Validation',    en: 'Validation',     href: '#validation' },
    { fr: 'Vision',        en: 'Vision',         href: '#vision' },
    { fr: 'Laboratoires',  en: 'Laboratories',   children: [
      { fr: 'Simulateur Qudits-36',  en: 'Qudits-36 Simulator',
        sub_fr: 'Démo pédagogique interactive',
        sub_en: 'Interactive educational demo',
        href: '/lab/simulateur.html' },
      { fr: 'T\u2083-Net QNN',       en: 'T\u2083-Net QNN',
        sub_fr: 'Réseau quantique ternaire',
        sub_en: 'Ternary quantum network',
        href: '/lab/t3net.html' },
      { fr: 'Qudits-36 Lab',         en: 'Qudits-36 Lab',
        sub_fr: 'Laboratoire avancé',
        sub_en: 'Advanced laboratory',
        href: '/lab/qudits36.html' },
      { fr: 'MICA-OTP',              en: 'MICA-OTP',
        sub_fr: 'Cryptographie ternaire post-quantique',
        sub_en: 'Post-quantum ternary cryptography',
        href: '/lab/mica-otp.html' },
      { fr: 'Analyzer',              en: 'Analyzer',
        sub_fr: 'Analyseur de séquences (démo)',
        sub_en: 'Sequence analyzer (demo)',
        href: '/lab/analyzer.html' }
    ]},
    { fr: 'D\u00e9fi Mondial', en: 'World Challenge', href: '#challenge' },
    { fr: 'Revue',         en: 'Journal',        href: '#revue' },
    { fr: 'Galerie',       en: 'Gallery',        href: '#galerie' },
    { fr: 'Documents',     en: 'Documents',      href: '#documents' },
    { fr: 'Consortium',    en: 'Consortium',     href: '#consortium' },
    { fr: 'Contact',       en: 'Contact',        href: '#contact' }
  ];

  function isHomePage() {
    var p = window.location.pathname;
    return p === '/' || p.endsWith('/index.html') || p === '';
  }

  function resolveHref(href) {
    if (!href) return '#';
    if (href.indexOf('#') === 0) {
      return isHomePage() ? href : '/index.html' + href;
    }
    return href;
  }

  function sectionIdFromHref(href) {
    if (!href) return null;
    var i = href.indexOf('#');
    return (i >= 0) ? href.substring(i + 1) : null;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function render(mount) {
    var html = [
      '<div class="kmica-nav-inner">',
        '<a class="kmica-logo" href="/" aria-label="kyriosMICA">',
          '<img class="kmica-logo-img" ',
               'data-logo-base="/assets/logos/logo_horizontal" ',
               'src="/assets/logos/logo_horizontal_FR.svg" ',
               'alt="kyriosMICA">',
        '</a>',
        '<button class="kmica-back" id="kmica-back" type="button" ',
                'data-fr="\u2190 Accueil" data-en="\u2190 Home" ',
                'aria-label="Retour \u00e0 l\'accueil" ',
                'style="display:none;">\u2190 Accueil</button>',
        '<button class="kmica-burger" aria-label="Menu" type="button">',
          '<span></span><span></span><span></span>',
        '</button>',
        '<ul class="kmica-nav-links">'
    ];

    MENU.forEach(function (item) {
      if (item.children) {
        html.push('<li class="kmica-nav-dropdown">');
        html.push(
          '<button class="kmica-nav-link" type="button" ',
          'data-fr="' + esc(item.fr) + '" data-en="' + esc(item.en) + '">',
          esc(item.fr),
          '</button>'
        );
        html.push('<ul class="kmica-nav-dropdown-menu">');
        item.children.forEach(function (child) {
          html.push(
            '<li><a href="' + esc(child.href) + '">',
              '<span data-fr="' + esc(child.fr) + '" data-en="' + esc(child.en) + '">',
                esc(child.fr),
              '</span>',
              '<span class="sub" data-fr="' + esc(child.sub_fr) + '" data-en="' + esc(child.sub_en) + '">',
                esc(child.sub_fr),
              '</span>',
            '</a></li>'
          );
        });
        html.push('</ul>');
        html.push('</li>');
      } else {
        var href = resolveHref(item.href);
        var sec = sectionIdFromHref(item.href);
        var dataSec = sec ? ' data-spa-section="' + esc(sec) + '"' : '';
        html.push(
          '<li><a href="' + esc(href) + '"' + dataSec + ' ',
          'data-fr="' + esc(item.fr) + '" data-en="' + esc(item.en) + '">',
          esc(item.fr),
          '</a></li>'
        );
      }
    });

    html.push(
      '<li class="kmica-lang" role="group" aria-label="Language">',
        '<button type="button" data-lang="fr">FR</button>',
        '<button type="button" data-lang="en">EN</button>',
      '</li>'
    );

    html.push('</ul></div>');
    mount.innerHTML = html.join('');
    mount.className = 'kmica-nav';

    wire(mount);
  }

  function wire(mount) {
    var langBtns = mount.querySelectorAll('.kmica-lang button');
    function paintLang() {
      var cur = (window.kyriosI18n && window.kyriosI18n.getLang()) || 'fr';
      langBtns.forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-lang') === cur);
      });
    }
    langBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        if (window.kyriosI18n) window.kyriosI18n.setLang(b.getAttribute('data-lang'));
        paintLang();
      });
    });
    window.addEventListener('kmica:langchange', paintLang);
    paintLang();

    var burger = mount.querySelector('.kmica-burger');
    var links  = mount.querySelector('.kmica-nav-links');
    if (burger && links) {
      burger.addEventListener('click', function () {
        burger.classList.toggle('open');
        links.classList.toggle('open');
      });
    }

    var dropdowns = mount.querySelectorAll('.kmica-nav-dropdown');
    dropdowns.forEach(function (dd) {
      var trigger = dd.querySelector('button');
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdowns.forEach(function (other) {
          if (other !== dd) other.classList.remove('open');
        });
        dd.classList.toggle('open');
      });
    });
    document.addEventListener('click', function () {
      dropdowns.forEach(function (dd) { dd.classList.remove('open'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdowns.forEach(function (dd) { dd.classList.remove('open'); });
      }
    });

    // Intercept #section links on the homepage to route via SPA
    if (isHomePage()) {
      mount.querySelectorAll('a[data-spa-section]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          var sec = a.getAttribute('data-spa-section');
          if (sec && typeof window.showPage === 'function') {
            e.preventDefault();
            window.showPage(sec);
            if (links) {
              links.classList.remove('open');
              if (burger) burger.classList.remove('open');
            }
          }
        });
      });
    }

    // Back button
    var backBtn = mount.querySelector('#kmica-back');
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        if (isHomePage() && typeof window.showPage === 'function') {
          window.showPage('home');
        } else {
          window.location.href = '/index.html';
        }
      });
      updateBackButton(mount);
    }
    window.addEventListener('kmica:pagechange', function () {
      updateBackButton(mount);
    });

    // Active state
    var path = window.location.pathname;
    mount.querySelectorAll('.kmica-nav-links > li > a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('/#') &&
          href !== '/' && path.indexOf(href) === 0) {
        a.classList.add('active');
      }
    });
    mount.querySelectorAll('.kmica-nav-dropdown-menu a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && path.indexOf(href) === 0) {
        a.classList.add('active');
        var parent = a.closest('.kmica-nav-dropdown');
        if (parent) {
          parent.querySelector('button').classList.add('active-parent');
        }
      }
    });
  }

  function updateBackButton(mount) {
    var backBtn = mount.querySelector('#kmica-back');
    if (!backBtn) return;
    if (!isHomePage()) {
      backBtn.style.display = 'inline-flex';
      return;
    }
    var activePage = document.querySelector('.page.active');
    var isHome = !activePage || activePage.id === 'page-home';
    backBtn.style.display = isHome ? 'none' : 'inline-flex';
  }

  function init() {
    var mount = document.getElementById('kyrios-nav');
    if (!mount) return;
    render(mount);
    document.body.classList.add('with-kmica-nav');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.kyriosNav = { render: render };
})();
