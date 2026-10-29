# 📦 Comment créer votre ZIP prêt à publier

## Méthode 1 : ZIP complet du projet

### Sur Windows
1. Ouvrez l'Explorateur de fichiers
2. Naviguez jusqu'au dossier parent de votre projet
3. Faites un clic droit sur le dossier du projet
4. Sélectionnez "Envoyer vers" > "Dossier compressé"
5. Renommez le fichier ZIP en `blog-erno-ngoy.zip`

### Sur Mac
1. Ouvrez le Finder
2. Naviguez jusqu'au dossier parent de votre projet
3. Faites un clic droit sur le dossier du projet
4. Sélectionnez "Comprimer"
5. Renommez le fichier ZIP en `blog-erno-ngoy.zip`

### Sur Linux (terminal)
```bash
cd ..
zip -r blog-erno-ngoy.zip nom-du-projet/
```

---

## Méthode 2 : ZIP du dossier dist/ uniquement (recommandé pour déploiement)

### Étape 1 : Build le projet
```bash
npm run build
```

### Étape 2 : Créer le ZIP
Le dossier `dist/` contient tous les fichiers nécessaires pour le déploiement.

#### Sur Windows
1. Ouvrez l'Explorateur de fichiers
2. Entrez dans le dossier `dist/`
3. Sélectionnez tous les fichiers (Ctrl+A)
4. Clic droit > "Envoyer vers" > "Dossier compressé"
5. Renommez en `blog-deploy.zip`

#### Sur Mac
1. Ouvrez le Finder
2. Entrez dans le dossier `dist/`
3. Sélectionnez tous les fichiers (Cmd+A)
4. Clic droit > "Comprimer"
5. Renommez en `blog-deploy.zip`

#### Sur Linux (terminal)
```bash
cd dist
zip -r ../blog-deploy.zip .
```

---

## 🎯 Que contient le ZIP ?

### ZIP complet du projet
```
blog-erno-ngoy.zip
└── projet/
    ├── src/              # Code source
    ├── dist/             # Fichiers de production
    ├── node_modules/     # Dépendances (peut être gros)
    ├── package.json
    ├── README.md
    └── ...
```

### ZIP du dossier dist/ uniquement
```
blog-deploy.zip
├── index.html
└── assets/
    ├── index-xxxxx.css
    └── index-xxxxx.js
```

---

## 📤 Où uploader votre ZIP ?

### Netlify (recommandé)
1. Allez sur https://app.netlify.com
2. Connectez-vous ou créez un compte
3. Glissez-déposez le ZIP `blog-deploy.zip` sur la page
4. Votre site est en ligne !

### Vercel
1. Allez sur https://vercel.com
2. Connectez-vous avec GitHub
3. Importez votre projet ou uploadez le ZIP

### GitHub Pages
1. Créez un repository sur GitHub
2. Uploadez le contenu du dossier `dist/`
3. Activez GitHub Pages dans les settings

---

## ✅ Checklist avant déploiement

- [ ] Le projet compile sans erreur (`npm run build`)
- [ ] Vous avez testé localement (`npm run dev`)
- [ ] Vous avez créé un compte test
- [ ] Vous avez écrit un article test
- [ ] Vous avez testé les liens cliquables
- [ ] Vous avez testé l'upload d'images
- [ ] Vous avez vérifié le responsive sur mobile

---

## 🎉 Votre blog est prêt !

Le ZIP contient tout ce qu'il faut pour déployer votre blog personnel.
Choisissez la méthode de déploiement qui vous convient le mieux et suivez le GUIDE_DEPLOIEMENT.md

---

**Bonne publication ! 🚀**
