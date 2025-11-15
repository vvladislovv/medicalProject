'use client';

import { motion } from 'framer-motion';
import { storage } from '@/utils/storage';
import { useState } from 'react';

interface HomeScreenProps {
  onScreenChange?: (screen: string) => void;
}

export default function HomeScreen({ onScreenChange }: HomeScreenProps) {
  const [user, setUser] = useState(storage.getUser());

  const quickActions = [
    { id: 'doctor', label: 'Мой врач', icon: '👨‍⚕️', color: 'bg-blue-100' },
    { id: 'reports', label: 'Медицинские отчеты', icon: '📄', color: 'bg-green-100' },
    { id: 'clinic', label: 'Найти клинику', icon: '🏥', color: 'bg-purple-100' },
    { id: 'appointment', label: 'Мои записи', icon: '📅', color: 'bg-orange-100' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      {/* Header */}
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-[#2196F3]">caresync</div>
          <button 
            onClick={() => onScreenChange?.('notifications')}
            className="text-2xl relative"
          >
            🔔
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Search Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass border border-white/30 rounded-xl px-4 py-3 flex items-center gap-3"
        >
          <span className="text-xl">🔍</span>
          <input
            type="text"
            placeholder="Поиск лекарств и больниц"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </motion.div>

        {/* Welcome Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass border border-white/30 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Добро пожаловать, {user?.name || 'Пользователь'}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#2196F3] flex items-center justify-center text-white text-xl">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onScreenChange?.('reports')}
              className="flex-1 glass-dark border border-white/20 rounded-lg py-2 px-3 flex items-center gap-2"
            >
              <span>🔒</span>
              <span className="text-sm font-medium">Просмотр отчетов</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onScreenChange?.('profile')}
              className="flex-1 glass-dark border border-white/20 rounded-lg py-2 px-3 flex items-center gap-2"
            >
              <span>👁️</span>
              <span className="text-sm font-medium">Просмотр профиля</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Next Appointment */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass border border-white/30 rounded-xl p-4 bg-gradient-to-r from-[#2196F3]/10 to-[#E3F2FD]/10"
        >
          <p className="text-sm text-gray-700">Ваш следующий прием через 3 дня</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Что вам нужно?</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (action.id === 'appointment') {
                    onScreenChange?.('appointment');
                  } else if (action.id === 'reports') {
                    onScreenChange?.('reports');
                  } else if (action.id === 'doctor') {
                    onScreenChange?.('appointment');
                  } else if (action.id === 'clinic') {
                    onScreenChange?.('appointment');
                  }
                }}
                className={`${action.color} rounded-xl p-4 flex flex-col items-center gap-2 glass border border-white/30`}
              >
                <span className="text-3xl">{action.icon}</span>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

