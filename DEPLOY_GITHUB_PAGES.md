# Déployer sur GitHub Pages

Guide complet pour publier votre blog Erno Ngoy sur GitHub Pages (100% gratuit).

---

## Étape 1 : Modifier vite.config.js

**IMPORTANT** : Ajoutez le `base` dans `vite.config.js` avec le nom de votre repository :

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/blog-erno-ngoy/", // ← Remplacez par le nom de votre repo
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});
```

⚠️ **Le nom doit correspondre exactement au nom de votre repository GitHub.**

---

## Étape 2 : Créer un repository GitHub

### 2.1 Sur GitHub.com

1. Allez sur https://github.com/new
2. **Repository name** : `blog-erno-ngoy` (ou votre choix)
3. **Public** (obligatoire pour GitHub Pages gratuit)
4. **Ne cochez PAS** "Add a README file"
5. Cliquez sur **"Create repository"**

### 2.2 Initialiser Git dans votre projet

```bash
# Dans le dossier de votre projet
git init
git add .
git commit -m "Initial commit - Blog Erno Ngoy"
git branch -M main
```

### 2.3 Pousser vers GitHub

```bash
git remote add origin https://github.com/VOTRE-NOM/blog-erno-ngoy.git
git push -u origin main
```

---

## Étape 3 : Activer GitHub Pages

### Méthode 1 : GitHub Actions (recommandé)

1. Sur GitHub, allez dans votre repository
2. Cliquez sur **"Settings"** (onglet en haut)
3. Dans le menu de gauche, cliquez sur **"Pages"**
4. Sous **"Source"**, sélectionnez **"GitHub Actions"**
5. Le workflow va se lancer automatiquement au prochain push

### Méthode 2 : Branche gh-pages (alternative)

1. Sur GitHub, allez dans **Settings** → **Pages**
2. Sous **"Source"**, sélectionnez **"Deploy from a branch"**
3. **Branch** : `gh-pages` / `root`
4. Cliquez sur **"Save"**

---

## Étape 4 : Déployer avec GitHub Actions

### 4.1 Le workflow est déjà configuré

Le fichier `.github/workflows/deploy.yml` est inclus dans votre projet. Il va automatiquement :
- Builder votre site à chaque push sur `main`
- Déployer le contenu de `dist/` sur GitHub Pages

### 4.2 Vérifier le déploiement

1. Sur GitHub, allez dans l'onglet **"Actions"**
2. Vous verrez le workflow en cours d'exécution
3. Attendez qu'il se termine (✓ vert)

### 4.3 Accéder à votre site

Votre blog sera accessible à :
```
https://VOTRE-NOM.github.io/blog-erno-ngoy/
```

---

## Étape 5 : Mettre à jour votre site

Quand vous modifiez votre code :

```bash
# Après vos modifications
git add .
git commit -m "Description des changements"
git push
```

GitHub Actions redéploie automatiquement en 1-2 minutes.

---

## Configuration du domaine personnalisé (optionnel)

### Sous-domaine (ex: blog.ernongoy.com)

1. Sur GitHub : **Settings** → **Pages** → **Custom domain**
2. Entrez : `blog.ernongoy.com`
3. Chez votre registrar DNS, ajoutez un **CNAME** :
   - **Name** : `blog`
   - **Value** : `VOTRE-NOM.github.io`

### Domaine racine (ex: ernongoy.com)

1. Sur GitHub : **Settings** → **Pages** → **Custom domain**
2. Entrez : `ernongoy.com`
3. Chez votre registrar DNS, ajoutez 4 enregistrements **A** :
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
4. Ajoutez un enregistrement **CNAME** pour `www` :
   - **Name** : `www`
   - **Value** : `VOTRE-NOM.github.io`

---

## Dépannage

### Le site affiche une page blanche

**Cause** : Le `base` dans `vite.config.js` est incorrect

**Solution** : Vérifiez que le `base` correspond exactement au nom de votre repository :
```javascript
base: "/blog-erno-ngoy/", // doit matcher le nom du repo
```

### Les images et styles ne chargent pas

**Cause** : Chemins absolus incorrects

**Solution** : Le `base` dans `vite.config.js` corrige automatiquement les chemins. Vérifiez qu'il est bien défini.

### Erreur 404 sur les pages

**Cause** : GitHub Pages ne redirige pas les routes SPA

**Solution** : Créez un fichier `404.html` dans `public/` :

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Blog Erno Ngoy</title>
  <script>
    sessionStorage.redirect = location.href;
  </script>
  <meta http-equiv="refresh" content="0;URL='/blog-erno-ngoy/'">
</head>
<body>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</body>
</html>
```

Et ajoutez ce script dans `src/main.tsx` :

```typescript
(function() {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, '', redirect);
  }
})();
```

### Le workflow échoue

**Vérifiez** :
- Le fichier `.github/workflows/deploy.yml` existe
- Vous avez pushé sur la branche `main`
- Les logs dans l'onglet **Actions** pour voir l'erreur

**Solution** :
```bash
# Testez localement
npm install
npm run build

# Corrigez les erreurs, puis poussez
git add .
git commit -m "Fix build errors"
git push
```

---

## Avantages de GitHub Pages

### Gratuit
- Pas de limite de bande passante
- 1 GB de stockage maximum
- 100 GB de bande passante/mois

### Simple
- Intégré à GitHub
- Déploiement automatique via Actions
- Pas de configuration serveur

### Performant
- CDN mondial (Fastly)
- HTTPS automatique
- SSL gratuit

### Limitations
- Sites publics uniquement (sauf GitHub Pro)
- Pas de backend/server-side
- Limite de taille : 1 GB

---

## Résumé rapide

```bash
# 1. Modifier vite.config.js
# Ajouter : base: "/blog-erno-ngoy/"

# 2. Créer le repository GitHub
# github.com/new → "blog-erno-ngoy" → Public

# 3. Pousser le code
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE-NOM/blog-erno-ngoy.git
git push -u origin main

# 4. Activer GitHub Pages
# Settings → Pages → Source: GitHub Actions

# 5. Votre site est en ligne !
# https://VOTRE-NOM.github.io/blog-erno-ngoy/
```

---

## Comparaison des plateformes gratuites

| Plateforme | Déploiement | Domaine custom | HTTPS | Performance |
|------------|-------------|----------------|-------|-------------|
| **GitHub Pages** | Git push | ✅ | ✅ | ⭐⭐⭐⭐ |
| **Vercel** | Git push | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **Netlify** | Git push | ✅ | ✅ | ⭐⭐⭐⭐ |
| **Render** | Git push | ✅ | ✅ | ⭐⭐⭐ |

---

**Votre blog sera accessible à :**
`https://VOTRE-NOM.github.io/blog-erno-ngoy/`
