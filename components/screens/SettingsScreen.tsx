'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { showNotification } from '@/components/ui/Notification';

interface SettingsScreenProps {
  onScreenChange?: (screen: string) => void;
}

export default function SettingsScreen({ onScreenChange }: SettingsScreenProps) {
  const handleBack = () => {
    onScreenChange?.('profile');
  };
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    showNotification('Настройки сохранены', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="text-xl">←</button>
          <h1 className="text-lg font-semibold text-gray-800">Настройки</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div className="glass border border-white/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Уведомления</h3>
              <p className="text-sm text-gray-600">Получать push-уведомления</p>
            </div>
            <button
              onClick={() => handleToggle('notifications')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications ? 'bg-[#2196F3]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.notifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="glass border border-white/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Звук</h3>
              <p className="text-sm text-gray-600">Звуковые уведомления</p>
            </div>
            <button
              onClick={() => handleToggle('sound')}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.sound ? 'bg-[#2196F3]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.sound ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

