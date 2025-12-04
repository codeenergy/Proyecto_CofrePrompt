import { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PromptCard from './components/PromptCard';
import Modal from './components/Modal';
import CreatePromptModal from './components/CreatePromptModal';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import AdUnit from './components/AdUnit';
import Toast, { ToastType } from './components/Toast';
import LoadingSpinner from './components/LoadingSpinner';
import SkeletonCard from './components/SkeletonCard';
import { Category, Platform, Prompt, User, Comment, Collection, Notification } from './types';
import { MOCK_PROMPTS } from './constants';
import {
  signInWithGoogle,
  onAuthChange,
  getPromptsFromDb,
  savePromptToDb,
  updatePromptInDb,
  deletePromptFromDb
} from './services/firebase';

type SortOption = 'DEFAULT' | 'LIKES' | 'NEWEST';
type LegalView = 'PRIVACY' | 'TERMS' | 'COOKIES' | 'CONTACT';

// Mock notifications para demostración
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'like',
    userId: 'user1',
    userName: 'María García',
    userPhoto: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=6366f1&color=fff',
    promptId: '1',
    promptTitle: 'Generador de Ideas Creativas',
    message: 'le gustó tu prompt',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    type: 'comment',
    userId: 'user2',
    userName: 'Carlos Ruiz',
    userPhoto: 'https://ui-avatars.com/api/?name=Carlos+Ruiz&background=ec4899&color=fff',
    promptId: '2',
    promptTitle: 'Optimizador de Código',
    message: 'comentó en tu prompt',
    read: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    type: 'follow',
    userId: 'user3',
    userName: 'Ana López',
    userPhoto: 'https://ui-avatars.com/api/?name=Ana+Lopez&background=10b981&color=fff',
    message: 'comenzó a seguirte',
    read: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
];

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
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.All);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'All'>('All');
  const [sortOption, setSortOption] = useState<SortOption>('DEFAULT');

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [legalModalView, setLegalModalView] = useState<LegalView | null>(null);

  // Escuchar cambios en la autenticación para mantener sesión
  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
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

  const handleLogin = async () => {
    try {
      const loggedInUser = await signInWithGoogle();
      setUser(loggedInUser);
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

  const handleToggleFavorite = (promptId: string) => {
    if (!user) return;
    const favorites = user.favoritePrompts || [];
    const newFavorites = favorites.includes(promptId)
      ? favorites.filter(id => id !== promptId)
      : [...favorites, promptId];
    setUser({ ...user, favoritePrompts: newFavorites });
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

  return (
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
        />

        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-5">
          {/* AdSense - Banner Superior */}
          <AdUnit slot="1234567890" format="horizontal" className="mb-4" />

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
                {filteredPrompts.map((prompt, index) => {
                  const Fragment = ({ children }: { children: React.ReactNode }) => <>{children}</>;
                  return (
                    <Fragment key={prompt.id}>
                      <PromptCard
                        prompt={prompt}
                        onOpen={setSelectedPrompt}
                        onCopy={() => showToast('Prompt copiado al portapapeles', 'success')}
                      />
                      {/* AdSense cada 8 prompts */}
                      {(index + 1) % 8 === 0 && (
                        <div className="col-span-full">
                          <AdUnit slot="0987654321" format="fluid" />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>

              {/* AdSense - Banner Inferior */}
              <AdUnit slot="1122334455" format="horizontal" className="mt-6" />
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
          onEditPrompt={(prompt) => {
            setEditingPrompt(prompt);
            setShowUserProfile(false);
          }}
          onDeletePrompt={handleDeletePrompt}
        />
      )}

      <LegalModal
        view={legalModalView}
        onClose={() => setLegalModalView(null)}
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
    </div>
  );
}

export default App;
