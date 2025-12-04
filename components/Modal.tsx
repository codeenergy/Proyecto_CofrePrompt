import React, { useState } from 'react';
import { Prompt, User, Comment } from '../types';
import { X, Copy, Heart, Lock, Download, BookMarked, BarChart3 } from 'lucide-react';
import CommentsSection from './CommentsSection';
import TryItButtons from './TryItButtons';
import RelatedPrompts from './RelatedPrompts';
import StatsPanel from './StatsPanel';
import CollectionsModal from './CollectionsModal';

interface ModalProps {
  prompt: Prompt | null;
  user: User | null;
  onClose: () => void;
  onLoginRequest: () => void;
  allPrompts?: Prompt[];
  comments?: Comment[];
  onAddComment?: (comment: Omit<Comment, 'id' | 'createdAt' | 'likes'>) => void;
  onLikeComment?: (commentId: string) => void;
  onToggleFavorite?: (promptId: string) => void;
  onCopySuccess?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  prompt,
  user,
  onClose,
  onLoginRequest,
  allPrompts = [],
  comments = [],
  onAddComment = () => {},
  onLikeComment = () => {},
  onToggleFavorite = () => {},
  onCopySuccess = () => {}
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'comments' | 'stats'>('content');
  const [showCollections, setShowCollections] = useState(false);
  const [copyCount, setCopyCount] = useState(0);

  if (!prompt) return null;

  const handleAction = (action: () => void) => {
    if (!user) {
      onLoginRequest();
    } else {
      action();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopyCount(prev => prev + 1);
      onCopySuccess();
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([prompt.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${prompt.title.replace(/\s+/g, '_').toLowerCase()}_prompt.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const isFavorite = user?.favoritePrompts?.includes(prompt.id);
  const promptComments = comments.filter(c => c.promptId === prompt.id);

  // Mock stats data
  const stats = {
    promptId: prompt.id,
    totalViews: prompt.views,
    totalLikes: prompt.likes,
    totalComments: promptComments.length,
    totalCopies: copyCount + Math.floor(prompt.views * 0.3),
    averageRating: promptComments.length > 0
      ? promptComments.reduce((sum, c) => sum + c.rating, 0) / promptComments.length
      : 4.5,
    viewsByDay: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString(),
      count: Math.floor(Math.random() * 100) + 20
    })),
    topCountries: [
      { country: 'ES', count: 45 },
      { country: 'MX', count: 32 },
      { country: 'AR', count: 28 },
      { country: 'CO', count: 19 },
      { country: 'US', count: 15 }
    ]
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

        <div className="relative bg-slate-900 border border-slate-800 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">

          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-slate-800 bg-gradient-to-r from-indigo-600/5 to-purple-600/5">
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {prompt.category}
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  {prompt.platform}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white truncate mb-1">{prompt.title}</h2>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span>Por {prompt.author}</span>
                <span className="text-slate-600">•</span>
                <span>{prompt.createdAt}</span>
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all hover:rotate-90 duration-300">
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-4 pt-3 border-b border-slate-800">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'content'
                  ? 'text-indigo-400 border-b-2 border-indigo-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Contenido
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'comments'
                  ? 'text-indigo-400 border-b-2 border-indigo-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Comentarios
              {promptComments.length > 0 && (
                <span className="bg-slate-700 text-slate-300 text-xs px-1.5 py-0.5 rounded-full">
                  {promptComments.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'stats'
                  ? 'text-indigo-400 border-b-2 border-indigo-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Estadísticas
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'content' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {prompt.description}
                </p>

                <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 relative group hover:border-slate-700 transition-colors">
                  <span className="absolute top-3 right-3 text-[10px] text-slate-600 font-mono bg-slate-900 px-2 py-1 rounded">prompt.txt</span>

                  {user ? (
                    <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap leading-relaxed pt-2">
                      {prompt.content}
                    </pre>
                  ) : (
                    <div className="relative">
                      <pre className="font-mono text-sm text-emerald-400/20 whitespace-pre-wrap leading-relaxed blur-sm select-none">
                        {prompt.content}
                      </pre>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Lock className="text-slate-500 mb-2" size={20} />
                        <p className="text-slate-400 text-sm mb-2">Contenido bloqueado</p>
                        <button
                          onClick={onLoginRequest}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg transition-colors"
                        >
                          Iniciar sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {user && (
                  <TryItButtons
                    promptContent={prompt.content}
                    platform={prompt.platform}
                    onCopy={handleCopy}
                  />
                )}

                {allPrompts.length > 0 && (
                  <div className="pt-4 border-t border-slate-800">
                    <RelatedPrompts
                      currentPrompt={prompt}
                      allPrompts={allPrompts}
                      onSelectPrompt={() => {}}
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'comments' && (
              <CommentsSection
                promptId={prompt.id}
                comments={promptComments}
                user={user}
                onAddComment={onAddComment}
                onLikeComment={onLikeComment}
              />
            )}

            {activeTab === 'stats' && (
              <StatsPanel stats={stats} />
            )}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-slate-800 bg-slate-900/50 flex gap-2">
            <button
              onClick={() => handleAction(handleCopy)}
              className="flex-1 h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02]"
            >
              {user ? <Copy size={18} /> : <Lock size={16} />}
              {user ? "Copiar Prompt" : "Login para Copiar"}
            </button>
            <button
              onClick={() => handleAction(handleDownload)}
              className="h-11 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all flex items-center justify-center hover:scale-105"
              title="Descargar"
            >
              <Download size={18} />
            </button>
            <button
              onClick={() => handleAction(() => onToggleFavorite(prompt.id))}
              className={`h-11 px-4 rounded-lg transition-all flex items-center justify-center hover:scale-105 ${
                isFavorite
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 shadow-lg shadow-red-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
              title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Heart size={18} className={isFavorite ? 'fill-current animate-pulse' : ''} />
            </button>
            <button
              onClick={() => handleAction(() => setShowCollections(true))}
              className="h-11 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all flex items-center justify-center hover:scale-105"
              title="Guardar en colección"
            >
              <BookMarked size={18} />
            </button>
          </div>

        </div>
      </div>

      <CollectionsModal
        isOpen={showCollections}
        onClose={() => setShowCollections(false)}
        user={user}
        promptId={prompt.id}
        collections={user?.collections || []}
        onCreateCollection={() => {}}
        onAddToCollection={() => {}}
        onRemoveFromCollection={() => {}}
      />
    </>
  );
};

export default Modal;
