# Audit SEO & Technique — kyriosmica.com v3

**Date**: 16 avril 2026
**Version du site**: v3.0.0
**Méthode**: audit automatisé (Python + Playwright Chromium)
**Portée**: 7 pages HTML — `/index.html`, `/lab/{simulateur,t3net,qudits36,science4,analyzer}.html`, `/data/donnees.html`

---

## Résumé exécutif

| Catégorie | Avant refonte v3 | Après refonte v3 |
|---|---:|---:|
| Erreurs 4XX | ≥ 14 (confirmé Chrome) | **0** |
| Liens internes cassés | 1 (stub Cloudflare) | **0** |
| Images sans attribut `alt` | 5 | **0** |
| Pages sans `meta description` | 5 / 7 | **0 / 7** |
| Meta tags dupliquées | oui (description) | **0** |
| Titres trop longs (> 60 chars) | 1 | **0** |
| Titres trop courts (< 30 chars) | 1 | **0** |
| `<link rel="canonical">` | 1 / 7 | **7 / 7** |
| Tests SEO passés | — | **45 / 45** |

Score : **100 % des vérifications automatisées passées**.

---

## 1. Liens cassés et erreurs 4XX

### Problèmes trouvés et corrigés
- **11 références d'images legacy** (`kyriosmica_icon_moleculaire.png`, `kyriosmica_logo_vertical_v1.png`, `kyriosmica_cover_linkedin_v2.png`, etc.) pointaient vers des fichiers inexistants. **→** migrées vers les chemins du brand kit v3 (`/assets/logos/logo_*.{svg,png}`).
- **3 animations WebM** (`kyriosmica_anim_web.webm`, `_linkedin.webm`, `_seal.webm`) manquantes du dépôt. **→** section galerie remplacée par un placeholder bilingue « LOGOS ANIMÉS · À VENIR / COMING SOON ». Les futurs assets v3 pourront être déposés manuellement.
- **1 script Cloudflare** (`/cdn-cgi/scripts/.../email-decode.min.js`) référencé mais absent en local / déploiements statiques. **→** retiré, protection email réalisée côté client par concaténation JavaScript.
- **1 lien `<a href="/cdn-cgi/l/email-protection">`** sur `qudits36.html`. **→** remplacé par un `mailto:` construit en JavaScript (anti-spam).
- **3 `<link rel="icon">` avec `data:image/png;base64,…`** contenaient des fragments SVG corrompus (`<stop>`, `<radialGradient>`) qui fuyaient hors de l'attribut `href` et polluaient le DOM (glyphe `/>` visible en haut à gauche). **→** remplacés par des références propres à `/assets/logos/logo_icon.png`.

### Vérification
```
$ python3 audit_seo.py | grep broken-link
(aucune occurrence)
```
Test navigateur Chromium en headless sur les 7 pages : **0 échec hors polices Google** (fonts.googleapis.com — blocage environnement sandbox uniquement, fonctionne en production).

---

## 2. Balises `<title>`

| Page | Titre | Longueur |
|---|---|---:|
| `/index.html` | kyriosMICA — Decoding Life. Encoding the Future. | 48 |
| `/lab/simulateur.html` | Simulateur Qudits-36 · kyriosMICA | 33 |
| `/lab/t3net.html` | T₃-Net · kyriosMICA · EVK · ERK · MRK | 37 |
| `/lab/qudits36.html` | Qudits-36 Lab · kyriosMICA · Quantum Biology Institute | 54 |
| `/lab/science4.html` | Science 4.0 · Applications · kyriosMICA | 39 |
| `/lab/analyzer.html` | MICA-Kernel Analyzer · kyriosMICA | 33 |
| `/data/donnees.html` | Données & Résultats · kyriosMICA · FONDATEUR | 44 |

Tous dans la fourchette Google recommandée (30 – 60 caractères). Aucun doublon.

---

## 3. `<meta name="description">`

Toutes les pages ont désormais une description unique, bilingue (attributs `data-fr` + `data-en`) et respectant la longueur recommandée (≤ 160 caractères).

| Page | Longueur FR | Présent EN ? |
|---|---:|:-:|
| `/index.html` | 145 | ✓ |
| `/lab/simulateur.html` | 127 | ✓ |
| `/lab/t3net.html` | 117 | ✓ |
| `/lab/qudits36.html` | 129 | ✓ |
| `/lab/science4.html` | 117 | ✓ |
| `/lab/analyzer.html` | 107 | ✓ |
| `/data/donnees.html` | 109 | ✓ |

La description bascule automatiquement FR/EN selon la langue sélectionnée par l'utilisateur (système `i18n.js`).

---

## 4. Meta tags essentiels

### Obligatoires (charset + viewport)
| Meta | Présent sur les 7 pages ? |
|---|:-:|
| `<meta charset="UTF-8">` | ✓ |
| `<meta name="viewport" content="width=device-width,initial-scale=1.0">` | ✓ |

