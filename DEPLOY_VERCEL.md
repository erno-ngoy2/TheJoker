# Déployer sur Vercel

Guide complet pour publier votre blog Erno Ngoy sur Vercel (gratuit).

## Prérequis

- Compte GitHub (gratuit) : https://github.com
- Compte Vercel (gratuit) : https://vercel.com
- Git installé sur votre ordinateur (optionnel mais recommandé)

---

## Méthode 1 : Via l'interface Vercel (recommandé)

### Étape 1 : Créer un repository GitHub

#### 1.1 Initialiser Git dans votre projet

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

#### 1.2 Créer un repository sur GitHub

1. Allez sur https://github.com/new
2. Nom du repository : `blog-erno-ngoy` (ou autre)
3. **Ne cochez PAS** "Add a README file" (vous en avez déjà un)
4. Cliquez sur "Create repository"

#### 1.3 Pousser votre code vers GitHub

```bash
# Ajouter le repository distant
git remote add origin https://github.com/VOTRE-NOM/blog-erno-ngoy.git

# Pousser le code
git push -u origin main
```

### Étape 2 : Déployer sur Vercel

#### 2.1 Se connecter à Vercel

1. Allez sur https://vercel.com
2. Cliquez sur **"Sign Up"**
3. Choisissez **"Continue with GitHub"** (recommandé)
4. Autorisez Vercel à accéder à vos repositories

#### 2.2 Importer votre projet

1. Sur le dashboard Vercel, cliquez sur **"Add New..."** → **"Project"**
2. Vous verrez la liste de vos repositories GitHub
3. Cherchez **"blog-erno-ngoy"**
4. Cliquez sur **"Import"**

#### 2.3 Configurer le déploiement

Vercel détecte automatiquement que c'est un projet Vite. Vérifiez les paramètres :

| Paramètre | Valeur |
|-----------|--------|
| **Framework Preset** | `Vite` |
| **Root Directory** | `./` (par défaut) |
| **Build Command** | `npm run build` (auto-détecté) |
| **Output Directory** | `dist` (auto-détecté) |
| **Install Command** | `npm install` (par défaut) |

#### 2.4 Déployer

1. Cliquez sur **"Deploy"**
2. Vercel va automatiquement :
   - Cloner votre repository
   - Installer les dépendances
   - Builder le projet
   - Déployer le site

3. Attendez 1-2 minutes

#### 2.5 Accéder à votre site

Une fois le déploiement terminé :

1. Vercel vous donne une URL comme : `blog-erno-ngoy.vercel.app`
2. Cliquez dessus pour voir votre blog en ligne
3. Partagez cette URL avec vos lecteurs

---

## Méthode 2 : Via Vercel CLI (pour les développeurs)

### Étape 1 : Installer Vercel CLI

```bash
npm install -g vercel
```

### Étape 2 : Se connecter

```bash
vercel login
```

Suivez les instructions (email ou GitHub).

### Étape 3 : Déployer

Dans le dossier de votre projet :

```bash
# Premier déploiement (mode développement)
vercel

# Suivez les instructions :
# ? Set up and deploy "~/path/to/project"? [Y/n] Y
# ? Which scope do you want to deploy to? (choisissez votre compte)
# ? Link to existing project? [y/N] N
# ? What's your project's name? blog-erno-ngoy
# ? In which directory is your code located? ./
# ? Want to modify these settings? [y/N] N
```

### Étape 4 : Déployer en production

```bash
# Déploiement en production
vercel --prod
```

Votre site est maintenant en ligne !

---

## Étape 3 : Configuration avancée (optionnel)

### 3.1 Domaine personnalisé

Si vous avez votre propre domaine (ex: `ernongoy.com`) :

1. Dans Vercel, allez dans votre projet
2. Cliquez sur **"Settings"** → **"Domains"**
3. Entrez votre domaine (ex: `ernongoy.com`)
4. Vercel vous donne les instructions DNS :
   - **Pour un domaine racine** : Ajoutez un enregistrement A pointant vers `76.76.21.21`
   - **Pour un sous-domaine** : Ajoutez un CNAME pointant vers `cname.vercel-dns.com`

5. Attendez la propagation DNS (5 minutes à 48 heures)

### 3.2 Variables d'environnement

Si vous ajoutez des fonctionnalités nécessitant des clés API :

1. Allez dans **"Settings"** → **"Environment Variables"**
2. Cliquez sur **"Add"**
3. Ajoutez vos variables (ex: `API_KEY`, `SECRET_TOKEN`)
4. Choisissez les environnements (Production, Preview, Development)
5. Cliquez sur **"Save"**
6. Redéployez pour appliquer les changements

