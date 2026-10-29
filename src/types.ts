export interface User {
  email: string;
  password: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'recherche' | 'decouverte' | 'article';
  content: string;
  excerpt: string;
  date: string;
  tags: string[];
  image?: string;
}

export type ViewMode = 'home' | 'write' | 'article' | 'recherches' | 'decouvertes' | 'articles';
