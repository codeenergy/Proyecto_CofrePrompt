import { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PromptCard from './components/PromptCard';
import Modal from './components/Modal';
import CreatePromptModal from './components/CreatePromptModal';
import EditProfileModal from './components/EditProfileModal';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import CollectionsModal from './components/CollectionsModal';
import Toast, { ToastType } from './components/Toast';
import LoadingSpinner from './components/LoadingSpinner';
import SkeletonCard from './components/SkeletonCard';
import HotmartFloatingButton from './components/HotmartFloatingButton';
import SupportButton from './components/SupportButton';
import { LanguageProvider } from './i18n/LanguageContext';
import { Category, Platform, Prompt, User, Comment, Collection, Notification } from './types';
import { MOCK_PROMPTS } from './constants';
import {
  signInWithGoogle,
  onAuthChange,
  getPromptsFromDb,
  savePromptToDb,
  updatePromptInDb,
  deletePromptFromDb,
  getUserData,
  saveUserData,
  addToFavorites,
  removeFromFavorites,
  getUserCollections,
  createCollection,
  addPromptToCollection,
  removePromptFromCollection
} from './services/firebase';

type SortOption = 'DEFAULT' | 'LIKES' | 'NEWEST';
type LegalView = 'PRIVACY' | 'TERMS' | 'COOKIES' | 'CONTACT';

// Notifications will be loaded from Firebase

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.All);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'All'>('All');
  const [sortOption, setSortOption] = useState<SortOption>('DEFAULT');
  const [currentPage, setCurrentPage] = useState(1);
  const PROMPTS_PER_PAGE = 20;

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [legalModalView, setLegalModalView] = useState<LegalView | null>(null);
  const [isCollectionsModalOpen, setIsCollectionsModalOpen] = useState(false);
  const [selectedPromptForCollection, setSelectedPromptForCollection] = useState<string | undefined>(undefined);

  // Escuchar cambios en la autenticación para mantener sesión
  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser) => {
      if (authUser) {
        // Cargar datos adicionales del usuario desde Firebase
        const userData = await getUserData(authUser.uid);

        // Cargar colecciones del usuario
        const userCollections = await getUserCollections(authUser.uid);
        setCollections(userCollections);

        if (userData) {
          setUser({ ...authUser, ...userData });
        } else {
          setUser(authUser);
        }
      } else {
        setUser(null);
        setCollections([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Helper para mostrar toasts
  const showToast = (message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cargar prompts al iniciar
  useEffect(() => {
    const loadPrompts = async () => {
      setIsLoadingPrompts(true);
      try {
        const dbPrompts = await getPromptsFromDb();
        if (dbPrompts.length > 0) {
          setPrompts(dbPrompts);
          showToast(`${dbPrompts.length} prompts cargados exitosamente`, 'success');
        } else {
          setPrompts(MOCK_PROMPTS);
          showToast('Mostrando prompts de ejemplo', 'info');
        }
      } catch (error) {
        console.error('Error al cargar prompts:', error);
        setPrompts(MOCK_PROMPTS);
        showToast('Error al cargar prompts. Mostrando ejemplos', 'warning');
      } finally {
        setIsLoadingPrompts(false);
      }
    };
    loadPrompts();
  }, []);
  const filteredPrompts = useMemo(() => {
    let result = prompts.filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === Category.All || prompt.category === selectedCategory;
      const matchesPlatform = selectedPlatform === 'All' || prompt.platform === selectedPlatform;
      return matchesSearch && matchesCategory && matchesPlatform;
    });

    if (sortOption === 'LIKES') {
      result = [...result].sort((a, b) => b.likes - a.likes);
    } else if (sortOption === 'NEWEST') {
      result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [searchTerm, selectedCategory, selectedPlatform, prompts, sortOption]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPrompts.length / PROMPTS_PER_PAGE);
  const paginatedPrompts = useMemo(() => {
    const startIndex = (currentPage - 1) * PROMPTS_PER_PAGE;
    return filteredPrompts.slice(startIndex, startIndex + PROMPTS_PER_PAGE);
  }, [filteredPrompts, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedPlatform, sortOption]);

  const handleLogin = async () => {
    try {
      const loggedInUser = await signInWithGoogle();

      // Verificar si el usuario ya tiene datos en Firebase
      let userData = await getUserData(loggedInUser.uid);

      if (!userData) {
        // Si es la primera vez que inicia sesión, crear perfil
        await saveUserData(loggedInUser.uid, {
          uid: loggedInUser.uid,
          displayName: loggedInUser.displayName,
          email: loggedInUser.email,
          photoURL: loggedInUser.photoURL,
          bio: '',
          favoritePrompts: [],
          collections: [],
          following: [],
          followers: []
        });
        userData = await getUserData(loggedInUser.uid);
      }

      setUser({ ...loggedInUser, ...userData });
      showToast(`¡Bienvenido ${loggedInUser.displayName}!`, 'success');
    } catch (error) {
      console.error("Login failed", error);
      showToast('Error al iniciar sesión. Intenta nuevamente', 'error');
    }
  };

  const handleCreatePrompt = async (newPromptData: Omit<Prompt, 'id' | 'likes' | 'views' | 'createdAt'>) => {
    if (!user) return;

    const newPrompt = {
      ...newPromptData,
      authorId: user.uid,
      author: user.displayName || 'Usuario',
      authorPhoto: user.photoURL,
      likes: 0,
      views: 0
    };

    try {
      showToast('Guardando prompt...', 'info');
      await savePromptToDb(newPrompt);
      const dbPrompts = await getPromptsFromDb();
      setPrompts(dbPrompts);
      setIsCreateModalOpen(false);
      showToast('¡Prompt publicado exitosamente!', 'success');
    } catch (error) {
      console.error("Error al crear el prompt:", error);
      showToast('Error al publicar el prompt. Intenta nuevamente', 'error');
    }
  };

  const handleUpdatePrompt = async (promptId: string, updates: Partial<Prompt>) => {
    try {
      showToast('Actualizando prompt...', 'info');
      await updatePromptInDb(promptId, updates);
      const dbPrompts = await getPromptsFromDb();
      setPrompts(dbPrompts);
      setEditingPrompt(null);
      showToast('Prompt actualizado exitosamente', 'success');
    } catch (error) {
      console.error("Error al actualizar el prompt:", error);
      showToast('Error al actualizar el prompt', 'error');
    }
  };

  const handleDeletePrompt = async (promptId: string) => {
    try {
      showToast('Eliminando prompt...', 'info');
      await deletePromptFromDb(promptId);
      const dbPrompts = await getPromptsFromDb();
      setPrompts(dbPrompts);
      showToast('Prompt eliminado exitosamente', 'success');
    } catch (error) {
      console.error("Error al eliminar el prompt:", error);
      showToast('Error al eliminar el prompt', 'error');
    }
  };

  const handleOpenCreate = () => {
    if (!user) {
      handleLogin();
      return;
    }
    setIsCreateModalOpen(true);
  };

  const handlePresetFilter = (type: 'BEST' | 'NEW' | 'ART' | 'CODE') => {
    setSearchTerm('');
    setSelectedPlatform('All');
    switch (type) {
      case 'BEST': setSelectedCategory(Category.All); setSortOption('LIKES'); break;
      case 'NEW': setSelectedCategory(Category.All); setSortOption('NEWEST'); break;
      case 'ART': setSelectedCategory(Category.Design); setSortOption('DEFAULT'); break;
      case 'CODE': setSelectedCategory(Category.Coding); setSortOption('DEFAULT'); break;
    }
  };

  const handleAddComment = (comment: Omit<Comment, 'id' | 'createdAt' | 'likes'>) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: 0
    };
    setComments([...comments, newComment]);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(c =>
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  const handleToggleFavorite = async (promptId: string) => {
    if (!user) return;

    const favorites = user.favoritePrompts || [];
    const isFavorite = favorites.includes(promptId);

    try {
      if (isFavorite) {
        // Quitar de favoritos
        await removeFromFavorites(user.uid, promptId);
        const newFavorites = favorites.filter(id => id !== promptId);
        setUser({ ...user, favoritePrompts: newFavorites });
        showToast('Eliminado de favoritos', 'success');
      } else {
        // Agregar a favoritos
        await addToFavorites(user.uid, promptId);
        const newFavorites = [...favorites, promptId];
        setUser({ ...user, favoritePrompts: newFavorites });
        showToast('Agregado a favoritos', 'success');
      }
    } catch (error) {
      console.error('Error al actualizar favoritos:', error);
      showToast('Error al actualizar favoritos', 'error');
    }
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleUpdateProfile = async (updates: { displayName?: string; bio?: string }) => {
    if (!user) return;

    try {
      showToast('Actualizando perfil...', 'info');
      await saveUserData(user.uid, updates);
      setUser({ ...user, ...updates });
      showToast('Perfil actualizado exitosamente', 'success');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      showToast('Error al actualizar perfil', 'error');
    }
  };

  const handleCreateCollection = async (name: string, description: string, isPublic: boolean) => {
    if (!user) return;

    try {
      showToast('Creando colección...', 'info');
      await createCollection(user.uid, name, description, isPublic);
      const userCollections = await getUserCollections(user.uid);
      setCollections(userCollections);
      showToast('Colección creada exitosamente', 'success');
    } catch (error) {
      console.error('Error al crear colección:', error);
      showToast('Error al crear colección', 'error');
    }
  };

  const handleAddToCollection = async (collectionId: string, promptId: string) => {
    if (!user) return;

    try {
      await addPromptToCollection(collectionId, promptId);
      const userCollections = await getUserCollections(user.uid);
      setCollections(userCollections);
      showToast('Prompt agregado a la colección', 'success');
    } catch (error) {
      console.error('Error al agregar a colección:', error);
      showToast('Error al agregar a colección', 'error');
    }
  };

  const handleRemoveFromCollection = async (collectionId: string, promptId: string) => {
    if (!user) return;

    try {
      await removePromptFromCollection(collectionId, promptId);
      const userCollections = await getUserCollections(user.uid);
      setCollections(userCollections);
      showToast('Prompt eliminado de la colección', 'success');
    } catch (error) {
      console.error('Error al eliminar de colección:', error);
      showToast('Error al eliminar de colección', 'error');
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
        <Navbar
        user={user}
        setUser={setUser}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenCreate={handleOpenCreate}
        onOpenProfile={() => setShowUserProfile(true)}
        notifications={notifications}
        onMarkNotificationAsRead={handleMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
        onClearNotification={handleClearNotification}
      />

      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          closeMobile={() => setIsSidebarOpen(false)}
          selectedCategory={selectedCategory}
          onSelectCategory={(c) => { setSelectedCategory(c); setSortOption('DEFAULT'); }}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
          prompts={prompts}
        />

        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-5">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedCategory === Category.All ? 'Todos los Prompts' : selectedCategory}
              </h1>
              {sortOption !== 'DEFAULT' && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                  {sortOption === 'LIKES' ? 'Populares' : 'Recientes'}
                </span>
              )}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-500">{filteredPrompts.length} resultados</span>
          </div>

          {/* Grid */}
          {isLoadingPrompts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredPrompts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                {paginatedPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onOpen={setSelectedPrompt}
                    onCopy={() => showToast('Prompt copiado al portapapeles', 'success')}
                    user={user}
                    onLoginRequest={handleLogin}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors border border-slate-700"
                  >
                    Anterior
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                            currentPage === pageNumber
                              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors border border-slate-700"
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <span className="text-3xl">🔍</span>
              </div>
              <p className="text-base font-medium text-slate-300 mb-2">No se encontraron prompts</p>
              <p className="text-sm text-slate-500 mb-4">Intenta ajustar los filtros o buscar algo diferente</p>
              <button
                onClick={() => {
                  setSelectedCategory(Category.All);
                  setSelectedPlatform('All');
                  setSearchTerm('');
                  setSortOption('DEFAULT');
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-all hover:scale-105"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer onOpenLegal={setLegalModalView} onPresetFilter={handlePresetFilter} />

      <Modal
        prompt={selectedPrompt}
        user={user}
        onClose={() => setSelectedPrompt(null)}
        onLoginRequest={handleLogin}
        allPrompts={prompts}
        comments={comments}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
        onToggleFavorite={handleToggleFavorite}
        onCopySuccess={() => showToast('Prompt copiado al portapapeles', 'success')}
        onSelectRelatedPrompt={setSelectedPrompt}
      />

      <CreatePromptModal
        isOpen={isCreateModalOpen || !!editingPrompt}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingPrompt(null);
        }}
        onSubmit={editingPrompt
          ? (data) => handleUpdatePrompt(editingPrompt.id, data)
          : handleCreatePrompt
        }
        user={user}
        initialData={editingPrompt || undefined}
      />

      {user && showUserProfile && (
        <UserProfile
          user={user}
          prompts={prompts}
          isOwnProfile={true}
          onClose={() => setShowUserProfile(false)}
          onOpenPrompt={setSelectedPrompt}
          onEditProfile={() => {
            setShowUserProfile(false);
            setShowEditProfile(true);
          }}
          onEditPrompt={(prompt) => {
            setEditingPrompt(prompt);
            setShowUserProfile(false);
          }}
          onDeletePrompt={handleDeletePrompt}
          onOpenCollections={() => {
            setShowUserProfile(false);
            setIsCollectionsModalOpen(true);
          }}
        />
      )}

      {user && (
        <EditProfileModal
          isOpen={showEditProfile}
          onClose={() => setShowEditProfile(false)}
          user={user}
          onSave={handleUpdateProfile}
        />
      )}

      <LegalModal
        view={legalModalView}
        onClose={() => setLegalModalView(null)}
      />

      <CollectionsModal
        isOpen={isCollectionsModalOpen}
        onClose={() => {
          setIsCollectionsModalOpen(false);
          setSelectedPromptForCollection(undefined);
        }}
        user={user}
        promptId={selectedPromptForCollection}
        collections={collections}
        onCreateCollection={handleCreateCollection}
        onAddToCollection={handleAddToCollection}
        onRemoveFromCollection={handleRemoveFromCollection}
      />

        {/* Toast Notifications */}
        <div className="fixed top-20 right-4 z-[60] space-y-2">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>

        {/* Botón Flotante de Hotmart */}
        <HotmartFloatingButton />

        {/* Botón de Soporte */}
        <SupportButton position="bottom-left" />
      </div>
    </LanguageProvider>
  );
}

export default App;
