'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { storage } from '@/utils/storage';
import { User } from '@/types';
import { showNotification } from '@/components/ui/Notification';

interface EditProfileScreenProps {
  onScreenChange?: (screen: string) => void;
}

export default function EditProfileScreen({ onScreenChange }: EditProfileScreenProps) {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'Male' as 'Male' | 'Female',
  });

  useEffect(() => {
    const currentUser = storage.getUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        age: currentUser.age?.toString() || '',
        gender: currentUser.gender || 'Male',
      });
    }
  }, []);

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      showNotification('Заполните обязательные поля', 'warning');
      return;
    }

    const updatedUser: User = {
      id: user?.id || '1',
      name: formData.name,
      email: formData.email,
      age: formData.age ? parseInt(formData.age) : undefined,
      gender: formData.gender,
    };

    storage.setUser(updatedUser);
    showNotification('Профиль успешно обновлен', 'success');
    onScreenChange?.('profile');
  };

  const handleBack = () => {
    onScreenChange?.('profile');
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="text-xl">←</button>
            <h1 className="text-lg font-semibold text-gray-800">Редактировать профиль</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        <div className="glass border border-white/30 rounded-xl p-4">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#2196F3] flex items-center justify-center text-white text-3xl font-bold mb-3">
              {formData.name.charAt(0).toUpperCase() || 'U'}
            </div>
            <p className="text-sm text-gray-600">Нажмите для изменения фото</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Имя <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg glass border border-white/30 text-gray-900"
              placeholder="Введите имя"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg glass border border-white/30 text-gray-900"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">Возраст</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-3 rounded-lg glass border border-white/30 text-gray-900"
              placeholder="Введите возраст"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900">Пол</label>
            <div className="flex gap-3">
              <button
                onClick={() => setFormData({ ...formData, gender: 'Male' })}
                className={`flex-1 px-4 py-3 rounded-lg font-medium ${
                  formData.gender === 'Male'
                    ? 'bg-[#2196F3] text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Мужской
              </button>
              <button
                onClick={() => setFormData({ ...formData, gender: 'Female' })}
                className={`flex-1 px-4 py-3 rounded-lg font-medium ${
                  formData.gender === 'Female'
                    ? 'bg-[#2196F3] text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Женский
              </button>
            </div>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="w-full bg-[#2196F3] text-white py-4 rounded-xl font-semibold mt-6"
        >
          Сохранить изменения
        </motion.button>
      </div>
    </div>
  );
}

