'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'reminder' | 'order' | 'general';
}

interface NotificationsScreenProps {
  onScreenChange?: (screen: string) => void;
}

export default function NotificationsScreen({ onScreenChange }: NotificationsScreenProps) {
  const handleBack = () => {
    onScreenChange?.('home');
  };
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Напоминание о приеме',
      message: 'У вас запись к Др. Амит Кумар через 2 часа',
      time: '10:30',
      read: false,
      type: 'appointment',
    },
    {
      id: '2',
      title: 'Заказ доставлен',
      message: 'Ваш заказ #1234 успешно доставлен',
      time: 'Вчера, 15:20',
      read: false,
      type: 'order',
    },
    {
      id: '3',
      title: 'Время принять таблетки',
      message: 'Не забудьте принять Аспирин',
      time: 'Вчера, 09:00',
      read: true,
      type: 'reminder',
    },
    {
      id: '4',
      title: 'Новые результаты анализов',
      message: 'Результаты ваших анализов готовы',
      time: '25.11.2024',
      read: true,
      type: 'general',
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment': return '📅';
      case 'reminder': return '💊';
      case 'order': return '📦';
      default: return '🔔';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="text-xl">←</button>
            <h1 className="text-lg font-semibold text-gray-800">Уведомления</h1>
          </div>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔔</div>
            <p className="text-gray-600">Нет уведомлений</p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => markAsRead(notification.id)}
              className={`glass border border-white/30 rounded-xl p-4 ${
                !notification.read ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

