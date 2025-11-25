import React, { useState } from 'react';
import { Bell, X, Heart, MessageSquare, UserPlus, TrendingUp, Check } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'comment' | 'like' | 'follow' | 'trending';
  userId: string;
  userName: string;
  userPhoto: string | null;
  promptId?: string;
  promptTitle?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationBellProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClear: (id: string) => void;
}

export default function NotificationBell({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClear
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-400" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-green-400" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `Hace ${minutes}m`;
    if (hours < 24) return `Hace ${hours}h`;
    return `Hace ${days}d`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
        title="Notificaciones"
      >
        <Bell className="w-5 h-5 text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 max-h-[500px] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-white">Notificaciones</h3>
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Marcar todas como leídas
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">No hay notificaciones</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-slate-800/50 transition-colors ${
                        !notification.read ? 'bg-indigo-500/5' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <img
                          src={notification.userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(notification.userName)}&background=6366f1&color=fff`}
                          alt={notification.userName}
                          className="w-10 h-10 rounded-full flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              {getIcon(notification.type)}
                              <span className="text-sm text-white font-medium">
                                {notification.userName}
                              </span>
                            </div>
                            <button
                              onClick={() => onClear(notification.id)}
                              className="p-1 hover:bg-slate-700 rounded transition-colors"
                            >
                              <X className="w-3 h-3 text-slate-500" />
                            </button>
                          </div>

                          <p className="text-sm text-slate-300 mb-1">
                            {notification.message}
                          </p>

                          {notification.promptTitle && (
                            <p className="text-xs text-slate-500 truncate mb-2">
                              "{notification.promptTitle}"
                            </p>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              {getTimeAgo(notification.createdAt)}
                            </span>

                            {!notification.read && (
                              <button
                                onClick={() => onMarkAsRead(notification.id)}
                                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                Marcar como leída
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
