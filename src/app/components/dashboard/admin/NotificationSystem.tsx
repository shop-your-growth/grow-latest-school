// ============================================================================
// NOTIFICATION SYSTEM - REAL-TIME ALERT MANAGEMENT
// Cosmic notification consciousness with quantum delivery
// ============================================================================

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCircle,
  Info,
  Trash2,
  Volume2,
  VolumeX,
  X,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Mock adminApiService for now - TODO: Implement actual service
const adminApiService = {
  getNotifications: async ({ limit }: { limit: number }) => {
    // Mock notification data
    return [
      {
        id: '1',
        title: 'New User Registration',
        message: 'A new user has registered for the platform',
        type: 'info' as const,
        isRead: false,
        createdAt: new Date().toISOString(),
        priority: 'medium' as const
      },
      {
        id: '2',
        title: 'System Update Complete',
        message: 'The system has been successfully updated to version 2.1.0',
        type: 'success' as const,
        isRead: true,
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        priority: 'low' as const
      }
    ];
  },
  markNotificationAsRead: async (_id: string) => ({ success: true }),
  markAllNotificationsAsRead: async () => ({ success: true }),
  deleteNotification: async (_id: string) => ({ success: true }),
};

// ============================================================================
// COSMIC INTERFACES
// ============================================================================

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  userId?: string;
  isRead: boolean;
  createdAt: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  actionUrl?: string;
}

interface NotificationSettings {
  soundEnabled: boolean;
  desktopEnabled: boolean;
  emailEnabled: boolean;
  categories: Record<string, boolean>;
}

// ============================================================================
// NOTIFICATION SYSTEM COMPONENT
// ============================================================================

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [settings, setSettings] = useState<NotificationSettings>({
    soundEnabled: true,
    desktopEnabled: true,
    emailEnabled: false,
    categories: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  // ============================================================================
  // COSMIC EFFECTS
  // ============================================================================

  useEffect(() => {
    loadNotifications();
    setupWebSocketConnection();
    requestNotificationPermission();

    // Load settings from localStorage
    const savedSettings = localStorage.getItem('notification_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    return () => {
      // Cleanup WebSocket connection
    };
  }, []);

  useEffect(() => {
    const unread = notifications.filter(n => !n.isRead).length;
    setUnreadCount(unread);
  }, [notifications]);

  // ============================================================================
  // NOTIFICATION HANDLERS
  // ============================================================================

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      const data = await adminApiService.getNotifications({ limit: 50 });
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupWebSocketConnection = () => {
    // In production, this would establish a WebSocket connection
    // For now, we'll simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.95) { // 5% chance every 5 seconds
        addNewNotification({
          id: `notif_${Date.now()}`,
          title: 'System Alert',
          message: 'New activity detected in the system',
          type: Math.random() > 0.5 ? 'info' : 'warning',
          isRead: false,
          createdAt: new Date().toISOString(),
          priority: 'medium',
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const addNewNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);

    // Play sound if enabled
    if (settings.soundEnabled) {
      playNotificationSound();
    }

    // Show desktop notification if enabled
    if (settings.desktopEnabled && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.id,
      });
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification-sound.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Ignore audio play errors
    });
  };

  const markAsRead = async (id: string) => {
    try {
      await adminApiService.markNotificationAsRead(id);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await adminApiService.markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('notification_settings', JSON.stringify(updated));
  };

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'emerald';
      case 'warning': return 'yellow';
      case 'error': return 'red';
      default: return 'blue';
    }
  };

  const renderNotification = (notification: Notification, index: number) => {
    const Icon = getNotificationIcon(notification.type);
    const color = getNotificationColor(notification.type);

    return (
      <motion.div
        key={notification.id}
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -20, scale: 0.95 }}
        transition={{ delay: index * 0.05 }}
        className={`relative p-4 rounded-xl border transition-all duration-300 hover:shadow-lg group ${
          notification.isRead
            ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
            : `bg-${color}-50 dark:bg-${color}-900/20 border-${color}-200 dark:border-${color}-700/50`
        }`}
      >
        {/* Unread Indicator */}
        {!notification.isRead && (
          <div className={`absolute top-2 right-2 w-2 h-2 bg-${color}-500 rounded-full animate-pulse`} />
        )}

        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/30`}>
            <Icon size={16} className={`text-${color}-600 dark:text-${color}-400`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-slate-900 dark:text-white truncate">
                {notification.title}
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                {new Date(notification.createdAt).toLocaleTimeString()}
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              {notification.message}
            </p>

            {/* Priority Badge */}
            {notification.priority && (
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                notification.priority === 'urgent' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                notification.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300'
              }`}>
                {notification.priority.toUpperCase()}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {!notification.isRead && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Mark as read"
              >
                <Check size={14} className="text-slate-500" />
              </button>
            )}

            <button
              onClick={() => deleteNotification(notification.id)}
              className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              title="Delete"
            >
              <Trash2 size={14} className="text-red-500" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Bell size={20} className="text-slate-700 dark:text-slate-300" />

          {/* Unread Badge */}
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.div>
          )}
        </motion.button>

        {/* Notification Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 w-96 max-h-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/50 shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Notifications
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X size={16} className="text-slate-500" />
                  </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center space-x-1">
                  {(['all', 'unread', 'read'] as const).map((filterType) => (
                    <button
                      key={filterType}
                      onClick={() => setFilter(filterType)}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                        filter === filterType
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                      {filterType === 'unread' && unreadCount > 0 && (
                        <span className="ml-1 px-1 bg-blue-500 text-white rounded-full text-xs">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Actions */}
                {unreadCount > 0 && (
                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Mark all as read
                    </button>

                    <button
                      onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title={settings.soundEnabled ? 'Disable sound' : 'Enable sound'}
                    >
                      {settings.soundEnabled ? (
                        <Volume2 size={14} className="text-slate-500" />
                      ) : (
                        <VolumeX size={14} className="text-slate-500" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
                    />
                  </div>
                ) : filteredNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell size={32} className="text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500 dark:text-slate-400">
                      {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                    </p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    {filteredNotifications.map((notification, index) =>
                      renderNotification(notification, index)
                    )}
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default NotificationSystem;
