# Erno Ngoy — Carnets de recherche

Un blog éditorial personnel, minimaliste et soigné. Conçu comme un carnet d'auteur, pas comme un template.

## Architecture

**Un seul auteur, des lecteurs multiples.**

Seul `ernongoy@gmail.com` peut publier. Les visiteurs lisent sans authentification.

- **Espace public** : lecture des notes, navigation par catégorie, contact par email
- **Espace auteur** : écriture, modification, suppression, gestion du profil

## Design

**Palette**
- Fond : `#0B0F19` (bleu-noir profond, jamais noir pur)
- Surface : `#131825` / `#1A2033` (nuances ardoise teintées)
- Texte : `#E8E6E3` (blanc cassé chaud, jamais blanc pur)
- Accent : `#4A6FA5` (bleu cobalt mat, réservé aux CTA)

**Typographie**
- Titres : Fraunces (serif, optical sizing)
- Corps : DM Sans (sans-serif, fine et lisible)

**Principes**
- Alignement majoritairement à gauche
- Compositions asymétriques, grilles 12 colonnes
- Grands espaces vides, rythme éditorial
- Micro-interactions discrètes (hover, transitions)
- Zéro emoji dans l'interface

## Fonctionnalités

### Pour les lecteurs
- Navigation : Accueil, Recherches, Découvertes, Articles
- Lecture des notes avec liens cliquables et images
- Bouton "Me contacter" → `mailto:ernongoy@gmail.com`
- Design responsive pensé sur mesure

### Pour l'auteur
- Connexion restreinte à `ernongoy@gmail.com`
- Première connexion : définition du mot de passe
- Éditeur avec :
  - Titre, catégorie, résumé
  - Contenu avec syntaxe Markdown
  - Insertion de liens (dialogue dédié)
  - Upload d'images (base64, max 5 Mo)
  - Insertion d'images par URL
  - Mots-clés
- Gestion du profil (nom, bio, localisation, mot de passe)

## Stack technique

- React 18 + TypeScript
- Tailwind CSS 4
- Vite
- LocalStorage (persistance côté client)
- Google Fonts (Fraunces + DM Sans)

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Le dossier `dist/` contient les fichiers de production.

## Déploiement

Le site est 100% statique. Déployable sur :
- **Netlify** : glisser-déposer le dossier `dist/`
- **Vercel** : `vercel` en CLI
- **GitHub Pages** : push du contenu de `dist/` sur `gh-pages`
- **Tout hébergeur** : upload FTP du contenu de `dist/`

## Structure

```
src/
├── components/
│   ├── Auth.tsx              # Connexion auteur
│   ├── PublicHeader.tsx      # Navigation publique
│   ├── PublicHome.tsx        # Page d'accueil éditoriale
│   ├── PublicArticleView.tsx # Lecture d'une note
│   └── AuthorDashboard.tsx   # Espace auteur complet
├── types.ts                  # Types + constante AUTHOR_EMAIL
├── App.tsx                   # Orchestration
├── main.tsx                  # Point d'entrée
└── index.css                 # Design system complet
```

## Sécurité

Les données sont stockées dans le `localStorage` du navigateur :
- Un seul compte auteur possible
- Email fixe : `ernongoy@gmail.com`
- Mot de passe défini à la première connexion
- Les lecteurs n'ont pas de compte

Pour une utilisation multi-utilisateurs avec authentification robuste, un backend serait nécessaire.

## Licence

Projet personnel.

---

Conçu et développé pour Erno Ngoy.
