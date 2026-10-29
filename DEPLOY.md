# Déploiement rapide

## Créer le ZIP prêt à publier

### Option 1 : ZIP du dossier dist/ (recommandé)

Le dossier `dist/` contient tous les fichiers nécessaires pour le déploiement.

**Sur Mac/Linux :**
```bash
cd dist
zip -r ../blog-erno-ngoy.zip .
```

**Sur Windows :**
1. Ouvrir le dossier `dist/`
2. Sélectionner tous les fichiers (Ctrl+A)
3. Clic droit → Envoyer vers → Dossier compressé
4. Renommer en `blog-erno-ngoy.zip`

### Option 2 : ZIP du projet complet

```bash
cd ..
zip -r blog-erno-ngoy.zip nom-du-projet/ -x "node_modules/*"
```

## Déployer sur Netlify (le plus simple)

1. Aller sur https://app.netlify.com
2. Se connecter ou créer un compte gratuit
3. Glisser-déposer le fichier `blog-erno-ngoy.zip` ou le dossier `dist/`
4. Le site est en ligne en 30 secondes

## Déployer sur Vercel

```bash
npm install -g vercel
vercel
```

Suivre les instructions.

## Déployer sur GitHub Pages

1. Créer un repository GitHub
2. Modifier `vite.config.ts` pour ajouter `base: '/nom-du-repo/'`
3. Build : `npm run build`
4. Installer gh-pages : `npm install -g gh-pages`
5. Déployer : `gh-pages -d dist`
6. Activer GitHub Pages dans les settings du repo

## Première utilisation

1. Ouvrir l'URL du site déployé
2. Cliquer sur "Connexion" en haut à droite
3. Entrer `ernongoy@gmail.com`
4. Définir un mot de passe (première connexion)
5. Commencer à écrire des notes

## Contact

Le bouton "Me contacter" envoie un email à `ernongoy@gmail.com`.

---

Le site est 100% statique, aucune base de données ni serveur requis.
