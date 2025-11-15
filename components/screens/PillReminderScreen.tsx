'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { showNotification } from '@/components/ui/Notification';

interface Reminder {
  id: string;
  name: string;
  time: string;
  days: string[];
  enabled: boolean;
}

const REMINDERS_KEY = 'caresync_pill_reminders';

interface PillReminderScreenProps {
  onScreenChange?: (screen: string) => void;
}

export default function PillReminderScreen({ onScreenChange }: PillReminderScreenProps) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    time: '09:00',
    days: [] as string[],
  });

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = () => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(REMINDERS_KEY);
    if (saved) {
      setReminders(JSON.parse(saved));
    }
  };

  const saveReminders = (newReminders: Reminder[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(newReminders));
    setReminders(newReminders);
  };

  const handleAddReminder = () => {
    if (!formData.name || formData.days.length === 0) {
      showNotification('Заполните название и выберите дни', 'warning');
      return;
    }

    const newReminder: Reminder = {
      id: Date.now().toString(),
      name: formData.name,
      time: formData.time,
      days: formData.days,
      enabled: true,
    };

    const updated = [...reminders, newReminder];
    saveReminders(updated);
    setShowAddModal(false);
    setFormData({ name: '', time: '09:00', days: [] });
    showNotification('Напоминание добавлено', 'success');
  };

  const toggleReminder = (id: string) => {
    const updated = reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    saveReminders(updated);
    showNotification(updated.find(r => r.id === id)?.enabled ? 'Напоминание включено' : 'Напоминание выключено', 'info');
  };

  const deleteReminder = (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    saveReminders(updated);
    showNotification('Напоминание удалено', 'success');
  };

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const handleBack = () => {
    onScreenChange?.('profile');
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="text-xl">←</button>
          <h1 className="text-lg font-semibold text-gray-800">Напоминания о таблетках</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {reminders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💊</div>
            <p className="text-gray-600 mb-4">Нет напоминаний</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="bg-[#2196F3] text-white px-6 py-3 rounded-lg font-semibold"
            >
              Добавить напоминание
            </motion.button>
          </div>
        ) : (
          <>
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="glass border border-white/30 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{reminder.name}</h3>
                    <p className="text-sm text-gray-700">Время: {reminder.time}</p>
                    <div className="flex gap-1 mt-2">
                      {daysOfWeek.map(day => (
                        <span
                          key={day}
                          className={`text-xs px-2 py-1 rounded ${
                            reminder.days.includes(day)
                              ? 'bg-[#2196F3] text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => toggleReminder(reminder.id)}
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        reminder.enabled
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-700'
                      }`}
                    >
                      {reminder.enabled ? 'Вкл' : 'Выкл'}
                    </button>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="px-3 py-1 rounded text-xs font-medium bg-red-500 text-white"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="w-full bg-[#2196F3] text-white py-3 rounded-lg font-semibold"
            >
              + Добавить напоминание
            </motion.button>
          </>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass border border-white/30 rounded-2xl p-6 w-full max-w-sm bg-white"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Добавить напоминание</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Название лекарства</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Например: Аспирин"
                    className="w-full px-4 py-2 rounded-lg glass border border-white/30 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Время</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg glass border border-white/30 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Дни недели</label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map(day => (
                      <button
                        key={day}
                        onClick={() => {
                          const days = formData.days.includes(day)
                            ? formData.days.filter(d => d !== day)
                            : [...formData.days, day];
                          setFormData({ ...formData, days });
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          formData.days.includes(day)
                            ? 'bg-[#2196F3] text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
                  >
                    Отмена
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddReminder}
                    className="flex-1 bg-[#2196F3] text-white py-3 rounded-lg font-semibold"
                  >
                    Добавить
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
