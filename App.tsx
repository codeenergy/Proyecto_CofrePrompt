import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PromptCard from './components/PromptCard';
import Modal from './components/Modal';
import CreatePromptModal from './components/CreatePromptModal';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import AdUnit from './components/AdUnit';
import { Category, Platform, Prompt, User, Comment, Collection, Notification } from './types';
import { MOCK_PROMPTS } from './constants';
import { signInWithGoogle } from './services/firebase';
import { useEffect } from 'react'; // Asegúrate de que useEffect esté en el import de React
import { getPromptsFromDb, savePromptToDb } from './services/firebase';

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

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.All);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'All'>('All');
  const [sortOption, setSortOption] = useState<SortOption>('DEFAULT');

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [legalModalView, setLegalModalView] = useState<LegalView | null>(null);
     
  useEffect(() => {
     const loadPrompts = async () => {
       const dbPrompts = await getPromptsFromDb();
       if (dbPrompts.length > 0) {
         setPrompts(dbPrompts);
       } else {
         // Fallback a datos de prueba si la DB está vacía
         setPrompts(MOCK_PROMPTS); 
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
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleCreatePrompt = async (newPromptData: Omit<Prompt, 'id' | 'likes' | 'views' | 'createdAt'>) => {
    const newPrompt: Prompt = {
      ...newPromptData,
      id: Date.now().toString(),
      likes: 0,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0]
      
    };
           // 1. Guardar en Firebase
     await savePromptToDb(newPrompt);
    setPrompts([newPrompt, ...prompts]);   
     // 2. Recargar la lista (o añadirlo localmente para que sea instantáneo)
     // Opción rápida: añadirlo al estado local
     const promptWithTempId = { ...newPrompt, id: Date.now().toString() };
     setPrompts([promptWithTempId, ...prompts]);
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
          {filteredPrompts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                {filteredPrompts.map((prompt, index) => (
                  <React.Fragment key={prompt.id}>
                    <PromptCard prompt={prompt} onOpen={setSelectedPrompt} />
                    {/* AdSense cada 8 prompts */}
                    {(index + 1) % 8 === 0 && (
                      <div className="col-span-full">
                        <AdUnit slot="0987654321" format="fluid" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* AdSense - Banner Inferior */}
              <AdUnit slot="1122334455" format="horizontal" className="mt-6" />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3">
                <span className="text-xl">🔍</span>
              </div>
              <p className="text-sm text-slate-400 mb-3">No se encontraron prompts</p>
              <button
                onClick={() => {
                  setSelectedCategory(Category.All);
                  setSelectedPlatform('All');
                  setSearchTerm('');
                  setSortOption('DEFAULT');
                }}
                className="text-xs text-indigo-400 hover:underline"
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
      />

      <CreatePromptModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePrompt}
        user={user}
      />

      <LegalModal
        view={legalModalView}
        onClose={() => setLegalModalView(null)}
      />
    </div>
  );
}

export default App;
