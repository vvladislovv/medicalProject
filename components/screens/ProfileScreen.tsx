'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { storage } from '@/utils/storage';
import { User, Appointment } from '@/types';
import { showNotification } from '@/components/ui/Notification';

interface ProfileScreenProps {
  onScreenChange?: (screen: string) => void;
}

export default function ProfileScreen({ onScreenChange }: ProfileScreenProps) {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('10:00');

  useEffect(() => {
    const currentUser = storage.getUser();
    const userAppointments = storage.getAppointments();
    setUser(currentUser);
    setAppointments(userAppointments);
  }, []);

  const handleLogout = () => {
    // Очищаем данные и создаем нового дефолтного пользователя
    storage.clearUser();
    storage.setUser({
      id: '1',
      name: 'Пользователь',
      email: 'user@example.com',
      age: 25,
      gender: 'Male',
    });
    storage.setCurrentScreen('home');
    window.location.reload();
  };

  const upcomingAppointment = appointments.find(apt => apt.status === 'upcoming');

  const handleReschedule = () => {
    if (!upcomingAppointment) return;
    setRescheduleDate(upcomingAppointment.date);
    setShowRescheduleModal(true);
  };

  const confirmReschedule = () => {
    if (!rescheduleDate || !upcomingAppointment) return;
    
    const updatedAppointments = appointments.map(apt => 
      apt.id === upcomingAppointment.id 
        ? { ...apt, date: rescheduleDate, time: rescheduleTime }
        : apt
    );
    
    storage.setAppointments(updatedAppointments);
    setAppointments(updatedAppointments);
    setShowRescheduleModal(false);
    showNotification('Запись успешно перенесена', 'success');
  };

  const handlePillReminder = () => {
    onScreenChange?.('pill-reminder');
  };

  const handleMenuClick = (itemId: string) => {
    switch(itemId) {
      case 'orders':
        onScreenChange?.('orders');
        break;
      case 'lab':
        onScreenChange?.('lab-tests');
        break;
      case 'consultation':
        onScreenChange?.('consultations');
        break;
      case 'member':
        onScreenChange?.('family-members');
        break;
      case 'payment':
        onScreenChange?.('payment-history');
        break;
      case 'settings':
        onScreenChange?.('settings');
        break;
    }
  };

  const menuItems = [
    { id: 'orders', label: 'Мои заказы', icon: '📦' },
    { id: 'lab', label: 'Мои анализы', icon: '🔬' },
    { id: 'consultation', label: 'Мои консультации', icon: '💬' },
    { id: 'member', label: 'Добавить члена семьи', icon: '👥' },
    { id: 'payment', label: 'История платежей', icon: '💳' },
    { id: 'settings', label: 'Настройки', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      {/* Header */}
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => onScreenChange?.('home')} className="text-xl">←</button>
            <h1 className="text-lg font-semibold text-gray-800">Профиль</h1>
          </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onScreenChange?.('edit-profile')}
              className="text-sm text-[#2196F3] font-medium"
            >
              Редактировать
            </motion.button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* User Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass border border-white/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#2196F3] flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user?.name || 'Пользователь'}</h2>
              <p className="text-sm text-gray-600">
                {user?.age || '25'}, {user?.gender === 'Male' ? 'Мужской' : user?.gender === 'Female' ? 'Женский' : 'Мужской'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Health Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Обзор здоровья</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Heart Rate */}
            <div className="glass border border-white/30 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-2">Пульс</div>
              <div className="text-2xl font-bold text-gray-800">72 уд/мин</div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#2196F3] w-3/4"></div>
              </div>
            </div>

            {/* Blood Sugar */}
            <div className="glass border border-white/30 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-2">Сахар в крови</div>
              <div className="text-2xl font-bold text-gray-800">90 мг/дл</div>
            </div>

            {/* Blood Pressure */}
            <div className="glass border border-white/30 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-2">Давление</div>
              <div className="text-2xl font-bold text-gray-800">80/120</div>
            </div>

            {/* Appointment */}
            <div className="glass border border-white/30 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-2">Запись</div>
              {upcomingAppointment ? (
                <>
                  <div className="text-xs font-medium text-gray-800 mb-2">
                    {new Date(upcomingAppointment.date).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReschedule}
                    className="w-full bg-[#2196F3] text-white py-1.5 rounded-lg text-xs font-medium"
                  >
                    Перенести
                  </motion.button>
                </>
              ) : (
                <div className="text-sm text-gray-500">Нет записей</div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Pill Reminder */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass border border-white/30 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-800 mb-1">Напоминание о таблетках</div>
              <div className="text-xs text-gray-600">Добавить напоминание</div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handlePillReminder}
              className="bg-[#2196F3] text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Добавить
            </motion.button>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05 * index }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleMenuClick(item.id)}
              className="w-full glass border border-white/30 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium text-gray-800">{item.label}</span>
              </div>
              <span className="text-gray-400">→</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold"
        >
          Выйти
        </motion.button>
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowRescheduleModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass border border-white/30 rounded-2xl p-6 w-full max-w-sm"
          >
            <h3 className="text-xl font-bold mb-4">Перенести запись</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Дата</label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 rounded-lg glass border border-white/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Время</label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg glass border border-white/30"
                >
                  <option>09:00</option>
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>14:00</option>
                  <option>15:00</option>
                  <option>16:00</option>
                </select>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRescheduleModal(false)}
                  className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
                >
                  Отмена
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmReschedule}
                  className="flex-1 bg-[#2196F3] text-white py-3 rounded-lg font-semibold"
                >
                  Подтвердить
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

