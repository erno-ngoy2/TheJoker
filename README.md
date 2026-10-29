# Blog Personnel - Erno Ngoy

Un blog personnel moderne et élégant pour partager vos recherches, découvertes et articles.

## ✨ Fonctionnalités

- 🔐 **Authentification** : Inscription et connexion avec email/mot de passe
- 👤 **Profil personnalisable** : Modifiez vos informations, bio et liens sociaux
- ✍️ **Éditeur d'articles** : Créez et modifiez facilement vos articles
- 🔗 **Liens cliquables** : Insérez des liens dans vos articles avec la syntaxe Markdown
- 🖼️ **Images** : Uploadez des images ou insérez-les via URL
- 📂 **Catégories** : Organisez vos contenus en Recherches, Découvertes ou Articles
- 🔍 **Recherche** : Trouvez rapidement vos articles
- 📱 **Responsive** : Fonctionne sur tous les appareils
- 💾 **Stockage local** : Toutes les données sont sauvegardées dans votre navigateur

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Build pour production

```bash
npm run build
```

Les fichiers seront générés dans le dossier `dist/`

## 📖 Utilisation

### Inscription

1. Ouvrez le blog
2. Cliquez sur "Inscription"
3. Entrez votre nom (pré-rempli avec "Erno Ngoy")
4. Entrez votre email et un mot de passe
5. Cliquez sur "S'inscrire"

### Écrire un article

1. Cliquez sur "Écrire un article" dans le menu
2. Remplissez le titre
3. Choisissez une catégorie (Recherche, Découverte, Article)
4. Écrivez votre contenu
5. Utilisez la barre d'outils pour :
   - Insérer un lien : cliquez sur "Lien" ou utilisez `[texte](url)`
   - Insérer une image : cliquez sur "Upload image" ou "Image URL"
6. Ajoutez des tags si souhaité
7. Cliquez sur "Publier l'article"

### Syntaxe Markdown supportée

- **Liens** : `[Texte du lien](https://exemple.com)`
- **Images** : `![Description](url-de-l-image)`
- **URLs** : Les URLs complètes (https://...) sont automatiquement cliquables

### Modifier votre profil

1. Cliquez sur "Mon Profil" dans le menu
2. Modifiez vos informations :
   - Nom, email, bio
   - Liens sociaux (GitHub, Twitter, LinkedIn, site web)
   - Mot de passe
3. Cliquez sur "Sauvegarder"

## 🌐 Déploiement

### Option 1 : Déploiement statique (recommandé)

Le blog est une application statique, vous pouvez la déployer sur :

#### Netlify
```bash
# Glissez-déposez le dossier dist/ sur netlify.com
# Ou utilisez Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

#### Vercel
```bash
npm install -g vercel
vercel
```

#### GitHub Pages
```bash
# Ajoutez dans vite.config.ts :
# base: '/nom-de-votre-repo/'

npm run build
# Uploadez le contenu de dist/ sur gh-pages
```

### Option 2 : Serveur local

```bash
npm run build
npm install -g serve
serve -s dist
```

## 🎨 Personnalisation

### Changer les couleurs

Modifiez les classes Tailwind dans les composants :
- `src/components/Auth.tsx` : Page de connexion
- `src/App.tsx` : Layout principal
- `src/components/Sidebar.tsx` : Menu latéral

### Modifier le nom par défaut

Dans `src/components/Auth.tsx`, ligne 11 :
```typescript
const [name, setName] = useState('Erno Ngoy');
```

## 📦 Structure du projet

```
├── src/
│   ├── components/
│   │   ├── Auth.tsx          # Page de connexion/inscription
│   │   ├── Sidebar.tsx       # Menu latéral
│   │   ├── ArticleForm.tsx   # Formulaire d'article
│   │   ├── ArticleCard.tsx   # Carte d'article
│   │   ├── ArticleView.tsx   # Visualisation d'article
│   │   └── Profile.tsx       # Page de profil
│   ├── App.tsx               # Composant principal
│   ├── types.ts              # Types TypeScript
│   ├── main.tsx              # Point d'entrée
│   └── index.css             # Styles globaux
├── dist/                     # Fichiers de production
├── package.json
└── README.md
```

## 🔒 Sécurité

⚠️ **Important** : Ce blog utilise le stockage local du navigateur (localStorage). Les données sont stockées uniquement sur votre appareil.

- Les mots de passe sont stockés en clair dans le localStorage
- Pour une utilisation en production avec plusieurs utilisateurs, ajoutez un backend
- Ne partagez pas votre appareil sans vous déconnecter

## 🛠️ Technologies

- **React 18** : Framework UI
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styling
- **Vite** : Build tool
- **LocalStorage** : Persistance des données

## 📝 Licence

Projet personnel - Usage libre

## 🤝 Support

Pour toute question ou problème, n'hésitez pas à modifier le code selon vos besoins !

---

**Créé avec ❤️ pour Erno Ngoy**
