# 🚀 Guide de déploiement rapide

## Votre blog est prêt à être publié !

Voici les étapes simples pour mettre votre blog en ligne :

---

## Option 1 : Netlify (Le plus simple - GRATUIT)

### Étape 1 : Build le projet
```bash
npm run build
```

### Étape 2 : Déployer sur Netlify
1. Allez sur https://app.netlify.com
2. Créez un compte gratuit (ou connectez-vous)
3. Glissez-déposez le dossier `dist/` sur la page d'accueil
4. C'est tout ! Votre site est en ligne en 30 secondes

### Étape 3 : Personnaliser le domaine (optionnel)
- Netlify vous donne un domaine gratuit (ex: `votre-blog-123.netlify.app`)
- Vous pouvez connecter votre propre domaine

---

## Option 2 : Vercel (GRATUIT)

### Étape 1 : Installer Vercel CLI
```bash
npm install -g vercel
```

### Étape 2 : Déployer
```bash
vercel
```

Suivez les instructions et votre site sera en ligne !

---

## Option 3 : GitHub Pages (GRATUIT)

### Étape 1 : Créer un repository GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-nom/votre-blog.git
git push -u origin main
```

### Étape 2 : Modifier vite.config.ts
Ajoutez à la fin du fichier :
```typescript
base: '/nom-de-votre-repo/'
```

### Étape 3 : Build et déployer
```bash
npm run build
npm install -g gh-pages
gh-pages -d dist
```

### Étape 4 : Activer GitHub Pages
1. Allez sur votre repository GitHub
2. Settings > Pages
3. Source : Deploy from a branch
4. Branch : gh-pages
5. Votre site sera accessible sur `https://votre-nom.github.io/nom-de-votre-repo/`

---

## Option 4 : Hébergement classique (FTP)

### Étape 1 : Build le projet
```bash
npm run build
```

### Étape 2 : Uploader les fichiers
1. Connectez-vous à votre hébergeur via FTP
2. Uploadez tout le contenu du dossier `dist/` dans le dossier `public_html` ou `www`
3. C'est terminé !

---

## ✅ Vérification après déploiement

1. Ouvrez l'URL de votre blog
2. Inscrivez-vous avec votre email
3. Créez votre premier article
4. Testez les liens et images
5. Modifiez votre profil

---

## 🎯 Fonctionnalités disponibles

- ✅ Authentification par email/mot de passe
- ✅ Profil personnalisable (nom, bio, réseaux sociaux)
- ✅ Création d'articles avec catégories
- ✅ Liens cliquables dans les articles
- ✅ Upload d'images
- ✅ Recherche d'articles
- ✅ Design responsive
- ✅ Menu latéral animé

---

## 💡 Conseils

1. **Sauvegardez vos données** : Les articles sont stockés dans le navigateur. Exportez-les régulièrement.
2. **Sécurité** : Ne partagez pas votre appareil sans vous déconnecter.
3. **Personnalisation** : Modifiez les couleurs et le design dans les fichiers CSS.
4. **Nom par défaut** : Le nom "Erno Ngoy" est pré-rempli lors de l'inscription.

---

## 🔧 En cas de problème

### Le site ne s'affiche pas
- Vérifiez que tous les fichiers du dossier `dist/` ont été uploadés
- Vérifiez la console du navigateur (F12) pour les erreurs

### Les images ne s'affichent pas
- Les images sont stockées en base64 dans le navigateur
- Pour les images externes, vérifiez que les URLs sont accessibles

### Impossible de se connecter
- Les données sont stockées dans le localStorage
- Si vous changez de navigateur, vous devrez vous réinscrire

---

## 📞 Support

Votre blog est 100% autonome et ne nécessite aucun serveur backend !
Toutes les données sont stockées localement dans le navigateur de l'utilisateur.

---

**Bon déploiement ! 🚀**
