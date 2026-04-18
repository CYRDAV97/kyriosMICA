# kyriosmica-site

**Vitrine publique interactive** de kyriosMICA — Institut de Recherche &
Innovation en Bio-Informatique Systémique & Bio-Technologie Quantique.

> Matrice d'Intrication Coordonnée par les Amplitudes  
> *Matrix of Intrication Coordinated by Amplitudes*

Déployé sur **https://kyriosmica.com**.

---

## Écosystème à trois dépôts

| Dépôt | Rôle | Domaine | Stack |
|---|---|---|---|
| **kyriosmica-site** *(ce dépôt)* | Vitrine publique interactive | kyriosmica.com | HTML/CSS/JS statique |
| `CYRDAV97/lab.kyriosmica` | Outil professionnel d'analyse | lab.kyriosmica.com | Next.js 14 / React 18 |
| `kyriosMICA/MICA-KERNEL` | Backend FastAPI (calcul TQIM-Davoh) | api.kyriosmica.com | Python 3.12 / FastAPI |

**Ce dépôt n'appelle aucune API.** 100 % client-side, déployable sur tout
hébergeur statique (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

---

## Structure

```
kyriosmica-site/
├── index.html                    # monolithe SPA (pages de l'institut)
├── lab/                          # laboratoires interactifs (pages autonomes)
│   ├── simulateur.html           # démo Qudits-36 pédagogique
│   ├── t3net.html                # QNN T₃-Net playground
│   ├── qudits36.html             # laboratoire Qudits-36 avancé
│   ├── science4.html             # page Science 4.0
│   └── analyzer.html             # analyseur de séquences (v2)
├── data/
│   └── donnees.html              # page données / téléchargements
├── assets/
│   ├── shared/                   # CSS + JS partagés
│   │   ├── brand.css             # tokens (palette, typo, utilitaires)
│   │   ├── nav.css               # navbar + dropdown Labs + footer
│   │   ├── nav.js                # composant navbar (dropdown, hamburger)
│   │   ├── i18n.js               # système bilingue FR/EN
│   │   └── footer.js             # composant footer commun
│   ├── logos/                    # brand kit v3 (5 variantes SVG + PNG)
│   ├── favicon.svg
│   └── favicon.ico
├── docs/                         # PDFs officiels (déposés manuellement)
│   └── README.md
├── robots.txt
├── sitemap.xml
├── README.md
└── .gitignore
```

---

## Développement local

Aucun build requis. Tout fichier `.html` s'ouvre directement dans le navigateur.

Pour servir le site localement avec les liens absolus `/assets/...` :

```bash
cd kyriosmica-site
python3 -m http.server 8000
# Ouvre http://localhost:8000
```

---

## Déploiement

### Vercel (recommandé)

1. Importer le dépôt sur https://vercel.com/new
2. *Framework preset* : **Other** (zero-config, site statique)
3. *Build command* : (vide)
4. *Output directory* : (vide — racine)
5. Déployer

Le `vercel.json` n'est pas nécessaire.

### Netlify

1. Drag-and-drop du dossier sur https://app.netlify.com/drop
2. Ou connexion Git : *Build command* vide, *Publish directory* = `.`

### GitHub Pages

1. Settings → Pages → Source : branche `main`, dossier `/ (root)`
2. Attendre ~1 min, site disponible sur `https://<user>.github.io/<repo>/`

---

## Brand kit

Les 5 variantes du logo se trouvent dans `assets/logos/` :

- `logo_horizontal_EN.svg` / `.png` — header EN
- `logo_horizontal_FR.svg` / `.png` — header FR
- `logo_primary_EN.svg` / `.png` — publications EN
- `logo_primary_FR.svg` / `.png` — publications FR
- `logo_icon.svg` / `.png` — favicon, avatar universel
- `brand_kit_v3.png` — planche de livraison

Palette : `--marine #0A1628`, `--gold #C9972A`, `--cyan #22D3EE`,
`--earth #8B4513`, `--white #F1F5F9`, `--slate #A8BCDC`.

Typographie : **Playfair Display** (titres), **JetBrains Mono** (labels techniques).

---

## i18n (FR/EN)

Tout texte à traduire est balisé :

```html
<span data-fr="Bonjour" data-en="Hello">Bonjour</span>
```

Le composant `i18n.js` :
- détecte la langue préférée (localStorage → navigateur → `fr`)
- met à jour tous les `[data-fr][data-en]` à la volée
- déclenche `window.dispatchEvent('kmica:langchange')` pour les composants tiers

Le toggle est intégré à la navbar (FR | EN).

---

## Licence

© 2026 kyriosMICA · Cyrille Egnon DAVOH · Tous droits réservés  
Bénin, Afrique de l'Ouest
