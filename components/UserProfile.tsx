import { useState } from 'react';
import { X, Heart, BookMarked, Users, Edit2, Trash2, Eye, FolderPlus } from 'lucide-react';
import { User, Prompt } from '../types';
import PromptCard from './PromptCard';

interface UserProfileProps {
  user: User;
  prompts: Prompt[];
  isOwnProfile: boolean;
  onClose: () => void;
  onEditProfile?: () => void;
  onFollowToggle?: () => void;
  onOpenPrompt?: (prompt: Prompt) => void;
  onEditPrompt?: (prompt: Prompt) => void;
  onDeletePrompt?: (promptId: string) => void;
  onOpenCollections?: () => void;
}

export default function UserProfile({
  user,
  prompts,
  isOwnProfile,
  onClose,
  onEditProfile,
  onFollowToggle,
  onOpenPrompt,
  onEditPrompt,
  onDeletePrompt,
  onOpenCollections
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'prompts' | 'favorites' | 'collections'>('prompts');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const userPrompts = prompts.filter(p => p.authorId === user.uid);
  const favoritePrompts = prompts.filter(p => user.favoritePrompts?.includes(p.id));
  const totalLikes = userPrompts.reduce((sum, p) => sum + p.likes, 0);
  const totalViews = userPrompts.reduce((sum, p) => sum + p.views, 0);

  const handleDeleteConfirm = (promptId: string) => {
    if (onDeletePrompt) {
      onDeletePrompt(promptId);
      setConfirmDelete(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border-2 border-transparent shadow-2xl animate-slideUp"
           style={{
             backgroundImage: 'linear-gradient(135deg, rgba(255, 109, 0, 0.05) 0%, rgba(14, 77, 164, 0.05) 100%)',
             boxShadow: '0 0 60px rgba(255, 109, 0, 0.2), 0 0 100px rgba(14, 77, 164, 0.2), inset 0 0 80px rgba(139, 92, 246, 0.05)',
             borderImage: 'linear-gradient(135deg, rgba(255, 109, 0, 0.4), rgba(14, 77, 164, 0.4)) 1'
           }}>
        {/* Header Glassmorphism */}
        <div className="relative overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-orange-600 via-blue-600 to-purple-600 relative">
            {/* Efecto de ondas animadas */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-blob"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl transition-all hover:scale-110 border border-white/20 shadow-lg"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="px-6 pb-4">
            <div className="flex items-end gap-4 -mt-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=FF6D00&color=fff&size=160`}
                  alt={user.displayName || 'User'}
                  className="relative w-36 h-36 rounded-full border-4 border-white shadow-2xl group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex-1 pb-2">
                <h2 className="text-3xl font-black text-white drop-shadow-lg">{user.displayName}</h2>
                {user.bio && <p className="text-sm text-slate-300 mt-2 font-medium">{user.bio}</p>}
                {!user.bio && <p className="text-sm text-slate-400 mt-2 font-medium italic">Sin biografía</p>}
              </div>
              {isOwnProfile ? (
                <button
                  onClick={onEditProfile}
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all flex items-center gap-2 font-bold shadow-lg hover:shadow-orange-500/50 hover:scale-105"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar Perfil
                </button>
              ) : (
                <button
                  onClick={onFollowToggle}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                >
                  Seguir
                </button>
              )}
            </div>

            {/* Stats Modernos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-6">
              <div className="group relative bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm border border-orange-500/40 rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative text-center">
                  <div className="text-2xl font-black text-orange-400 drop-shadow-lg">{userPrompts.length}</div>
                  <div className="text-xs text-orange-300 font-semibold mt-0.5">Prompts</div>
                </div>
              </div>
              <div className="group relative bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-sm border border-pink-500/40 rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative text-center">
                  <div className="text-2xl font-black text-pink-400 drop-shadow-lg">{totalLikes}</div>
                  <div className="text-xs text-pink-300 font-semibold mt-0.5">Likes</div>
                </div>
              </div>
              <div className="group relative bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/40 rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative text-center">
                  <div className="text-2xl font-black text-purple-400 drop-shadow-lg">{totalViews}</div>
                  <div className="text-xs text-purple-300 font-semibold mt-0.5">Vistas</div>
                </div>
              </div>
              <div className="group relative bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/40 rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative text-center">
                  <div className="text-2xl font-black text-blue-400 drop-shadow-lg">{user.followers?.length || 0}</div>
                  <div className="text-xs text-blue-300 font-semibold mt-0.5">Seguidores</div>
                </div>
              </div>
              <div className="group relative bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-sm border border-cyan-500/40 rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative text-center">
                  <div className="text-2xl font-black text-cyan-400 drop-shadow-lg">{user.following?.length || 0}</div>
                  <div className="text-xs text-cyan-300 font-semibold mt-0.5">Siguiendo</div>
                </div>
              </div>
            </div>

            {/* Tabs Glassmorphism */}
            <div className="flex gap-2 mt-6 p-1 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
              <button
                onClick={() => setActiveTab('prompts')}
                className={`flex-1 px-4 py-2.5 text-sm font-bold transition-all rounded-lg flex items-center justify-center gap-2 ${
                  activeTab === 'prompts'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <BookMarked className="w-4 h-4" />
                Prompts
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`flex-1 px-4 py-2.5 text-sm font-bold transition-all rounded-lg flex items-center justify-center gap-2 ${
                  activeTab === 'favorites'
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Heart className="w-4 h-4" />
                Favoritos
              </button>
              <button
                onClick={() => setActiveTab('collections')}
                className={`flex-1 px-4 py-2.5 text-sm font-bold transition-all rounded-lg flex items-center justify-center gap-2 ${
                  activeTab === 'collections'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Users className="w-4 h-4" />
                Colecciones
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'prompts' && (
            <div className="space-y-3">
              {userPrompts.length > 0 ? (
                userPrompts.map((prompt) => (
                  <div key={prompt.id} className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border-2 border-slate-700/50 rounded-xl p-5 hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-start justify-between">
                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onOpenPrompt?.(prompt)}>
                        <h3 className="font-bold text-white truncate group-hover:text-orange-300 transition-colors">{prompt.title}</h3>
                        <p className="text-sm text-slate-400 mt-1 line-clamp-2 group-hover:text-slate-300 transition-colors">{prompt.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {prompt.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {prompt.views}
                          </span>
                          <span>•</span>
                          <span>{new Date(prompt.createdAt).toLocaleDateString()}</span>
                          {prompt.updatedAt && (
                            <>
                              <span>•</span>
                              <span>Editado {new Date(prompt.updatedAt).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {isOwnProfile && (
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => onEditPrompt?.(prompt)}
                            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Editar prompt"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          {confirmDelete === prompt.id ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDeleteConfirm(prompt.id)}
                                className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                              >
                                Confirmar
                              </button>
                              <button
                                onClick={() => setConfirmDelete(null)}
                                className="px-3 py-1 text-xs bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDelete(prompt.id)}
                              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                              title="Eliminar prompt"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400">
                  {isOwnProfile ? 'No has creado prompts aún' : 'No hay prompts aún'}
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {favoritePrompts.length > 0 ? (
                favoritePrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onOpen={onOpenPrompt ? () => onOpenPrompt(prompt) : () => {}}
                    onCopy={() => {}}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-slate-400">
                  No hay favoritos aún
                </div>
              )}
            </div>
          )}

          {activeTab === 'collections' && (
            <div className="space-y-3">
              {isOwnProfile && (
                <button
                  onClick={onOpenCollections}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border border-blue-500/50 rounded-xl transition-all text-white font-bold shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                >
                  <FolderPlus className="w-5 h-5" />
                  Nueva Colección
                </button>
              )}

              {user.collections && user.collections.length > 0 ? (
                user.collections.map((collection) => (
                  <div
                    key={collection.id}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-indigo-500/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-white">{collection.name}</h3>
                        <p className="text-sm text-slate-400 mt-1">{collection.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                          <span>{collection.promptIds.length} prompts</span>
                          <span>•</span>
                          <span>{collection.isPublic ? 'Pública' : 'Privada'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400">
                  No hay colecciones aún
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
