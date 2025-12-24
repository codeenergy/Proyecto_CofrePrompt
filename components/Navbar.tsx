import React, { useState, useRef, useEffect } from 'react';
import { User, Notification } from '../types';
import { Search, Menu, LogOut, Plus, Globe, HelpCircle, Bell, X, Sun, Moon } from 'lucide-react';
import { signInWithGoogle, logoutUser } from '../services/firebase';
import { useLanguage } from '../i18n/LanguageContext';

interface NavbarProps {
  user: User | null;
  setUser: (user: User | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleSidebar: () => void;
  onOpenCreate: () => void;
  onOpenProfile?: () => void;
  notifications?: Notification[];
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onClearNotification?: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  user,
  setUser,
  searchTerm,
  setSearchTerm,
  toggleSidebar,
  onOpenCreate,
  onOpenProfile,
  notifications = [],
  onMarkNotificationAsRead = () => {},
  onMarkAllNotificationsAsRead = () => {},
  onClearNotification = () => {}
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const menuRef = useRef<HTMLDivElement>(null);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemPreference;
    setTheme(initialTheme);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const handleLogin = async () => {
    try {
      const loggedInUser = await signInWithGoogle();
      setUser(loggedInUser);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <nav className="sticky top-0 z-50 h-16 bg-slate-900 border-b border-orange-500/30 shadow-md">
        <div className="h-full px-3 sm:px-6 flex items-center gap-3">
          {/* Sidebar Toggle (Mobile Only) */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2.5 -ml-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-white transition-colors"
            title="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl">C</span>
            </div>

            <span className="text-lg font-black bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent hidden sm:block">
              CofrePrompt
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-6">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-12 pr-4 bg-slate-800 border border-slate-700 focus:border-orange-500 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
                placeholder={t.navbar.search}
              />
            </div>
          </div>

          {/* Hamburger Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white transition-all hover:scale-105 shadow-lg relative"
              title="Menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-orange-500/30 rounded-lg shadow-2xl shadow-black/50 overflow-hidden">
                <div className="p-3 border-b border-slate-800 bg-gradient-to-r from-orange-500/10 to-blue-500/10">
                  <h3 className="text-sm font-bold text-white">Menú de Acciones</h3>
                </div>

                <div className="p-2 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  {/* User Profile Section */}
                  {user ? (
                    <div className="p-3 mb-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=FF6D00&color=fff`}
                          alt={user.displayName || 'User'}
                          className="w-12 h-12 rounded-full border-2 border-orange-500"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate">{user.displayName}</p>
                          <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onOpenProfile?.();
                          setIsMenuOpen(false);
                        }}
                        className="w-full mt-2 py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        Ver Perfil
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleLogin();
                        setIsMenuOpen(false);
                      }}
                      className="w-full p-3 mb-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors"
                    >
                      {t.navbar.login}
                    </button>
                  )}

                  {/* Menu Items */}
                  <div className="space-y-1">
                    {/* Create Prompt */}
                    <button
                      onClick={() => {
                        onOpenCreate();
                        setIsMenuOpen(false);
                      }}
                      className="w-full p-3 flex items-center gap-3 bg-slate-800 hover:bg-orange-500/20 border border-slate-700 hover:border-orange-500/50 rounded-lg transition-all group"
                    >
                      <div className="w-10 h-10 bg-orange-500/20 group-hover:bg-orange-500/30 rounded-lg flex items-center justify-center transition-colors">
                        <Plus size={20} className="text-orange-400" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-bold text-white">Crear Prompt</p>
                        <p className="text-xs text-slate-400">Agregar nuevo prompt</p>
                      </div>
                    </button>

                    {/* Notifications */}
                    {user && notifications.length > 0 && (
                      <div className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Bell size={18} className="text-blue-400" />
                            <p className="text-sm font-bold text-white">Notificaciones</p>
                          </div>
                          {unreadCount > 0 && (
                            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                              {unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {notifications.slice(0, 5).map((notif) => (
                            <div
                              key={notif.id}
                              className={`p-2 rounded border ${
                                notif.read
                                  ? 'bg-slate-900/50 border-slate-700/30'
                                  : 'bg-blue-500/10 border-blue-500/30'
                              }`}
                            >
                              <p className="text-xs text-white line-clamp-2">{notif.message}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {!notif.read && (
                                  <button
                                    onClick={() => onMarkNotificationAsRead(notif.id)}
                                    className="text-xs text-blue-400 hover:text-blue-300"
                                  >
                                    Marcar leída
                                  </button>
                                )}
                                <button
                                  onClick={() => onClearNotification(notif.id)}
                                  className="text-xs text-red-400 hover:text-red-300"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        {unreadCount > 0 && (
                          <button
                            onClick={() => {
                              onMarkAllNotificationsAsRead();
                              setIsMenuOpen(false);
                            }}
                            className="w-full mt-2 py-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium"
                          >
                            Marcar todas como leídas
                          </button>
                        )}
                      </div>
                    )}

                    {/* Language Selector */}
                    <button
                      onClick={() => {
                        setLanguage(language === 'es' ? 'en' : 'es');
                      }}
                      className="w-full p-3 flex items-center gap-3 bg-slate-800 hover:bg-orange-500/20 border border-slate-700 hover:border-orange-500/50 rounded-lg transition-all group"
                    >
                      <div className="w-10 h-10 bg-orange-500/20 group-hover:bg-orange-500/30 rounded-lg flex items-center justify-center transition-colors">
                        <Globe size={20} className="text-orange-400" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-bold text-white">
                          {language === 'es' ? 'Idioma: Español' : 'Language: English'}
                        </p>
                        <p className="text-xs text-slate-400">
                          {language === 'es' ? 'Cambiar a English' : 'Switch to Español'}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded uppercase">
                        {language}
                      </span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                      onClick={toggleTheme}
                      className="w-full p-3 flex items-center gap-3 bg-slate-800 hover:bg-orange-500/20 border border-slate-700 hover:border-orange-500/50 rounded-lg transition-all group"
                    >
                      <div className="w-10 h-10 bg-orange-500/20 group-hover:bg-orange-500/30 rounded-lg flex items-center justify-center transition-colors">
                        {theme === 'dark' ? (
                          <Moon size={20} className="text-orange-400" />
                        ) : (
                          <Sun size={20} className="text-orange-400" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-bold text-white">
                          {theme === 'dark' ? 'Tema: Oscuro' : 'Tema: Claro'}
                        </p>
                        <p className="text-xs text-slate-400">
                          {theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                        </p>
                      </div>
                    </button>

                    {/* Support Button */}
                    <button
                      onClick={() => {
                        window.open('https://otieu.com/4/10367593', '_blank', 'noopener,noreferrer');
                        setIsMenuOpen(false);
                      }}
                      className="w-full p-3 flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 border border-green-500/50 rounded-lg transition-all group"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <HelpCircle size={20} className="text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-bold text-white">Soporte</p>
                        <p className="text-xs text-green-100">Obtener ayuda</p>
                      </div>
                    </button>

                    {/* Logout */}
                    {user && (
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full p-3 flex items-center gap-3 bg-slate-800 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/50 rounded-lg transition-all group"
                      >
                        <div className="w-10 h-10 bg-red-500/20 group-hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-colors">
                          <LogOut size={20} className="text-red-400" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-bold text-white">Cerrar Sesión</p>
                          <p className="text-xs text-slate-400">Salir de tu cuenta</p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
