# CHANGELOG — kyriosmica-site

## v3.1.0 — 18 avril 2026

### 🐛 Bugs critiques corrigés

- **B1 — `showPage()` crashait** : la fonction SPA legacy plantait sur `null.classList`
  lorsque le bouton `btn-back` legacy (retiré en v3.0) était absent. **Tous les
  onglets institutionnels étaient donc inaccessibles en production.** Correction
  par garde `if (backBtn)` + exposition de `window.showPage` et `window.goHome`
  + diffusion d'un événement `kmica:pagechange`.
- **B2 — Liens nav partagée non routés** : les liens `#section` de la navbar
  pointaient vers des ancres HTML inexistantes au lieu d'appeler `showPage()`.
  Correction par interception dans `nav.js` via `data-spa-section` quand l'URL
  est sur `/index.html`.
- **B3 — Intro cinématique avec vieux logo** : le SVG animé affichait une
  étoile à 6 branches or/cyan (symbole legacy). Remplacé par une animation
  séquentielle du logo v3 (halo cyan → 3 axes T₃ pointillés or → hexagone
  externe or dessiné → 6 liaisons cyan de la matrice interne → 6 rayons
  cyan → 6 nœuds internes cyan → 6 sommets or → point terre central).
- **B4 — Intro 100 % EN hardcodée** : « Welcome to », « Research & Innovation
  Institute », « Skip » sans traduction. Tous les éléments de l'intro
  bénéficient maintenant de `data-fr`/`data-en`.
- **B5 — Double attribut `alt=` sur 8 images** : héritage de `fix_seo.py` v3.0
  qui ajoutait un `alt` sans retirer l'existant. HTML désormais valide.
- **qudits36.html — script principal cassé (legacy)** : l'IIFE T₃-Net Engine
  n'avait ni `})();` de fermeture ni `</script>` final dans le source
  monolithe. Tout le HTML shared qui suivait (`#kyrios-footer`,
  `/assets/shared/nav.js`, `footer.js`) était donc parsé comme du JavaScript.
  Correction par ajout du `})();` + `</script>` manquants et garde null sur
  les accès DOM (onSeqInput, seq-ex, seq-input) pour éléments T₃-Net absents.

### ✨ Identité visuelle v3.1

- **Baseline institut** : « Bioinformatique Quantique » (FR) / « Quantum
  Bioinformatics » (EN) remplace la version verbeuse « Bio-Informatique
  Systémique & Bio-Technologie Quantique / Systemic Bio-Informatics &
  Quantum Bio-Technology ». Appliqué dans 14 emplacements : meta
  description, Open Graph, Twitter Card, baseline hero, intro cinématique,
  footer, cartes institutionnelles.
- **Fond uniformisé sur `var(--marine)` `#0A1628`** partout : html, body,
  intro-screen, loading-screen. Les `#000` purs des anciens blocs ont été
  remplacés. Seuls conservés : overlays volontairement semi-transparents
  (`#000000f0` nav blur, `#00000088` modal overlay).
- **Responsive universel** : `clamp()`, `max-width: 100%`, `box-sizing:
  border-box` global. Breakpoints 900 et 600 px avec media queries
  conservatoires pour tous les éléments des labs (flex-wrap, grid
  collapse, hidden sidebars).

### 🆕 Nouveau laboratoire MICA-OTP

- `/lab/mica-otp.html` (~650 lignes) — **séparé du Qudits-36 Lab** car
  cryptographie vs biophysique. Hero bicolore « MICA-*OTP* », citation
  Shannon 1949, 4 cartes conceptuelles numérotées (alphabet T₃, opération
  ⊕₃, chiffrement, déchiffrement), démo interactive fonctionnelle
  (M → K → C → M' avec vérification H(M | C) = H(M)), table de
  l'opération ⊕₃, section « Pourquoi post-quantique ? ».
- Encodage : chaque caractère → 6 trits balanced ternary. L'opération
  `a ⊕₃ b = ((a+b+1) mod 3) − 1` est implémentée avec inverse additif
  via négation.

### 🌐 Couverture i18n

- **index.html** : approche B (traduction complète). Intro, hero,
  équations ternaires, paragraphe pionniers, footer, bouton
  Administration, tous bilingues.
- **5 labs + donnees** : approche A (symétrique scriptée, FR = EN) pour
  prévenir les régressions lors des toggles FR/EN. Traductions réelles à
  compléter manuellement par l'équipe. **+559 wraps au total** :
  simulateur +114, t3net +42, qudits36 +105 (après filtre multiligne),
  science4 +212, analyzer +19, donnees +73.
- Le script `apply_labs_i18n_responsive_v2.py` exclut les régions
  `<script>/<style>/<svg>/<pre>/<code>/<textarea>` et limite le matching
  aux textes monolignes pour éviter les régressions observées en v3.1
  intermédiaire (attributs mal fermés sur textes multi-lignes et
  pollution de template literals JS).

### 🧭 Navigation & UX

- **Bouton de retour** dans la navbar partagée (`#kmica-back`) : gold
  outline, hover plein or, visible uniquement sur les sections non-home.
  Géré par `kmica:pagechange` sur `index.html` et par `isHomePage()` sur
  les pages labs/data (retour vers `/index.html`).
- **Entrée MICA-OTP** ajoutée au dropdown Laboratoires (5 labs au lieu
  de 4).
- **Onglet Science** redirige désormais vers `/lab/science4.html` au lieu
  d'une section SPA inexistante.

### 🔁 Changements non-visibles

- `nav.js` v3.1 réécrit intégralement avec : `MENU` source unique,
  `sectionIdFromHref`, `resolveHref`, interception `data-spa-section`,
  wiring du back button, classes actives automatiques.
- `nav.css` v3.1 réécrit avec sizing fluide `clamp()`, media query
  mobile à 960 px (menu latéral full-width), règle globale
  `html, body { background-color: var(--marine) !important; }`.

### 📊 Validation finale F18

24 tests exécutés (8 pages × 3 breakpoints 375/768/1400) :
- **0 overflow horizontal**
- **0 erreur JavaScript**

| Page | 375 mobile | 768 tablet | 1400 desktop |
|---|---:|---:|---:|
| index.html | OK | OK | OK |
| lab/simulateur.html | OK (was +66) | OK | OK |
| lab/t3net.html | OK (was +179) | OK (was +186) | OK |
| lab/qudits36.html | OK (was +247) | OK (was +134) | OK |
| lab/science4.html | OK | OK | OK |
| lab/analyzer.html | OK | OK | OK |
| lab/mica-otp.html (nouveau) | OK | OK | OK |
| data/donnees.html | OK | OK | OK |

---

## v3.0.0 — 16 avril 2026

- Refonte architecturale : monolithe → multi-page avec shared assets.
- Brand kit v3 (5 variantes logo + palette étendue terre/acajou).
- Migration 11 assets legacy (images/vidéos jamais présentes dans le
  dépôt) vers brand kit v3.
- Audit SEO 45/45 tests passent (titres, descriptions, alt, canonical,
  OG, Twitter).
- Définition MICA canonique : « Matrice d'Intrication Coordonnée par
  les Amplitudes » / « Matrix of Intrication Coordinated by Amplitudes ».