### Open Graph (homepage)
| Property | Statut |
|---|:-:|
| `og:title` | ✓ présent, unique |
| `og:description` | ✓ présent, unique |
| `og:url` | ✓ présent, unique |
| `og:type` | ✓ présent, unique |
| `og:image` | ✓ présent, unique, pointe sur `/assets/logos/logo_primary_EN.png` |

### Twitter Card (homepage)
| Name | Statut |
|---|:-:|
| `twitter:card` | ✓ présent, unique |
| `twitter:title` | ✓ présent, unique |
| `twitter:description` | ✓ présent, unique |
| `twitter:image` | ✓ présent, unique |

Aucun meta tag dupliqué n'a été détecté.

---

## 5. Images — attribut `alt`

Détection automatisée via `html.parser` Python sur les 7 pages.

| Page | Nombre d'`<img>` | Avec `alt` |
|---|---:|---:|
| `/index.html` | 6 | 6 |
| `/lab/*` et `/data/*` | 0-1 selon page | 100 % |

Les images décoratives (logos en preview dynamique) utilisent `alt=""`, conforme aux recommandations WAI-ARIA pour les images non-informatives.

---

## 6. URL canonique

`<link rel="canonical">` ajouté sur les 7 pages :

```html
<!-- sur /index.html -->
<link rel="canonical" href="https://kyriosmica.com/"/>

<!-- sur /lab/simulateur.html -->
<link rel="canonical" href="https://kyriosmica.com/lab/simulateur.html"/>
```

Évite les problèmes de duplicate content entre `www.kyriosmica.com` / `kyriosmica.com` / variantes avec `?` ou `/`.

---

## 7. Sitemap + robots.txt

### `/sitemap.xml`
Liste exhaustive des URLs publiques avec priorités :
- `/` — priorité 1.0
- `/lab/*` — priorité 0.7–0.8
- `/data/donnees.html` — priorité 0.6

### `/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://kyriosmica.com/sitemap.xml
```

---

## 8. Performance (observations)

- **Aucun appel API externe au chargement initial** (le site est 100 % statique, pas d'API MICA-KERNEL invoquée depuis la vitrine — séparation stricte des responsabilités).
- **Polices via Google Fonts avec `display=swap`** (évite le FOIT et n'attend pas les fichiers avant de peindre).
- **Nav + footer injectés via JS partagé** — 3 fichiers `i18n.js`, `nav.js`, `footer.js` (< 10 kB au total) mutualisés entre toutes les pages, donc cachés après le premier hit.
- **SVG vectoriels pour les logos** — tailles natives de quelques Ko, resolution-independent.

---

## 9. Accessibilité (bonus)

Les modifications de cet audit ont amélioré plusieurs points a11y au passage :
- Tous les `<img>` ont un `alt` descriptif ou explicitement vide.
- `<button>` avec `aria-label="Menu"` sur le hamburger mobile.
- `role="group" aria-label="Language"` sur le toggle FR/EN.
- `<a aria-label="kyriosMICA">` sur le logo cliquable.
- Focus visible sur tout élément interactif (`:focus-visible` avec outline or).

---

## 10. Méthodologie

### Tests automatisés reproductibles

Deux scripts joints au livrable :

- `audit_seo.py` — analyseur SEO qui parcourt les 7 pages et vérifie 7 catégories : titres, meta descriptions, meta essentielles, Open Graph / Twitter, `<img alt>`, liens internes cassés, URL canonique. **Dernière exécution : 45 tests passés, 0 erreur.**
- `run_sanity_tests.py` — suite de validation structurelle : pas de résidu de l'ancienne définition MICA, injection des assets partagés, parse HTML, validité JS via `node -c`, définition bilingue présente. **Dernière exécution : tous les tests passés.**

### Validation navigateur

`Playwright Chromium headless` charge les 7 pages et collecte :
- réponses HTTP de chaque ressource,
- erreurs JavaScript (`page.on("pageerror")`),
- resources en échec (`page.on("requestfailed")`).

**Résultat : 0 échec sur les 7 pages, hors polices Google bloquées par l'environnement sandbox (fonctionnent en production).**

---

## Réponse possible à l'email de prospection

> Bonjour,
>
> Merci pour votre message. Le site a fait l'objet d'un audit interne récent
> (v3.0.0, 16 avril 2026) qui couvre exactement les points que vous
> mentionnez : liens cassés, erreurs 4XX, images sans ALT, meta descriptions
> manquantes, tags dupliqués, titres trop longs. Notre suite de tests
> automatisée (45 vérifications) retourne actuellement 0 erreur.
>
> Le rapport complet est disponible sur demande. Nous restons ouverts à des
> discussions techniques ciblées si vous identifiez un angle non couvert par
> notre audit.
>
> Cordialement,
> L'équipe kyriosMICA

---

*© 2026 kyriosMICA · Institut de Recherche & Innovation · Bénin, Afrique de l'Ouest*
