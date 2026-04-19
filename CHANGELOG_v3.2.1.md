# CHANGELOG kyriosMICA Site · v3.2.1 (hotfix)

**Date :** 19 avril 2026
**Type :** Hotfix de stabilisation post-prévisualisation v3.2
**Scope :** Bug bloquant + retrait UI Administration

Cette release corrige un bug critique remonté par Cyrille pendant la prévisualisation de v3.2 et prépare la v3.3 (système d'édition de contenu Admin-to-GitHub).

---

## Bugs corrigés

### Liens « Institut » du footer ne fonctionnaient pas

**Symptôme remonté :** « dans institution aucun des liens ne fonctionnent dans cette navigation »

**Cause :** le footer partagé (`assets/shared/footer.js`) rendait des liens `<a href="/#science">`, `<a href="/#applications">`, etc. Ces liens n'avaient **pas** d'attribut `data-spa-section` et aucun gestionnaire de clic. Résultat : le navigateur faisait un hard-reload vers l'ancre `/#science` qui ne déclenchait pas `window.showPage()`, donc la SPA ne routait pas vers la bonne page.

**Comparaison avec la navbar :** la navbar (`nav.js`) génère ses liens avec `data-spa-section="xxx"` ET installe un `addEventListener('click')` qui intercepte les clics et appelle `window.showPage(sec)`. Le footer avait été oublié dans cette logique.

**Correction :**

1. `assets/shared/footer.js` : ajout de `data-spa-section="xxx"` sur les 9 liens de la colonne Institut (Science, Applications, Validation, Vision, Défi Mondial, Revue scientifique, Documents, Consortium, Contact).
2. `assets/shared/footer.js` : ajout d'une fonction `wireFooter(mount)` qui réplique exactement le comportement de `wire()` dans `nav.js` — si la page courante est la homepage, interception des clics `a[data-spa-section]` et appel à `window.showPage(sec)`.

**Validation (Playwright) :**
```
✓ click footer 'science'       → page-science
✓ click footer 'applications'  → page-applications
✓ click footer 'validation'    → page-validation
✓ click footer 'vision'        → page-vision
✓ click footer 'challenge'     → page-challenge
✓ click footer 'revue'         → page-revue
✓ click footer 'documents'     → page-documents
✓ click footer 'consortium'    → page-consortium
✓ click footer 'contact'       → page-contact
```

**9/9 liens Institut fonctionnent.** 0 erreur JavaScript.

---

## Administration : accès UI retiré (préparation v3.3)

**Contexte :** l'ancien panneau Administration stockait articles et galerie dans le **localStorage du navigateur**. Les modifications n'étaient donc visibles **que sur le navigateur de l'admin**, pas pour les visiteurs mondiaux du site — une contradiction fondamentale pour un site statique déployé sur Vercel.

**Décision Cyrille pour v3.2.1 :** retirer l'accès UI sans perdre le code du panneau (qui sera remanié en v3.3 en « composeur Admin-to-GitHub » — voir section Prochaines étapes).

**Modifications :**

1. **Bouton « ⚙ Administration »** retiré du footer partagé (`assets/shared/footer.js`).
2. **Triple-clic sur le logo** : handler supprimé dans `index.html` (ligne ~3834 et ~3851). Le logo est maintenant un simple élément visuel.
3. **URL `?admin`** : le paramètre d'URL n'ouvre plus la fenêtre de login (`if (window.location.search.includes('admin'))` retiré).
4. **Panneau `#admin-panel` et `#admin-login`** : conservés dans le DOM mais inaccessibles depuis l'UI. Variables `ADMIN_HASH`, fonctions `openAdmin()`, `adminLogin()`, `adminTab()`, `adminRenderAll()` etc. conservées pour la refonte v3.3.

**Validation :**
```
1. Bouton Admin footer : absent ✓
2. URL ?admin : ne fait rien ✓
3. Triple-clic logo : ne fait rien ✓
```

**Note importante sur le mot de passe :** le mot de passe `kMica-2026-TqimDavoh-Benin-77` (hash `90ff50fc`) reste dans le code mais n'a plus d'entrée UI. Il sera réutilisé en v3.3 pour le nouveau panneau d'édition.

---

## Fichiers modifiés

```
assets/shared/footer.js               4.8 KB (+0.6 KB · 9 data-spa-section + wireFooter)
index.html                            312 KB (-0.4 KB · 2 handlers DOMContentLoaded simplifiés)
```

**Aucun fichier supprimé.** Le panneau admin (lignes 4319-4650 dans index.html) reste dans le DOM, inaccessible depuis l'UI mais prêt à être remanié en v3.3.

---

## Prochaines étapes (v3.3 — en préparation)

**Besoin utilisateur (Cyrille) :**
> Le but était de pouvoir ajouter et/ou modifier d'autres publications aux sites (articles, revues…) et aussi ajouter d'autres images ou vidéos ou documents à notre galerie d'art.

**Décision : approche hybride « Admin-to-GitHub »** (choix « c » de Cyrille) :

**Pour les Articles (revue scientifique)** — Moyen 2 : fichier JSON dynamique
- Création de `/data/articles.json` chargé au runtime par le site
- Ajouter un article = remplacer ce fichier dans GitHub
- Plus besoin d'éditer 3 000 lignes d'`index.html` pour ajouter un article

**Pour la Galerie (images/vidéos/documents)** — Moyen 1 : copie-coller HTML
- Panneau admin = composeur qui génère le bloc HTML prêt à coller
- Bouton « Copier le HTML » + « Ouvrir l'éditeur GitHub »
- Admin colle → commit → Vercel redéploie → tout le monde voit

**Portée étendue (selon choix Cyrille) :**
- Articles de la revue ✓
- Galerie images ✓
- Galerie vidéos WebM ✓
- Documents PDF (KMDOC001-007) ✓

v3.3 fera l'objet d'une session dédiée après validation en production de v3.2.1.

---

## Résumé

| Élément | État |
|---|---|
| 9 liens footer Institut | **fonctionnent** ✓ |
| Bouton Administration UI | **retiré** ✓ |
| Triple-clic logo → admin | **désactivé** ✓ |
| URL `?admin` → admin | **désactivé** ✓ |
| Panneau admin dans le code | **conservé pour v3.3** |
| Mot de passe `kMica-2026-TqimDavoh-Benin-77` | **toujours valide pour v3.3** |
| Erreurs JS console | **0** |
| Tests régression v3.2 (F36) | **36/36 OK** |

---

© 2026 kyriosMICA · Institut de Recherche en Bioinformatique Quantique · Bénin, Afrique de l'Ouest
