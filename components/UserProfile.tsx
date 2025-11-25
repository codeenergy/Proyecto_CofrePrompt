import React, { useState } from 'react';
import { X, Heart, BookMarked, Users, Calendar, Edit2 } from 'lucide-react';
import { User, Prompt, Collection } from '../types';
import PromptCard from './PromptCard';

interface UserProfileProps {
  user: User;
  prompts: Prompt[];
  isOwnProfile: boolean;
  onClose: () => void;
  onEditProfile?: () => void;
  onFollowToggle?: () => void;
}

export default function UserProfile({
  user,
  prompts,
  isOwnProfile,
  onClose,
  onEditProfile,
  onFollowToggle
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'prompts' | 'favorites' | 'collections'>('prompts');

  const userPrompts = prompts.filter(p => p.author === user.displayName);
  const favoritePrompts = prompts.filter(p => user.favoritePrompts?.includes(p.id));
  const totalLikes = userPrompts.reduce((sum, p) => sum + p.likes, 0);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-700">
        {/* Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="px-6 pb-4">
            <div className="flex items-end gap-4 -mt-16">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=6366f1&color=fff&size=128`}
                alt={user.displayName || 'User'}
                className="w-32 h-32 rounded-full border-4 border-slate-900"
              />
              <div className="flex-1 pb-2">
                <h2 className="text-2xl font-bold text-white">{user.displayName}</h2>
                {user.bio && <p className="text-sm text-slate-400 mt-1">{user.bio}</p>}
              </div>
              {isOwnProfile ? (
                <button
                  onClick={onEditProfile}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar Perfil
                </button>
              ) : (
                <button
                  onClick={onFollowToggle}
                  className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors"
                >
                  Seguir
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-4 text-sm">
              <div>
                <span className="text-white font-bold">{userPrompts.length}</span>
                <span className="text-slate-400 ml-1">Prompts</span>
              </div>
              <div>
                <span className="text-white font-bold">{totalLikes}</span>
                <span className="text-slate-400 ml-1">Likes</span>
              </div>
              <div>
                <span className="text-white font-bold">{user.followers?.length || 0}</span>
                <span className="text-slate-400 ml-1">Seguidores</span>
              </div>
              <div>
                <span className="text-white font-bold">{user.following?.length || 0}</span>
                <span className="text-slate-400 ml-1">Siguiendo</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mt-6 border-b border-slate-700">
              <button
                onClick={() => setActiveTab('prompts')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'prompts'
                    ? 'text-indigo-400 border-b-2 border-indigo-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <BookMarked className="w-4 h-4 inline mr-2" />
                Prompts
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'favorites'
                    ? 'text-indigo-400 border-b-2 border-indigo-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <Heart className="w-4 h-4 inline mr-2" />
                Favoritos
              </button>
              <button
                onClick={() => setActiveTab('collections')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'collections'
                    ? 'text-indigo-400 border-b-2 border-indigo-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Colecciones
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'prompts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {userPrompts.length > 0 ? (
                userPrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} onOpen={() => {}} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-slate-400">
                  No hay prompts aún
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {favoritePrompts.length > 0 ? (
                favoritePrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} onOpen={() => {}} />
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
