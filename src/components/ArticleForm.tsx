import { useState, useRef } from 'react';
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
  const [images, setImages] = useState<string[]>(editArticle?.images || []);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        setError('L\'image ne doit pas dépasser 5 Mo');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImages(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const insertLink = () => {
    if (!linkUrl) return;
    const text = linkText || linkUrl;
    const linkMarkdown = `[${text}](${linkUrl})`;
    const textarea = document.getElementById('article-content') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + linkMarkdown + content.substring(end);
      setContent(newContent);
    } else {
      setContent(prev => prev + '\n' + linkMarkdown);
    }
    setShowLinkDialog(false);
    setLinkText('');
    setLinkUrl('');
  };

  const insertImageLink = () => {
    if (!imageUrl) return;
    const alt = imageAlt || 'image';
    const imageMarkdown = `![${alt}](${imageUrl})`;
    const textarea = document.getElementById('article-content') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + imageMarkdown + content.substring(end);
      setContent(newContent);
    } else {
      setContent(prev => prev + '\n' + imageMarkdown);
    }
    setShowImageDialog(false);
    setImageUrl('');
    setImageAlt('');
  };

  const insertUploadedImage = (imgSrc: string) => {
    const imageMarkdown = `![image](${imgSrc})`;
    setContent(prev => prev + '\n' + imageMarkdown);
  };

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
      images: images,
    };

    onSave(article);
    setSuccess(true);
    setTimeout(() => {
      if (!editArticle) {
        setTitle('');
        setContent('');
        setExcerpt('');
        setTags('');
        setImages([]);
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
          {editArticle ? '✏️ Modifier l\'article' : '✍️ Nouvel article'}
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

        {/* Content with toolbar */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Contenu</label>
          
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 mb-2 p-2 bg-white/5 border border-white/10 rounded-t-xl">
            <button
              type="button"
              onClick={() => setShowLinkDialog(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-all text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Lien
            </button>
            <button
              type="button"
              onClick={() => setShowImageDialog(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 transition-all text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Image URL
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="ml-auto text-xs text-gray-500">
              Syntaxe: [texte](url) • ![alt](url)
            </div>
          </div>

          <textarea
            id="article-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Écrivez votre article ici...\n\nUtilisez la syntaxe suivante :\n- [Texte du lien](https://exemple.com) pour insérer un lien\n- ![Description](url-image) pour insérer une image\n- Ou utilisez les boutons ci-dessus`}
            rows={14}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-b-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-y font-mono text-sm leading-relaxed"
          />
        </div>

        {/* Images Gallery */}
        {images.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Images jointes ({images.length})</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative group rounded-xl overflow-hidden border border-white/10">
                  <img src={img} alt={`Image ${index + 1}`} className="w-full h-24 object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => insertUploadedImage(img)}
                      className="p-1.5 bg-purple-500 rounded-lg text-white hover:bg-purple-600 transition-colors"
                      title="Insérer dans l'article"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-1.5 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

        {/* Link Dialog */}
        {showLinkDialog && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold text-white mb-4">🔗 Insérer un lien</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Texte du lien (optionnel)</label>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Cliquez ici"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">URL</label>
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://exemple.com"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={insertLink}
                  className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Insérer
                </button>
                <button
                  type="button"
                  onClick={() => { setShowLinkDialog(false); setLinkText(''); setLinkUrl(''); }}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:text-white transition-all"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image URL Dialog */}
        {showImageDialog && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-bold text-white mb-4">🖼️ Insérer une image</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Description (alt text)</label>
                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeholder="Description de l'image"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">URL de l'image</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://exemple.com/image.jpg"
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                {imageUrl && (
                  <div className="rounded-lg overflow-hidden border border-white/10">
                    <img src={imageUrl} alt={imageAlt || 'preview'} className="w-full h-32 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={insertImageLink}
                  className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Insérer
                </button>
                <button
                  type="button"
                  onClick={() => { setShowImageDialog(false); setImageUrl(''); setImageAlt(''); }}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:text-white transition-all"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

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
