# Système de Newsletter

## Fonctionnement

Votre blog inclut un système de newsletter complet :

### Pour les lecteurs
- Un formulaire d'inscription est disponible dans le footer du blog
- Les lecteurs peuvent s'inscrire avec leur email
- Ils reçoivent automatiquement un email à chaque nouvel article publié

### Pour vous (Erno Ngoy)
- Votre email (`ernongoy@gmail.com`) est automatiquement ajouté à la newsletter lors de votre première connexion
- Vous pouvez gérer les abonnés depuis l'onglet "Newsletter" dans votre dashboard
- Vous pouvez consulter l'historique des emails envoyés
- Vous pouvez désabonner des lecteurs si nécessaire

---

## Configuration EmailJS (pour envoi réel)

Par défaut, le système fonctionne en **mode simulation** : les emails sont enregistrés localement mais pas envoyés.

Pour activer l'envoi réel d'emails :

### Étape 1 : Créer un compte EmailJS

1. Allez sur https://www.emailjs.com/
2. Créez un compte gratuit (200 emails/mois inclus)
3. Connectez votre service email :
   - Gmail, Outlook, Yahoo, etc.
   - Suivez les instructions pour autoriser EmailJS

### Étape 2 : Créer un template

Dans EmailJS, créez un template avec ces variables :

```
Subject: Nouvel article : {{article_title}}

Bonjour {{to_name}},

Un nouvel article a été publié sur le blog d'Erno Ngoy :

{{article_title}}

{{article_excerpt}}

Lire l'article : {{article_url}}

---
Cordialement,
Erno Ngoy
```

### Étape 3 : Récupérer vos clés

Dans EmailJS, notez :
- **Service ID** (ex: `service_abc123`)
- **Template ID** (ex: `template_xyz789`)
- **Public Key** (dans Account > API Keys)

### Étape 4 : Configurer le blog

Ouvrez le fichier `src/services/newsletter.ts` et remplacez :

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',      // ← Remplacez
  templateId: 'YOUR_TEMPLATE_ID',    // ← Remplacez
  publicKey: 'YOUR_PUBLIC_KEY',      // ← Remplacez
};
```

Par :

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'service_abc123',
  templateId: 'template_xyz789',
  publicKey: 'your_public_key_here',
};
```

### Étape 5 : Redéployer

```bash
git add .
git commit -m "Configuration EmailJS"
git push
```

---

## Gestion de la newsletter

### Voir les abonnés

Dans votre dashboard auteur :
1. Cliquez sur **"Newsletter"** dans la navigation
2. Vous verrez la liste de tous les abonnés
3. Le nombre d'emails envoyés
4. L'historique complet des envois

### Désabonner un lecteur

1. Allez dans l'onglet **"Newsletter"**
2. Survolez l'email à désabonner
3. Cliquez sur **"Désabonner"**

### Effacer l'historique

1. Allez dans l'onglet **"Newsletter"**
2. Dans la section "Historique des envois"
3. Cliquez sur **"Effacer"**

---

## Fonctionnalités

### Inscription automatique
- Votre email est automatiquement ajouté à la newsletter lors de la première connexion
- Vous recevez donc vos propres notifications (utile pour tester)

### Envoi automatique
- À chaque publication d'article, un email est envoyé à tous les abonnés
- L'email contient : titre, extrait et lien vers l'article
- L'historique est sauvegardé localement

### Mode simulation
- Si EmailJS n'est pas configuré, le système fonctionne en mode simulation
- Les emails sont enregistrés dans `localStorage` mais pas envoyés
- Utile pour tester sans spammer vos abonnés

### Limites EmailJS (plan gratuit)
- 200 emails/mois
- 1 template
- 1 service email
- Suffisant pour un blog personnel

---

## Structure technique

### Fichiers concernés

- `src/services/newsletter.ts` : Service de gestion des abonnés et envoi d'emails
- `src/components/NewsletterSignup.tsx` : Formulaire d'inscription pour les lecteurs
- `src/components/NewsletterManager.tsx` : Interface de gestion pour l'auteur
- `src/components/Auth.tsx` : Ajoute automatiquement l'auteur à la newsletter
- `src/components/AuthorDashboard.tsx` : Envoie un email à chaque publication

### Stockage

- **Abonnés** : `localStorage` → `blog_subscribers`
- **Historique** : `localStorage` → `blog_email_history`
- **Configuration** : `src/services/newsletter.ts` (code source)

### Sécurité

- Les emails des abonnés sont stockés localement dans le navigateur
- Pas de serveur backend, pas de base de données externe
- EmailJS envoie les emails depuis le client (navigateur)
- Votre clé publique EmailJS est visible dans le code (normal, c'est une clé publique)

---

## Alternatives pour plus de fonctionnalités

Si vous avez besoin de plus de 200 emails/mois ou de fonctionnalités avancées :

### Mailchimp
- Gratuit jusqu'à 500 contacts
- Templates avancés
- Statistiques détaillées
- Nécessite une intégration API

### ConvertKit
- Gratuit jusqu'à 1 000 abonnés
- Automatisation puissante
- Idéal pour les créateurs de contenu

### Substack
- Newsletter + blog combinés
- Monétisation possible
- Très simple d'utilisation

### Ghost
- Open source
- Newsletter intégrée
- Auto-hébergeable

---

## Dépannage

### Les emails ne s'envoient pas

**Vérifiez :**
- EmailJS est bien configuré dans `newsletter.ts`
- Votre compte EmailJS est actif
- Le template contient les bonnes variables

**Solution :**
Consultez la console du navigateur (F12) pour voir les erreurs.

### Les abonnés ne s'inscrivent pas

**Cause :** Problème de localStorage

**Solution :**
Vérifiez que le navigateur autorise le localStorage (pas en mode navigation privée).

### Je veux exporter la liste des abonnés

**Solution :**
Ouvrez la console du navigateur (F12) et exécutez :

```javascript
console.log(JSON.stringify(JSON.parse(localStorage.getItem('blog_subscribers')), null, 2));
```

Copiez le résultat et sauvegardez-le dans un fichier.

---

## Résumé

✅ Inscription automatique de l'auteur à la newsletter  
✅ Formulaire d'inscription pour les lecteurs  
✅ Envoi automatique d'emails à chaque publication  
✅ Gestion des abonnés dans le dashboard  
✅ Historique des emails envoyés  
✅ Mode simulation pour tester  
✅ Configuration EmailJS pour envoi réel  

**Votre newsletter est prête à l'emploi !**
