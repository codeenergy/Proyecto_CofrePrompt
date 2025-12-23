import React from 'react';
import { User, Notification } from '../types';
import { Search, Menu, LogOut, Plus, Globe, HelpCircle } from 'lucide-react';
import { signInWithGoogle, logoutUser } from '../services/firebase';
import { useLanguage } from '../i18n/LanguageContext';
import ThemeToggle from './ThemeToggle';
import NotificationBell from './NotificationBell';

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
    <>
      <nav className="sticky top-0 z-50 h-16 bg-slate-900 border-b border-orange-500/30 shadow-md">
        <div className="h-full px-3 sm:px-6 flex items-center gap-3">
          {/* Mobile menu */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2.5 -ml-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-white transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
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

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Selector */}
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="h-11 px-3 flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-orange-500 rounded-lg transition-colors"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <Globe size={18} className="text-orange-400" />
              <span className="text-sm font-bold text-white uppercase">{language}</span>
            </button>

            {/* Support Button */}
            <button
              onClick={() => window.open('https://otieu.com/4/10325708', '_blank', 'noopener,noreferrer')}
              className="h-11 px-3 sm:px-4 flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 border border-green-500/50 hover:border-green-400/50 rounded-lg transition-all hover:scale-105 shadow-lg shadow-green-500/20"
              title="Soporte"
            >
              <HelpCircle size={18} className="text-white" />
              <span className="hidden md:inline text-sm font-bold text-white">Ayuda</span>
            </button>

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
              className="h-11 px-4 sm:px-5 flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold rounded-lg transition-colors"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">{t.navbar.create}</span>
            </button>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenProfile}
                  title={t.navbar.profile}
                >
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=FF6D00&color=fff`}
                    alt={user.displayName || 'User'}
                    className="h-10 w-10 rounded-full border-2 border-orange-500 hover:border-orange-400 transition-colors"
                  />
                </button>

                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500 transition-colors"
                  title={t.navbar.logout}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="h-11 px-5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors"
              >
                {t.navbar.login}
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
