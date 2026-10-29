import { useState } from 'react';
import { User, ViewMode } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onLogout: () => void;
}

export default function Sidebar({ isOpen, onClose, user, currentView, onNavigate, onLogout }: SidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('categories');

  const menuItems = [
    { id: 'home' as ViewMode, label: 'Accueil', icon: '🏠' },
    { id: 'write' as ViewMode, label: 'Écrire un article', icon: '✍️' },
  ];

  const categories = [
    { id: 'recherches' as ViewMode, label: 'Recherches', icon: '🔬', count: getArticleCount('recherche') },
    { id: 'decouvertes' as ViewMode, label: 'Découvertes', icon: '💡', count: getArticleCount('decouverte') },
    { id: 'articles' as ViewMode, label: 'Articles', icon: '📝', count: getArticleCount('article') },
  ];

  function getArticleCount(category: string): number {
    const articles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
    return articles.filter((a: any) => a.category === category).length;
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* User Profile */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{user.name}</p>
              <p className="text-gray-400 text-xs truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-200px)]">
          {/* Main Items */}
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); onClose(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          {/* Expandable Categories */}
          <div className="pt-4">
            <button
              onClick={() => setExpandedSection(expandedSection === 'categories' ? null : 'categories')}
              className="w-full flex items-center justify-between px-4 py-2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <span className="text-xs font-semibold uppercase tracking-wider">Catégories</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${expandedSection === 'categories' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                expandedSection === 'categories' ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-1 pt-2">
                {categories.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onNavigate(item.id); onClose(); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Expandable Info */}
          <div className="pt-4">
            <button
              onClick={() => setExpandedSection(expandedSection === 'info' ? null : 'info')}
              className="w-full flex items-center justify-between px-4 py-2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <span className="text-xs font-semibold uppercase tracking-wider">Informations</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${expandedSection === 'info' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                expandedSection === 'info' ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 py-3 space-y-2">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>{JSON.parse(localStorage.getItem('blog_articles') || '[]').length} articles</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Dernière mise à jour: aujourd'hui</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
}