### 3.3 Fichier vercel.json (optionnel)

Créez un fichier `vercel.json` à la racine de votre projet pour des configurations avancées :

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

Cela permet :
- Des URLs propres sans `.html`
- Un cache optimisé pour les assets

---

## Étape 4 : Mettre à jour votre site

Quand vous modifiez votre code :

```bash
# Après vos modifications
git add .
git commit -m "Description des changements"
git push
```

Vercel détecte automatiquement le push et redéploie votre site en 1-2 minutes.

### Prévisualisation des branches

Vercel crée automatiquement des URLs de prévisualisation pour chaque branche :

```bash
# Créer une nouvelle branche
git checkout -b nouvelle-fonctionnalite

# Modifier le code
git add .
git commit -m "Ajout d'une fonctionnalité"
git push

# Vercel crée une URL de prévisualisation :
# https://blog-erno-ngoy-abc123.vercel.app
```

Cela permet de tester les changements avant de les fusionner dans `main`.

---

## Dépannage

### Le site ne se déploie pas

**Vérifiez :**
- Le repository est bien connecté
- La branche `main` existe
- Votre code compile sans erreur localement (`npm run build` fonctionne)

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

### Erreur de build

**Causes possibles :**
- Dépendances manquantes dans `package.json`
- Erreurs TypeScript
- Fichiers mal nommés

**Solution :**
Consultez les logs de build dans Vercel :
1. Allez dans votre projet
2. Cliquez sur **"Deployments"**
3. Cliquez sur le déploiement échoué
4. Consultez les logs pour voir l'erreur

### Le site affiche une page blanche

**Causes possibles :**
- Chemins incorrects dans `dist/index.html`
- Fichiers JS/CSS non chargés

**Solution :**
Vérifiez que `vite.config.js` ne modifie pas le `base` path. Si nécessaire, ajoutez :

```javascript
export default defineConfig({
  base: '/',
  // ... autres configurations
})
```

### Les images ne s'affichent pas

**Cause :** Images trop lourdes ou mal encodées

**Solution :**
- Compressez les images avant upload
- Utilisez des URLs externes pour les images volumineuses
- Voir `STOCKAGE_IMAGES.md`

### Erreur 404 sur les pages

**Cause :** Vercel ne trouve pas les fichiers

**Solution :**
Vérifiez que le fichier `vercel.json` contient les rewrites :

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Avantages de Vercel pour ce projet

### Gratuit
- Pas de carte de crédit requise
- Bande passante illimitée
- 100 GB de bande passante/mois
- Déploiements illimités

### Simple
- Déploiement automatique depuis GitHub
- Interface intuitive
- Logs accessibles
- Prévisualisation automatique des branches

### Performant
- CDN mondial (Edge Network)
- HTTPS automatique
- SSL gratuit
- Compression automatique
- Optimisation des images

### Évolutif
- Upgrade facile si besoin
- Support des domaines personnalisés
- Variables d'environnement
- Serverless Functions (si besoin futur)

### Intégrations
- GitHub, GitLab, Bitbucket
- Slack (notifications)
- Analytics intégrés
- A/B testing

---

## Comparaison avec d'autres plateformes

| Fonctionnalité | Vercel | Render | Netlify | GitHub Pages |
|----------------|--------|--------|---------|--------------|
| **Gratuit** | ✅ | ✅ | ✅ | ✅ |
| **Déploiement auto** | ✅ | ✅ | ✅ | ✅ |
| **Prévisualisation** | ✅ | ❌ | ✅ | ❌ |
| **CDN mondial** | ✅ | ✅ | ✅ | ✅ |
| **Domaine personnalisé** | ✅ | ✅ | ✅ | ✅ |
| **HTTPS auto** | ✅ | ✅ | ✅ | ✅ |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Facilité** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## Résumé rapide

### Via l'interface (recommandé)

```bash
# 1. Créer le repository GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE-NOM/blog-erno-ngoy.git
git push -u origin main

# 2. Sur Vercel
# - Sign Up avec GitHub
# - Import Project
# - Sélectionner le repository
# - Deploy (configuration auto-détectée)

# 3. Votre site est en ligne !
```

### Via CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

---

## Liens utiles

- Documentation Vercel : https://vercel.com/docs
- Guide Vite sur Vercel : https://vercel.com/guides/deploying-vite-projects-with-vercel
- Support Vercel : https://vercel.com/support

---

**Votre blog sera accessible en quelques minutes sur une URL comme :**
`https://blog-erno-ngoy.vercel.app`

**Avec un domaine personnalisé :**
`https://ernongoy.com`
