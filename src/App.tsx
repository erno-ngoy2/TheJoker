import { useState, useEffect } from 'react';
import { User, Article, ViewMode } from './types';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import ArticleForm from './components/ArticleForm';
import ArticleCard from './components/ArticleCard';
import ArticleView from './components/ArticleView';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('blog_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    loadArticles();
  }, []);

  const loadArticles = () => {
    const stored = localStorage.getItem('blog_articles');
    if (stored) {
      setArticles(JSON.parse(stored));
    }
  };

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('blog_current_user');
    setUser(null);
    setCurrentView('home');
    setSelectedArticle(null);
  };

  const handleSaveArticle = (article: Article) => {
    let updatedArticles: Article[];
    const existingIndex = articles.findIndex(a => a.id === article.id);
    
    if (existingIndex >= 0) {
      updatedArticles = [...articles];
      updatedArticles[existingIndex] = article;
    } else {
      updatedArticles = [article, ...articles];
    }
    
    setArticles(updatedArticles);
    localStorage.setItem('blog_articles', JSON.stringify(updatedArticles));
    setEditingArticle(null);
    setCurrentView('home');
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      const updatedArticles = articles.filter(a => a.id !== id);
      setArticles(updatedArticles);
      localStorage.setItem('blog_articles', JSON.stringify(updatedArticles));
      setSelectedArticle(null);
      setCurrentView('home');
    }
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    setSelectedArticle(null);
    setEditingArticle(null);
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article');
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (currentView === 'recherches') return matchesSearch && article.category === 'recherche';
    if (currentView === 'decouvertes') return matchesSearch && article.category === 'decouverte';
    if (currentView === 'articles') return matchesSearch && article.category === 'article';
    
    return matchesSearch;
  });

  // If not logged in, show auth
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    // Article View
    if (currentView === 'article' && selectedArticle) {
      return (
        <ArticleView
          article={selectedArticle}
          onBack={() => handleNavigate('home')}
          onEdit={() => { setEditingArticle(selectedArticle); setCurrentView('write'); }}
          onDelete={() => handleDeleteArticle(selectedArticle.id)}
        />
      );
    }

    // Write/Edit Article
    if (currentView === 'write') {
      return (
        <ArticleForm
          onSave={handleSaveArticle}
          editArticle={editingArticle}
          onCancel={() => { setEditingArticle(null); setCurrentView('home'); }}
        />
      );
    }

    // Home / Category views
    const viewTitles: Record<string, { title: string; subtitle: string; icon: string }> = {
      home: { title: 'Accueil', subtitle: 'Bienvenue sur votre blog personnel', icon: '🏠' },
      recherches: { title: 'Recherches', subtitle: 'Vos travaux de recherche', icon: '🔬' },
      decouvertes: { title: 'Découvertes', subtitle: 'Vos trouvailles et insights', icon: '💡' },
      articles: { title: 'Articles', subtitle: 'Tous vos articles publiés', icon: '📝' },
    };

    const viewConfig = viewTitles[currentView] || viewTitles.home;

    return (
      <div>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{viewConfig.icon}</span>
            <h2 className="text-3xl font-bold text-white">{viewConfig.title}</h2>
          </div>
          <p className="text-gray-400">{viewConfig.subtitle}</p>
        </div>

        {/* Stats Cards (only on home) */}
        {currentView === 'home' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Recherches</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {articles.filter(a => a.category === 'recherche').length}
                  </p>
                </div>
                <span className="text-3xl">🔬</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-300 text-sm font-medium">Découvertes</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {articles.filter(a => a.category === 'decouverte').length}
                  </p>
                </div>
                <span className="text-3xl">💡</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Articles</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {articles.filter(a => a.category === 'article').length}
                  </p>
                </div>
                <span className="text-3xl">📝</span>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Write button */}
        <div className="mb-6">
          <button
            onClick={() => handleNavigate('write')}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouvel article
          </button>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => handleArticleClick(article)}
                onEdit={() => { setEditingArticle(article); setCurrentView('write'); }}
                onDelete={() => handleDeleteArticle(article.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">
              {searchQuery ? '🔍' : '📄'}
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              {searchQuery ? 'Aucun résultat trouvé' : 'Aucun article'}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchQuery ? 'Essayez avec d\'autres mots-clés' : 'Commencez par écrire votre premier article'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => handleNavigate('write')}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/30"
              >
                Écrire mon premier article
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        currentView={currentView}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-white font-semibold">Mon Blog</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavigate('write')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Écrire
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block text-sm text-gray-300">{user.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="px-4 md:px-8 py-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
