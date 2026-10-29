import { Article } from '../types';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ArticleView({ article, onBack, onEdit, onDelete }: ArticleViewProps) {
  const categoryConfig = {
    recherche: { label: 'Recherche', color: 'from-blue-500 to-cyan-500', icon: '🔬' },
    decouverte: { label: 'Découverte', color: 'from-amber-500 to-orange-500', icon: '💡' },
    article: { label: 'Article', color: 'from-purple-500 to-pink-500', icon: '📝' },
  };

  const config = categoryConfig[article.category];
  const date = new Date(article.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const paragraphs = article.content.split('\n').filter(p => p.trim());

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour
      </button>

      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${config.color} text-white`}>
            <span>{config.icon}</span>
            {config.label}
          </span>
          <span className="text-gray-500 text-sm">{date}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        {(onEdit || onDelete) && (
          <div className="flex gap-2 mb-8">
            {onEdit && (
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Modifier
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:text-red-300 hover:border-red-500/30 transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Supprimer
              </button>
            )}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-8"></div>

      {/* Article Content */}
      <article className="prose prose-invert max-w-none">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-gray-300 leading-relaxed mb-4 text-lg">
            {paragraph}
          </p>
        ))}
      </article>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">Publié le {date}</span>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            Retour aux articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
