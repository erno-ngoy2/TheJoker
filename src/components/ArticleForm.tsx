import { useState } from 'react';
import { Article } from '../types';

interface ArticleFormProps {
  onSave: (article: Article) => void;
  editArticle?: Article | null;
  onCancel?: () => void;
}

export default function ArticleForm({ onSave, editArticle, onCancel }: ArticleFormProps) {
  const [title, setTitle] = useState(editArticle?.title || '');
  const [category, setCategory] = useState<'recherche' | 'decouverte' | 'article'>(editArticle?.category || 'article');
  const [content, setContent] = useState(editArticle?.content || '');
  const [excerpt, setExcerpt] = useState(editArticle?.excerpt || '');
  const [tags, setTags] = useState(editArticle?.tags.join(', ') || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Le titre est obligatoire');
      return;
    }
    if (!content.trim()) {
      setError('Le contenu est obligatoire');
      return;
    }

    const article: Article = {
      id: editArticle?.id || Date.now().toString(),
      title: title.trim(),
      category,
      content: content.trim(),
      excerpt: excerpt.trim() || content.trim().substring(0, 150) + '...',
      date: editArticle?.date || new Date().toISOString(),
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
    };

    onSave(article);
    setSuccess(true);
    setTimeout(() => {
      if (!editArticle) {
        setTitle('');
        setContent('');
        setExcerpt('');
        setTags('');
        setCategory('article');
      }
      setSuccess(false);
    }, 2000);
  };

  const categoryColors = {
    recherche: 'from-blue-500 to-cyan-500',
    decouverte: 'from-amber-500 to-orange-500',
    article: 'from-purple-500 to-pink-500',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          {editArticle ? 'Modifier l\'article' : '✍️ Nouvel article'}
        </h2>
        <p className="text-gray-400">Partagez vos recherches, découvertes et réflexions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de votre article..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Catégorie</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['recherche', 'decouverte', 'article'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-3 rounded-xl border transition-all duration-200 ${
                  category === cat
                    ? `bg-gradient-to-r ${categoryColors[cat]} text-white border-transparent shadow-lg`
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                <span className="text-lg mr-2">
                  {cat === 'recherche' ? '🔬' : cat === 'decouverte' ? '💡' : '📝'}
                </span>
                {cat === 'recherche' ? 'Recherche' : cat === 'decouverte' ? 'Découverte' : 'Article'}
              </button>
            ))}
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Résumé (optionnel)</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Un court résumé de votre article..."
            rows={2}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Contenu</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Écrivez votre article ici... Vous pouvez utiliser du texte libre."
            rows={12}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-y font-mono text-sm leading-relaxed"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Tags (séparés par des virgules)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="science, technologie, innovation..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          {tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.split(',').filter(t => t.trim()).map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Article enregistré avec succès !
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02]"
          >
            {editArticle ? 'Mettre à jour' : 'Publier l\'article'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:text-white hover:border-white/20 transition-all"
            >
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
