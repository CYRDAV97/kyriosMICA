# Déploiement — kyriosmica-site v3.1

## Contexte

Dépôt cible : `github.com/CYRDAV97/kyriosmica-site`
Hébergement : Vercel (kyriosmica.com)

## Procédure d'upload

### Méthode web GitHub (recommandée, sans Git CLI)

1. Décompresser `kyriosmica-site_v3.1.zip` localement.
2. Se connecter à `github.com/CYRDAV97/kyriosmica-site`.
3. Supprimer tous les fichiers existants :
   - `Settings → General → Danger Zone` est inutile ici
   - Plus simple : sélectionner chaque dossier/fichier racine → `Delete`
   - Commit intermédiaire : « v3.0 → clean for v3.1 »
4. `Add file → Upload files` → glisser le CONTENU du zip (pas le dossier
   parent) dans la fenêtre.
5. Commit : « v3.1.0 — nav fixes, MICA-OTP lab, i18n, responsive universel »
6. Vercel rebuild automatique en ~60 s.

### Méthode Git CLI

```bash
git clone git@github.com:CYRDAV97/kyriosmica-site.git
cd kyriosmica-site
git rm -rf .              # clean pour éviter les orphelins
# décompresser le zip dans le dossier courant
unzip -o /chemin/vers/kyriosmica-site_v3.1.zip
git add -A
git commit -m "v3.1.0 — nav fixes, MICA-OTP lab, i18n, responsive universel"
git push origin main
```

## Validation post-déploiement

Après le rebuild Vercel, vérifier ces 6 points :

1. **kyriosmica.com** charge l'intro cinématique avec le **logo v3**
   (hexagone + packing hex + point terre central) — pas l'ancienne
   étoile à 6 branches.
2. **Cliquer « Passer »** puis tester chaque onglet de la navbar :
   Science → `/lab/science4.html`, Laboratoires → dropdown 5 entrées
   dont MICA-OTP, Défi Mondial → `page-challenge` s'affiche + bouton
   « ← Accueil » apparaît.
3. **Toggle FR/EN** dans la navbar change la baseline du hero :
   « Bioinformatique Quantique » ↔ « Quantum Bioinformatics ».
4. **`/lab/mica-otp.html`** : cliquer ① Encoder → ② Générer clé →
   ③ Chiffrer → ④ Déchiffrer. Le message déchiffré doit être identique
   à l'original. Le panneau vert « ✓ Sécurité vérifiée » s'affiche.
5. **Responsive mobile** : ouvrir `/lab/t3net.html` sur téléphone ou
   Chrome DevTools (mode 375px). Aucun overflow horizontal. Menu
   hamburger fonctionnel.
6. **Fond uniforme marine** : inspecter plusieurs sections — toutes sur
   `#0A1628`, plus de zones noires incohérentes.

## Rollback

En cas de régression après déploiement : revenir au commit précédent
via GitHub (`Settings → Branches → main → Revert`) ou :

```bash
git revert HEAD
git push origin main
```

Vercel rebuild automatiquement la version précédente.

## Prochaines étapes hors scope v3.1

- **Traductions complètes EN** des 559 textes des labs (actuellement
  symétriques FR=EN). À compléter fichier par fichier par l'équipe.
- **Animations WebM** du logo v3 (3 variantes : web, LinkedIn, sceau) —
  placeholder « À VENIR » dans la galerie en attendant.
- **PDFs KMDOC001-007** — nouvelle identité v3 à appliquer, dépôt manuel
  dans `/docs/`.
- **Mise à jour identité v3 sur lab.kyriosmica.com** (Next.js, dépôt
  séparé) et **api.kyriosmica.com** (FastAPI, dépôt séparé).

