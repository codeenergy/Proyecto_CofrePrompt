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
        <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />

        <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-orange-500/30 w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300" style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 100px rgba(255, 109, 0, 0.3), 0 0 150px rgba(14, 77, 164, 0.2)'
        }}>

          {/* Header con glassmorphism */}
          <div className="relative flex items-start justify-between p-6 border-b-2 border-orange-500/20 bg-gradient-to-r from-orange-600/10 via-blue-600/10 to-purple-600/10 backdrop-blur-xl">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-blue-600/5 to-purple-600/5 animate-gradient-shift pointer-events-none" />

            <div className="relative flex-1 min-w-0 pr-4 z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500/30 to-orange-600/30 text-orange-300 border border-orange-500/50 backdrop-blur-sm shadow-lg shadow-orange-500/20">
                  {prompt.category}
                </span>
                <span className="text-xs font-black px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-500/30 to-blue-600/30 text-blue-300 border border-blue-500/50 backdrop-blur-sm shadow-lg shadow-blue-500/20">
                  {prompt.platform}
                </span>
              </div>
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-blue-400 truncate mb-2 drop-shadow-lg">{prompt.title}</h2>
              <p className="text-sm text-slate-300 flex items-center gap-2">
                <span className="font-semibold">Por {prompt.author}</span>
                <span className="text-slate-600">•</span>
                <span>{prompt.createdAt}</span>
              </p>
            </div>
            <button onClick={onClose} className="relative z-10 p-2.5 text-slate-400 hover:text-orange-400 bg-slate-800/60 hover:bg-orange-500/20 rounded-xl transition-all hover:rotate-90 hover:scale-110 duration-300 border border-slate-700/50 backdrop-blur-sm">
              <X size={22} />
            </button>
          </div>

          <style>{`
            @keyframes gradient-shift {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            .animate-gradient-shift {
              background-size: 200% 200%;
              animation: gradient-shift 6s ease infinite;
            }
          `}</style>

          {/* Tabs modernos */}
          <div className="flex gap-2 px-5 pt-4 border-b-2 border-slate-800/50">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-5 py-3 text-sm font-bold transition-all duration-300 rounded-t-xl relative overflow-hidden group ${
                activeTab === 'content'
                  ? 'text-white bg-gradient-to-b from-orange-500/20 to-transparent border-b-2 border-orange-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {activeTab === 'content' && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 blur-xl" />
              )}
              <span className="relative z-10">Contenido</span>
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-5 py-3 text-sm font-bold transition-all duration-300 rounded-t-xl flex items-center gap-2 relative overflow-hidden ${
                activeTab === 'comments'
                  ? 'text-white bg-gradient-to-b from-blue-500/20 to-transparent border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {activeTab === 'comments' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl" />
              )}
              <span className="relative z-10">Comentarios</span>
              {promptComments.length > 0 && (
                <span className="relative z-10 bg-orange-500/30 text-orange-300 text-xs px-2 py-0.5 rounded-full font-black border border-orange-500/50">
                  {promptComments.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-5 py-3 text-sm font-bold transition-all duration-300 rounded-t-xl flex items-center gap-2 relative overflow-hidden ${
                activeTab === 'stats'
                  ? 'text-white bg-gradient-to-b from-purple-500/20 to-transparent border-b-2 border-purple-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {activeTab === 'stats' && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl" />
              )}
              <BarChart3 className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Estadísticas</span>
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

          {/* Footer moderno */}
          <div className="p-5 border-t-2 border-orange-500/20 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl flex gap-2">
            <button
              onClick={() => handleAction(handleCopy)}
              className="relative flex-1 h-12 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-400 hover:to-orange-500 text-white text-sm font-black rounded-xl transition-all flex items-center justify-center gap-2 overflow-hidden group hover:scale-[1.02] shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {user ? <Copy size={18} className="relative z-10" /> : <Lock size={18} className="relative z-10" />}
              <span className="relative z-10">{user ? "Copiar Prompt" : "Login para Copiar"}</span>
            </button>
            <button
              onClick={() => handleAction(handleDownload)}
              className="h-12 px-4 bg-slate-800/60 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 rounded-xl transition-all flex items-center justify-center hover:scale-110 border border-slate-700/50 hover:border-blue-500/50 backdrop-blur-sm"
              title="Descargar"
            >
              <Download size={18} />
            </button>
            <button
              onClick={() => handleAction(() => onToggleFavorite(prompt.id))}
              className={`h-12 px-4 rounded-xl transition-all flex items-center justify-center hover:scale-110 border backdrop-blur-sm ${
                isFavorite
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 shadow-xl shadow-red-500/30 border-red-500/50'
                  : 'bg-slate-800/60 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border-slate-700/50 hover:border-red-500/50'
              }`}
              title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Heart size={18} className={isFavorite ? 'fill-current animate-pulse' : ''} />
            </button>
            <button
              onClick={() => handleAction(() => setShowCollections(true))}
              className="h-12 px-4 bg-slate-800/60 hover:bg-purple-500/20 text-slate-300 hover:text-purple-400 rounded-xl transition-all flex items-center justify-center hover:scale-110 border border-slate-700/50 hover:border-purple-500/50 backdrop-blur-sm"
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
