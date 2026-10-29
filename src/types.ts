export interface Author {
  email: string;
  password: string;
  name: string;
  bio?: string;
  location?: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'recherche' | 'decouverte' | 'article';
  content: string;
  excerpt: string;
  date: string;
  tags: string[];
  images?: string[];
  featured?: boolean;
}

export type ViewMode =
  | 'home'
  | 'write'
  | 'article'
  | 'recherches'
  | 'decouvertes'
  | 'articles'
  | 'profile';

// Constante : seul cet email peut publier
export const AUTHOR_EMAIL = 'ernongoy@gmail.com';
