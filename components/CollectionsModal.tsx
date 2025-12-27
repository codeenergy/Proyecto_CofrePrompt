import React, { useState } from 'react';
import { X, Plus, FolderPlus, Lock, Globe, Trash2 } from 'lucide-react';
import { Collection, User, Prompt } from '../types';

interface CollectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  promptId?: string;
  collections: Collection[];
  onCreateCollection: (name: string, description: string, isPublic: boolean) => void;
  onAddToCollection: (collectionId: string, promptId: string) => void;
  onRemoveFromCollection: (collectionId: string, promptId: string) => void;
}

export default function CollectionsModal({
  isOpen,
  onClose,
  user,
  promptId,
  collections,
  onCreateCollection,
  onAddToCollection,
  onRemoveFromCollection
}: CollectionsModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  if (!isOpen || !user) return null;

  const userCollections = collections.filter(c => c.userId === user.uid);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await onCreateCollection(newName.trim(), newDescription.trim(), isPublic);
    setNewName('');
    setNewDescription('');
    setIsCreating(false);
    // Cerrar modal automáticamente después de crear
    if (!promptId) {
      onClose();
    }
  };

  const handleTogglePrompt = (collectionId: string) => {
    if (!promptId) return;
    const collection = userCollections.find(c => c.id === collectionId);
    if (!collection) return;

    if (collection.promptIds.includes(promptId)) {
      onRemoveFromCollection(collectionId, promptId);
    } else {
      onAddToCollection(collectionId, promptId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-xl max-w-md w-full border border-slate-700 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">
            {promptId ? 'Guardar en Colección' : 'Mis Colecciones'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isCreating ? (
            <div className="space-y-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nombre de la colección"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Descripción (opcional)"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={2}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPublic(!isPublic)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isPublic
                      ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      : 'bg-slate-700 text-slate-400 border border-slate-600'
                  }`}
                >
                  {isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                  {isPublic ? 'Pública' : 'Privada'}
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCreate}
                  className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Crear
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setNewName('');
                    setNewDescription('');
                  }}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 rounded-lg transition-colors text-sm font-medium text-white"
            >
              <FolderPlus className="w-4 h-4" />
              Nueva Colección
            </button>
          )}

          {userCollections.length > 0 ? (
            userCollections.map((collection) => {
              const isInCollection = promptId ? collection.promptIds.includes(promptId) : false;
              return (
                <div
                  key={collection.id}
                  onClick={() => promptId && handleTogglePrompt(collection.id)}
                  className={`p-4 border rounded-lg transition-all cursor-pointer ${
                    isInCollection
                      ? 'bg-indigo-500/10 border-indigo-500/50'
                      : 'bg-slate-800/30 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-white text-sm">{collection.name}</h3>
                        {collection.isPublic ? (
                          <Globe className="w-3 h-3 text-slate-400" />
                        ) : (
                          <Lock className="w-3 h-3 text-slate-400" />
                        )}
                      </div>
                      {collection.description && (
                        <p className="text-xs text-slate-400 line-clamp-2 mb-2">
                          {collection.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{collection.promptIds.length} prompts</span>
                        <span>•</span>
                        <span>{new Date(collection.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {isInCollection && promptId && (
                      <div className="ml-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            !isCreating && (
              <div className="text-center py-8 text-sm text-slate-400">
                No tienes colecciones aún
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
