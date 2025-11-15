'use client';

import { motion } from 'framer-motion';
import { Screen } from '@/types';

interface BottomNavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

const navItems = [
  { id: 'home' as Screen, label: 'Главная', icon: '🏠' },
  { id: 'pharmacy' as Screen, label: 'Аптека', icon: '💊' },
  { id: 'appointment' as Screen, label: 'Запись', icon: '📅' },
  { id: 'reports' as Screen, label: 'Отчеты', icon: '📋' },
  { id: 'profile' as Screen, label: 'Профиль', icon: '👤' },
];

export default function BottomNavigation({ currentScreen, onScreenChange }: BottomNavigationProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/30"
    >
      <div className="flex justify-around items-center h-16 px-2 safe-area relative">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full transition-all relative"
            >
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                className="text-2xl mb-1"
              >
                {item.icon}
              </motion.div>
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-[#2196F3]' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 w-12 h-1 bg-[#2196F3] rounded-t-full"
                  initial={false}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

