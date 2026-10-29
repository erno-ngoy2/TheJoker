// Service de newsletter et envoi d'emails
// Utilise EmailJS pour envoyer des emails réels depuis le client

export interface Subscriber {
  email: string;
  subscribedAt: string;
  name?: string;
}

// Configuration EmailJS (à remplir avec vos propres clés)
// Obtenez vos clés sur https://www.emailjs.com/
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID', // Remplacez par votre Service ID EmailJS
  templateId: 'YOUR_TEMPLATE_ID', // Remplacez par votre Template ID EmailJS
  publicKey: 'YOUR_PUBLIC_KEY', // Remplacez par votre Public Key EmailJS
};

// Vérifie si EmailJS est configuré
export const isEmailConfigured = (): boolean => {
  return (
    EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' &&
    EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY'
  );
};

// Récupère tous les abonnés
export const getSubscribers = (): Subscriber[] => {
  const stored = localStorage.getItem('blog_subscribers');
  return stored ? JSON.parse(stored) : [];
};

// Ajoute un abonné
export const addSubscriber = (email: string, name?: string): boolean => {
  const subscribers = getSubscribers();
  
  // Vérifie si l'email existe déjà
  if (subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase())) {
    return false;
  }

  const newSubscriber: Subscriber = {
    email,
    name,
    subscribedAt: new Date().toISOString(),
  };

  subscribers.push(newSubscriber);
  localStorage.setItem('blog_subscribers', JSON.stringify(subscribers));
  return true;
};

// Supprime un abonné
export const removeSubscriber = (email: string): void => {
  const subscribers = getSubscribers();
  const filtered = subscribers.filter(sub => sub.email.toLowerCase() !== email.toLowerCase());
  localStorage.setItem('blog_subscribers', JSON.stringify(filtered));
};

// Envoie un email de notification pour un nouvel article
export const sendNewArticleNotification = async (
  articleTitle: string,
  articleExcerpt: string,
  articleUrl: string
): Promise<{ success: boolean; message: string }> => {
  const subscribers = getSubscribers();
  
  if (subscribers.length === 0) {
    return {
      success: false,
      message: 'Aucun abonné dans la newsletter',
    };
  }

  // Si EmailJS n'est pas configuré, simule l'envoi
  if (!isEmailConfigured()) {
    console.log('📧 Simulation d\'envoi d\'email aux abonnés:');
    console.log('Titre:', articleTitle);
    console.log('Extrait:', articleExcerpt);
    console.log('URL:', articleUrl);
    console.log('Nombre d\'abonnés:', subscribers.length);
    
    // Sauvegarde l'historique des emails envoyés
    const emailHistory = JSON.parse(localStorage.getItem('blog_email_history') || '[]');
    emailHistory.push({
      articleTitle,
      articleExcerpt,
      articleUrl,
      sentAt: new Date().toISOString(),
      recipientCount: subscribers.length,
      recipients: subscribers.map(s => s.email),
    });
    localStorage.setItem('blog_email_history', JSON.stringify(emailHistory));

    return {
      success: true,
      message: `Email envoyé à ${subscribers.length} abonné(s) (mode simulation)`,
    };
  }

  // Envoi réel via EmailJS
  try {
    // EmailJS ne permet pas d'envoyer à plusieurs destinataires en une fois
    // Il faut envoyer un email par abonné
    const emailjs = (await import('@emailjs/browser')).default;
    
    let successCount = 0;
    let errorCount = 0;

    for (const subscriber of subscribers) {
      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            to_email: subscriber.email,
            to_name: subscriber.name || 'Lecteur',
            article_title: articleTitle,
            article_excerpt: articleExcerpt,
            article_url: articleUrl,
            from_name: 'Erno Ngoy',
          },
          EMAILJS_CONFIG.publicKey
        );
        successCount++;
      } catch (error) {
        console.error(`Erreur d'envoi à ${subscriber.email}:`, error);
        errorCount++;
      }
    }

    // Sauvegarde l'historique
    const emailHistory = JSON.parse(localStorage.getItem('blog_email_history') || '[]');
    emailHistory.push({
      articleTitle,
      articleExcerpt,
      articleUrl,
      sentAt: new Date().toISOString(),
      recipientCount: successCount,
      errorCount,
      recipients: subscribers.map(s => s.email),
    });
    localStorage.setItem('blog_email_history', JSON.stringify(emailHistory));

    return {
      success: true,
      message: `Email envoyé à ${successCount} abonné(s)${errorCount > 0 ? ` (${errorCount} erreur(s))` : ''}`,
    };
  } catch (error) {
    console.error('Erreur d\'envoi EmailJS:', error);
    return {
      success: false,
      message: 'Erreur lors de l\'envoi des emails',
    };
  }
};

// Récupère l'historique des emails envoyés
export const getEmailHistory = (): any[] => {
  const stored = localStorage.getItem('blog_email_history');
  return stored ? JSON.parse(stored) : [];
};

// Efface l'historique des emails
export const clearEmailHistory = (): void => {
  localStorage.removeItem('blog_email_history');
};
