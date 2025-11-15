'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

let notificationId = 0;
const notifications: Notification[] = [];
const listeners: Array<() => void> = [];

export const showNotification = (message: string, type: NotificationType = 'info', duration: number = 3000) => {
  // Проверяем, есть ли уже такое же уведомление
  const existingIndex = notifications.findIndex(n => n.message === message && n.type === type);
  
  if (existingIndex > -1) {
    // Если есть одинаковое уведомление, обновляем его (перезапускаем таймер)
    const existing = notifications[existingIndex];
    // Удаляем старое и добавляем новое с новым ID
    notifications.splice(existingIndex, 1);
  }
  
  const id = `notification-${++notificationId}`;
  notifications.push({ id, message, type });
  listeners.forEach(listener => listener());
  
  const timeoutId = setTimeout(() => {
    const index = notifications.findIndex(n => n.id === id);
    if (index > -1) {
      notifications.splice(index, 1);
      listeners.forEach(listener => listener());
    }
  }, duration);

  // Сохраняем timeout ID для возможности отмены
  return () => clearTimeout(timeoutId);
};

export default function NotificationContainer() {
  const [notificationsState, setNotificationsState] = useState<Notification[]>([]);

  useEffect(() => {
    const listener = () => {
      setNotificationsState([...notifications]);
    };
    listeners.push(listener);
    setNotificationsState([...notifications]);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  const getNotificationStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-white text-gray-900 border-green-500';
      case 'error':
        return 'bg-white text-gray-900 border-red-500';
      case 'warning':
        return 'bg-white text-gray-900 border-orange-500';
      default:
        return 'bg-white text-gray-900 border-[#2196F3]';
    }
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notificationsState.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`${getNotificationStyles(notification.type)} px-6 py-4 rounded-xl shadow-lg mb-3 glass border-2 pointer-events-auto max-w-sm text-center`}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">
                {notification.type === 'success' && '✅'}
                {notification.type === 'error' && '❌'}
                {notification.type === 'warning' && '⚠️'}
                {notification.type === 'info' && 'ℹ️'}
              </span>
              <span className="font-bold text-base text-gray-900">{notification.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

