import React from 'react';
import { User, Notification } from '../types';
import { Search, Menu, LogOut, Plus } from 'lucide-react';
import { signInWithGoogle, logoutUser } from '../services/firebase';
import ThemeToggle from './ThemeToggle';
import NotificationBell from './NotificationBell';

interface NavbarProps {
  user: User | null;
  setUser: (user: User | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleSidebar: () => void;
  onOpenCreate: () => void;
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
  notifications = [],
  onMarkNotificationAsRead = () => {},
  onMarkAllNotificationsAsRead = () => {},
  onClearNotification = () => {}
}) => {
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

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/50 h-14">
      <div className="h-full px-3 sm:px-4 flex items-center gap-3">

        {/* Mobile menu */}
        <button onClick={toggleSidebar} className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
          <Menu size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-base font-bold text-slate-900 dark:text-white hidden sm:block">
            Cofre<span className="text-indigo-500 dark:text-indigo-400">Prompt</span>
          </span>
        </div>

        {/* Search - expands to fill space */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-3 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              placeholder="Buscar prompts..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications (only for logged users) */}
          {user && (
            <NotificationBell
              notifications={notifications}
              onMarkAsRead={onMarkNotificationAsRead}
              onMarkAllAsRead={onMarkAllNotificationsAsRead}
              onClear={onClearNotification}
            />
          )}

          {/* Create button */}
          <button
            onClick={onOpenCreate}
            className="h-9 px-3 flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Crear</span>
          </button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=6366f1&color=fff`}
                alt={user.displayName || 'User'}
                className="h-8 w-8 rounded-full border border-slate-700"
              />
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="h-9 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
