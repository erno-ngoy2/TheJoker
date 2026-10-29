# Stockage des images — Comment ça fonctionne

## Le système actuel

Les images sont stockées **en base64** directement dans le `localStorage` du navigateur.

### Ce que cela signifie concrètement

Quand vous téléversez une image :
1. Le fichier est converti en chaîne de caractères (base64)
2. Cette chaîne est sauvegardée dans l'article, dans le champ `images`
3. L'article complet (texte + images) est stocké dans `localStorage`

### Exemple technique

```javascript
// Une image de 500 Ko devient environ 680 Ko en base64
// Stockée comme ceci dans l'article :
{
  id: "1234567890",
  title: "Mon article",
  content: "...",
  images: [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
  ]
}
```

## Limites importantes

### 1. Taille maximale du localStorage

- **5 Mo par domaine** (limitation standard des navigateurs)
- Cela inclut TOUS les articles + images + profil utilisateur
- En pratique : environ 10-15 images de taille moyenne

### 2. Recommandations pour les images

Pour éviter de saturer le stockage :

| Type d'image | Taille recommandée | Résultat en base64 |
|--------------|-------------------|-------------------|
| Icône / logo | < 50 Ko | ~68 Ko |
| Photo compressée | < 500 Ko | ~680 Ko |
| Photo HD | 2-5 Mo | 2.7-6.8 Mo (trop gros) |

### 3. Conseils pratiques

- **Compressez vos images** avant de les téléverser (utilisez TinyPNG, Squoosh, etc.)
- **Redimensionnez** : 1200px de large suffisent pour un blog
- **Format JPEG** pour les photos, **PNG** pour les graphiques
- **Maximum 5 Mo par image** (limite imposée dans le code)

## Alternatives pour un stockage plus important

Si vous avez besoin de stocker plus d'images, voici les options :

### Option 1 : Service d'hébergement d'images (recommandé)

Utilisez un service externe et insérez les images par URL :

**Services gratuits :**
- **Imgur** : https://imgur.com/upload
- **Cloudinary** : https://cloudinary.com (plan gratuit généreux)
- **ImageKit** : https://imagekit.io (plan gratuit)
- **GitHub** : Uploadez dans un repo et utilisez les URLs raw

**Avantages :**
- Pas de limite de stockage dans votre blog
- Images optimisées automatiquement
- CDN mondial (chargement rapide)

**Comment faire :**
1. Uploadez votre image sur le service
2. Copiez l'URL directe de l'image
3. Dans l'éditeur, cliquez sur "Image (URL)"
4. Collez l'URL

### Option 2 : Dossier `public/images/`

Si vous hébergez le site vous-même :

1. Placez vos images dans `public/images/`
2. Référencez-les par chemin relatif : `/images/mon-image.jpg`
3. Utilisez le bouton "Image (URL)" avec le chemin

**Exemple :**
```
public/
└── images/
    ├── photo-1.jpg
    ├── schema-2.png
    └── capture-3.jpg
```

Dans l'éditeur : `/images/photo-1.jpg`

### Option 3 : Backend avec base de données

Pour un blog professionnel avec beaucoup de contenu :

- **Supabase** : stockage d'objets + base de données
- **Firebase** : stockage cloud + authentification
- **Netlify + Netlify CMS** : gestion de contenu visuelle
- **Strapi** : CMS headless auto-hébergé

Cela nécessiterait de modifier le code pour utiliser une API au lieu du localStorage.

## Vérifier l'espace utilisé

Vous pouvez voir combien d'espace est utilisé dans votre navigateur :

### Chrome / Edge
1. Ouvrez les DevTools (F12)
2. Onglet "Application"
3. Section "Storage" > "Local Storage"
4. Cliquez sur votre domaine
5. Vous verrez la taille de chaque clé

### Firefox
1. Ouvrez les DevTools (F12)
2. Onglet "Storage"
3. Section "Local Storage"

### Console JavaScript
```javascript
// Calculer la taille totale utilisée
let total = 0;
for (let key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    total += localStorage[key].length * 2; // UTF-16
  }
}
console.log(`Espace utilisé : ${(total / 1024 / 1024).toFixed(2)} Mo`);
```

## Bonnes pratiques pour ce blog

### Pour l'auteur (Erno Ngoy)

1. **Compressez systématiquement** vos images avant upload
2. **Privilégiez les URLs externes** pour les images lourdes
3. **Utilisez le format WebP** si possible (meilleure compression)
4. **Gardez une copie locale** de vos images (le localStorage peut être effacé)

### Pour les lecteurs

- Les images sont chargées directement depuis le localStorage
- Pas de requêtes réseau supplémentaires
- Chargement instantané une fois la page ouverte

## Sécurité et confidentialité

- Les images sont stockées **localement** dans le navigateur
- Elles ne sont **jamais envoyées** à un serveur tiers
- Si vous effacez les données du navigateur, les images sont perdues
- **Sauvegardez régulièrement** votre contenu important

## Résumé

| Aspect | Détail |
|--------|--------|
| **Stockage** | localStorage (base64) |
| **Limite** | ~5 Mo total |
| **Images max** | 5 Mo par image |
| **Recommandation** | Compresser ou utiliser URLs externes |
| **Persistance** | Locale au navigateur |
| **Sauvegarde** | Manuelle (export recommandé) |

---

**Note** : Pour un blog personnel avec peu d'images, le système actuel est suffisant. Pour un usage intensif, migrez vers un service d'hébergement d'images externe.
