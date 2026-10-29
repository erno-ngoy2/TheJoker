# Déployer sur Render

Guide complet pour publier votre blog Erno Ngoy sur Render (gratuit).

## Prérequis

- Compte GitHub (gratuit) : https://github.com
- Compte Render (gratuit) : https://render.com
- Git installé sur votre ordinateur

---

## Étape 1 : Créer un repository GitHub

### 1.1 Initialiser Git dans votre projet

Ouvrez un terminal dans le dossier de votre projet :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Blog Erno Ngoy"

# Créer la branche principale
git branch -M main
```

### 1.2 Créer un repository sur GitHub

1. Allez sur https://github.com/new
2. Nom du repository : `blog-erno-ngoy` (ou autre)
3. **Ne cochez PAS** "Add a README file" (vous en avez déjà un)
4. Cliquez sur "Create repository"

### 1.3 Pousser votre code vers GitHub

GitHub vous donne les commandes à exécuter :

```bash
# Ajouter le repository distant
git remote add origin https://github.com/VOTRE-NOM/blog-erno-ngoy.git

# Pousser le code
git push -u origin main
```

---

## Étape 2 : Déployer sur Render

### 2.1 Se connecter à Render

1. Allez sur https://render.com
2. Cliquez sur "Get Started" ou "Sign In"
3. Connectez-vous avec votre compte GitHub (recommandé)

### 2.2 Créer un nouveau Static Site

1. Dans le dashboard Render, cliquez sur **"New +"**
2. Sélectionnez **"Static Site"**

### 2.3 Connecter votre repository

1. Render vous demande de connecter votre compte GitHub
2. Autorisez Render à accéder à vos repositories
3. Cherchez et sélectionnez **"blog-erno-ngoy"**
4. Cliquez sur **"Connect"**

### 2.4 Configurer le déploiement

Remplissez les champs suivants :

| Champ | Valeur |
|-------|--------|
| **Name** | `blog-erno-ngoy` (ou votre choix) |
| **Branch** | `main` |
| **Root Directory** | *(laisser vide)* |
| **Build Command** | `npm run build` |
| **Publish Directory** | `dist` |
| **Instance Type** | `Free` |

### 2.5 Déployer

1. Cliquez sur **"Create Static Site"**
2. Render va automatiquement :
   - Cloner votre repository
   - Exécuter `npm install`
   - Exécuter `npm run build`
   - Déployer le contenu de `dist/`

3. Attendez 2-3 minutes

### 2.6 Accéder à votre site

Une fois le déploiement terminé :

1. Render vous donne une URL comme : `blog-erno-ngoy.onrender.com`
2. Cliquez dessus pour voir votre blog en ligne
3. Partagez cette URL avec vos lecteurs

---

## Étape 3 : Configuration avancée (optionnel)

### 3.1 Domaine personnalisé

Si vous avez votre propre domaine (ex: `ernongoy.com`) :

1. Dans Render, allez dans **"Settings"** > **"Custom Domain"**
2. Cliquez sur **"Add Custom Domain"**
3. Entrez votre domaine
4. Suivez les instructions pour configurer les DNS :
   - Ajoutez un enregistrement CNAME pointant vers votre site Render
   - Exemple : `www` → `blog-erno-ngoy.onrender.com`

### 3.2 Variables d'environnement

Si vous ajoutez des fonctionnalités nécessitant des clés API :

1. Allez dans **"Environment"**
2. Cliquez sur **"Add Environment Variable"**
3. Ajoutez vos variables (ex: `API_KEY`, `SECRET_TOKEN`)

### 3.3 Redirections (pour les URLs propres)

Créez un fichier `render.yaml` à la racine de votre projet :

```yaml
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```

Cela permet d'avoir des URLs propres sans `.html`.

---

## Étape 4 : Mettre à jour votre site

Quand vous modifiez votre code :

```bash
# Après vos modifications
git add .
git commit -m "Description des changements"
git push
```

Render détecte automatiquement le push et redéploie votre site en 2-3 minutes.

---

## Dépannage

### Le site ne se déploie pas

**Vérifiez :**
- Le build command est bien `npm run build`
- Le publish directory est bien `dist`
- Votre code compile sans erreur localement (`npm run build` fonctionne)

### Erreur de build

**Causes possibles :**
- Dépendances manquantes dans `package.json`
- Erreurs TypeScript
- Fichiers mal nommés

**Solution :**
```bash
# Testez localement
npm install
npm run build

# Corrigez les erreurs, puis poussez
git add .
git commit -m "Fix build errors"
git push
```

### Le site affiche une page blanche

**Causes possibles :**
- Chemins incorrects dans `dist/index.html`
- Fichiers JS/CSS non chargés

**Solution :**
Vérifiez que `vite.config.js` ne modifie pas le `base` path.

### Les images ne s'affichent pas

**Cause :** Images trop lourdes ou mal encodées

**Solution :**
- Compressez les images avant upload
- Utilisez des URLs externes pour les images volumineuses
- Voir `STOCKAGE_IMAGES.md`

---

## Avantages de Render pour ce projet

### Gratuit
- Pas de carte de crédit requise
- Pas de limite de bande passante
- Déploiements illimités

### Simple
- Déploiement automatique depuis GitHub
- Interface intuitive
- Logs accessibles

### Performant
- CDN mondial inclus
- HTTPS automatique
- SSL gratuit

### Évolutif
- Upgrade facile si besoin
- Support des domaines personnalisés
- Variables d'environnement

---

## Alternatives gratuites

Si Render ne vous convient pas :

### Netlify
```bash
# Glissez-déposez le dossier dist/ sur netlify.com
# Ou via CLI
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
# Modifiez vite.config.js pour ajouter :
# base: '/blog-erno-ngoy/'

npm run build
npm install -g gh-pages
gh-pages -d dist
```

---

## Résumé rapide

```bash
# 1. Créer le repository GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE-NOM/blog-erno-ngoy.git
git push -u origin main

# 2. Sur Render
# - New + > Static Site
# - Connecter le repository
# - Build Command: npm run build
# - Publish Directory: dist
# - Deploy

# 3. Votre site est en ligne !
```

---

**Votre blog sera accessible en quelques minutes sur une URL comme :**
`https://blog-erno-ngoy.onrender.com`
