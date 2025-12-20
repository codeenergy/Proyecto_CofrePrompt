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
      <nav className="sticky top-0 z-50 h-16 backdrop-blur-xl bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 border-b border-orange-500/20 shadow-xl shadow-orange-500/10">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-blue-600/5 to-purple-600/5 animate-gradient-shift pointer-events-none" />

        <div className="relative h-full px-3 sm:px-6 flex items-center gap-3">
          {/* Mobile menu - Rediseñado */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2.5 -ml-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-blue-600/20 hover:from-orange-500/30 hover:to-blue-600/30 text-white transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg shadow-orange-500/20"
          >
            <Menu size={20} />
          </button>

          {/* Logo Ultra Moderno con Glassmorphism */}
          <div className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-blue-600 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow" />

              {/* Logo container */}
              <div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 via-orange-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/50 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-white font-black text-xl drop-shadow-lg">C</span>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-blue-400 hidden sm:block drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
              Cofre<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Prompt</span>
            </span>
          </div>

          {/* Search Bar Ultra Moderno */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-6">
            <div className="relative group">
              {/* Glow on focus */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-blue-600 to-purple-600 rounded-2xl opacity-0 group-focus-within:opacity-30 blur transition-opacity duration-500" />

              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400 group-focus-within:text-orange-300 transition-colors duration-300 z-10" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-11 pl-12 pr-4 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 group-focus-within:border-orange-500/50 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 shadow-lg shadow-black/20"
                  placeholder="🔍 Buscar prompts increíbles..."
                />

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ padding: '1px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
              </div>
            </div>
          </div>

          {/* Actions - Rediseñados */}
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

            {/* Create button - Ultra Moderno */}
            <button
              onClick={onOpenCreate}
              className="relative h-11 px-4 sm:px-5 flex items-center gap-2 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-400 hover:to-orange-500 text-white text-sm font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 overflow-hidden group"
            >
              {/* Animated shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <Plus size={18} className="relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline relative z-10">Crear</span>
            </button>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenProfile}
                  className="relative group/avatar"
                  title="Ver perfil"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full blur-md opacity-0 group-hover/avatar:opacity-75 transition-opacity duration-300" />

                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=FF6D00&color=fff`}
                    alt={user.displayName || 'User'}
                    className="relative h-10 w-10 rounded-full border-2 border-orange-500/50 group-hover/avatar:border-orange-400 transition-all duration-300 group-hover/avatar:scale-110 shadow-lg shadow-orange-500/30"
                  />
                </button>

                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl bg-slate-800/60 backdrop-blur-xl hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700/50 hover:border-red-500/50 transition-all duration-300 hover:scale-110 shadow-lg"
                  title="Cerrar Sesión"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="relative h-11 px-5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 text-white text-sm font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 overflow-hidden group"
              >
                {/* Animated shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">Entrar</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Estilos CSS personalizados */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;
