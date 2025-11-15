'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { pharmacyCategories } from '@/utils/data';
import { showNotification } from '@/components/ui/Notification';

interface PharmacyScreenProps {
  onScreenChange?: (screen: string) => void;
}

export default function PharmacyScreen({ onScreenChange }: PharmacyScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      {/* Header */}
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="text-xl">←</button>
            <h1 className="text-lg font-semibold text-gray-800">Аптека</h1>
          </div>
          <button className="text-2xl">🛒</button>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск лекарств и анализов"
            className="flex-1 bg-transparent outline-none text-sm text-gray-900"
          />
        </motion.div>

        {/* Promo Cards */}
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => showNotification('Скидка 20% применена!', 'success')}
            className="glass border border-white/30 rounded-xl p-3 bg-gradient-to-br from-orange-100 to-orange-50"
          >
            <div className="text-2xl mb-2">💊</div>
            <div className="text-xs font-semibold text-orange-700">20% OFF</div>
          </motion.button>
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onScreenChange?.('lab-tests')}
            className="glass border border-white/30 rounded-xl p-3 bg-gradient-to-br from-blue-100 to-blue-50"
          >
            <div className="text-2xl mb-2">🔬</div>
            <div className="text-xs font-semibold text-blue-700">Анализы</div>
          </motion.button>
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => showNotification('Откройте камеру для сканирования рецепта', 'info')}
            className="glass border border-white/30 rounded-xl p-3 bg-gradient-to-br from-green-100 to-green-50"
          >
            <div className="text-2xl mb-2">📱</div>
            <div className="text-xs font-semibold text-green-700">Заказ по рецепту</div>
          </motion.button>
        </div>

        {/* Scan Prescription */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass border border-white/30 rounded-xl p-4 bg-gradient-to-r from-[#2196F3]/10 to-[#E3F2FD]/10"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Отсканируйте рецепт для заказа</h3>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onScreenChange?.('scanner')}
              className="bg-[#2196F3] text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Сканировать
            </motion.button>
          </div>
        </motion.div>

        {/* Order by Category */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Заказ по категориям</h3>
            <button 
              onClick={() => showNotification('Загружаются дополнительные категории...', 'info')}
              className="text-sm text-[#2196F3] font-medium"
            >
              Показать еще
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {pharmacyCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.05 * index }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onScreenChange?.(`pharmacy-category-${category.id}`)}
                className="glass border border-white/30 rounded-xl p-3 flex flex-col items-center gap-2 bg-white/50"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs text-center text-gray-700 font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

