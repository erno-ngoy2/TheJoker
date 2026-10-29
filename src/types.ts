export interface User {
  email: string;
  password: string;
  name: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
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
}

export type ViewMode = 'home' | 'write' | 'article' | 'recherches' | 'decouvertes' | 'articles' | 'profile';
