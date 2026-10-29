import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

export default function ArticleCard({ article, onClick, onDelete, onEdit }: ArticleCardProps) {
  const categoryConfig = {
    recherche: { label: 'Recherche', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: '🔬' },
    decouverte: { label: 'Découverte', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30', icon: '💡' },
    article: { label: 'Article', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: '📝' },
  };

  const config = categoryConfig[article.category];
  const date = new Date(article.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
          <span>{config.icon}</span>
          {config.label}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
        {article.excerpt}
      </p>

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="px-2 py-0.5 bg-white/5 text-gray-400 text-xs rounded-full">
              #{tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-2 py-0.5 text-gray-500 text-xs">+{article.tags.length - 3}</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="text-gray-500 text-xs">{date}</span>
        <span className="text-purple-400 text-xs font-medium group-hover:text-purple-300 transition-colors">
          Lire la suite →
        </span>
      </div>
    </div>
  );
}
