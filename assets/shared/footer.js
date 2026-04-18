/* ==============================================================
   kyriosMICA · footer.js
   Renders the shared footer into <div id="kyrios-footer"></div>.
   Uses the canonical bilingual MICA definition.
   v3 · 2026
   ============================================================== */
(function () {
  'use strict';

  function render(mount) {
    var html = '' +
      '<div class="kmica-footer-inner">' +
        // Brand column
        '<div class="kmica-footer-brand">' +
          '<img src="/assets/logos/logo_horizontal_FR.svg" ' +
               'class="kmica-logo-img" ' +
               'data-logo-base="/assets/logos/logo_horizontal" ' +
               'alt="kyriosMICA">' +
          '<p data-fr="Matrice d\u2019Intrication Coordonn\u00e9e par les Amplitudes" ' +
             'data-en="Matrix of Intrication Coordinated by Amplitudes">' +
             'Matrice d\u2019Intrication Coordonn\u00e9e par les Amplitudes' +
          '</p>' +
          '<div class="loc" data-fr="B\u00e9nin \u00b7 Afrique de l\u2019Ouest \u00b7 2026" ' +
               'data-en="Benin \u00b7 West Africa \u00b7 2026">' +
               'B\u00e9nin \u00b7 Afrique de l\u2019Ouest \u00b7 2026' +
          '</div>' +
        '</div>' +

        // Labs column
        '<div>' +
          '<h4 data-fr="Laboratoires" data-en="Laboratories">Laboratoires</h4>' +
          '<a href="/lab/simulateur.html" ' +
             'data-fr="Simulateur Qudits-36" data-en="Qudits-36 Simulator">Simulateur Qudits-36</a>' +
          '<a href="/lab/t3net.html" ' +
             'data-fr="T\u2083-Net QNN" data-en="T\u2083-Net QNN">T\u2083-Net QNN</a>' +
          '<a href="/lab/qudits36.html" ' +
             'data-fr="Qudits-36 Lab" data-en="Qudits-36 Lab">Qudits-36 Lab</a>' +
          '<a href="/lab/analyzer.html" ' +
             'data-fr="Analyzer" data-en="Analyzer">Analyzer</a>' +
          '<a href="/data/donnees.html" ' +
             'data-fr="Donn\u00e9es" data-en="Data">Donn\u00e9es</a>' +
        '</div>' +

        // Institutional column
        '<div>' +
          '<h4 data-fr="Institut" data-en="Institute">Institut</h4>' +
          '<a href="/#science" ' +
             'data-fr="Science &amp; Qudits-36" data-en="Science &amp; Qudits-36">Science &amp; Qudits-36</a>' +
          '<a href="/#challenge" ' +
             'data-fr="D\u00e9fi Mondial" data-en="World Challenge">D\u00e9fi Mondial</a>' +
          '<a href="/#revue" ' +
             'data-fr="Revue scientifique" data-en="Scientific Journal">Revue scientifique</a>' +
          '<a href="/#documents" ' +
             'data-fr="Documents" data-en="Documents">Documents</a>' +
          '<a href="/#consortium" ' +
             'data-fr="Consortium" data-en="Consortium">Consortium</a>' +
          '<a href="/#contact" ' +
             'data-fr="Contact" data-en="Contact">Contact</a>' +
        '</div>' +
      '</div>' +

      '<div class="kmica-footer-bottom">' +
        '<span>\u00a9 2026 kyriosMICA</span>' +
        '<span class="sep">\u00b7</span>' +
        '<span>Cyrille Egnon DAVOH</span>' +
        '<span class="sep">\u00b7</span>' +
        '<span data-fr="Tous droits r\u00e9serv\u00e9s" data-en="All rights reserved">Tous droits r\u00e9serv\u00e9s</span>' +
        '<span class="sep">\u00b7</span>' +
        '<span data-fr="B\u00e9nin, Afrique de l\u2019Ouest" data-en="Benin, West Africa">B\u00e9nin, Afrique de l\u2019Ouest</span>' +
      '</div>';

    mount.innerHTML = html;
    mount.className = 'kmica-footer';
  }

  function init() {
    var mount = document.getElementById('kyrios-footer');
    if (!mount) return;
    render(mount);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
