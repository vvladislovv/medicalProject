'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { showNotification } from '@/components/ui/Notification';

interface FamilyMembersScreenProps {
  onScreenChange?: (screen: string) => void;
}

interface FamilyMember {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  relation: string;
  phone?: string;
  email?: string;
  bloodType?: string;
  allergies?: string[];
  chronicDiseases?: string[];
}

const FAMILY_MEMBERS_KEY = 'caresync_family_members';

export default function FamilyMembersScreen({ onScreenChange }: FamilyMembersScreenProps) {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male' as 'Male' | 'Female',
    relation: '',
    phone: '',
    email: '',
    bloodType: '',
    allergies: '',
    chronicDiseases: '',
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = () => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem(FAMILY_MEMBERS_KEY);
    if (saved) {
      setMembers(JSON.parse(saved));
    }
  };

  const saveMembers = (newMembers: FamilyMember[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(FAMILY_MEMBERS_KEY, JSON.stringify(newMembers));
    setMembers(newMembers);
  };

  const handleAddMember = () => {
    if (!formData.name || !formData.age || !formData.relation) {
      showNotification('Заполните обязательные поля', 'warning');
      return;
    }

    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      relation: formData.relation,
      phone: formData.phone || undefined,
      email: formData.email || undefined,
      bloodType: formData.bloodType || undefined,
      allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : [],
      chronicDiseases: formData.chronicDiseases ? formData.chronicDiseases.split(',').map(d => d.trim()) : [],
    };

    const updated = [...members, newMember];
    saveMembers(updated);
    setShowAddModal(false);
    setFormData({
      name: '',
      age: '',
      gender: 'Male',
      relation: '',
      phone: '',
      email: '',
      bloodType: '',
      allergies: '',
      chronicDiseases: '',
    });
    showNotification('Член семьи добавлен', 'success');
  };

  const handleDeleteMember = (id: string) => {
    const updated = members.filter(m => m.id !== id);
    saveMembers(updated);
    showNotification('Член семьи удален', 'success');
  };

  const handleBack = () => {
    onScreenChange?.('profile');
  };

  const relations = ['Супруг(а)', 'Ребенок', 'Родитель', 'Брат/Сестра', 'Другой родственник'];

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="text-xl">←</button>
            <h1 className="text-lg font-semibold text-gray-800">Члены семьи</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="text-[#2196F3] text-sm font-medium"
          >
            + Добавить
          </motion.button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {members.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-gray-600 mb-4">Нет добавленных членов семьи</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="bg-[#2196F3] text-white px-6 py-3 rounded-lg font-semibold"
            >
              Добавить члена семьи
            </motion.button>
          </div>
        ) : (
          members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="glass border border-white/30 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-full bg-[#2196F3] flex items-center justify-center text-white text-xl font-bold">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-700">{member.relation}</p>
                    <p className="text-sm text-gray-600">
                      {member.age} лет, {member.gender === 'Male' ? 'Мужской' : 'Женский'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMember(member)}
                    className="px-3 py-1 bg-[#2196F3] text-white rounded-lg text-xs font-medium"
                  >
                    Подробнее
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteMember(member.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs font-medium"
                  >
                    Удалить
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Member Modal */}
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
              className="glass border border-white/30 rounded-2xl p-6 w-full max-w-sm bg-white max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Добавить члена семьи</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">
                    Имя <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Введите имя"
                    className="w-full px-4 py-2 rounded-lg glass border border-white/30 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">
                    Возраст <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Введите возраст"
                    className="w-full px-4 py-2 rounded-lg glass border border-white/30 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">
                    Пол <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setFormData({ ...formData, gender: 'Male' })}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                        formData.gender === 'Male'
                          ? 'bg-[#2196F3] text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Мужской
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, gender: 'Female' })}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                        formData.gender === 'Female'
                          ? 'bg-[#2196F3] text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Женский
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">
                    Родство <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg glass border border-white/30 text-gray-900"
                  >
                    <option value="">Выберите родство</option>
                    {relations.map(rel => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Телефон</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                    className="w-full px-4 py-2 rounded-lg glass border border-white/30 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2 rounded-lg glass border border-white/30 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Группа крови</label>
                  <select
                    value={formData.bloodType}
                    onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg glass border border-white/30 text-gray-900"
                  >
                    <option value="">Не указано</option>
                    <option value="I (O)">I (O)</option>
                    <option value="II (A)">II (A)</option>
                    <option value="III (B)">III (B)</option>
                    <option value="IV (AB)">IV (AB)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Аллергии</label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    placeholder="Через запятую (например: пыльца, арахис)"
                    className="w-full px-4 py-2 rounded-lg glass border border-white/30 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Хронические заболевания</label>
                  <input
                    type="text"
                    value={formData.chronicDiseases}
                    onChange={(e) => setFormData({ ...formData, chronicDiseases: e.target.value })}
                    placeholder="Через запятую (например: диабет, гипертония)"
                    className="w-full px-4 py-2 rounded-lg glass border border-white/30 text-gray-900"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
                  >
                    Отмена
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddMember}
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

      {/* Member Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass border border-white/30 rounded-2xl p-6 w-full max-w-sm bg-white max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Детали</h3>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-2xl text-gray-500"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#2196F3] flex items-center justify-center text-white text-2xl font-bold">
                    {selectedMember.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{selectedMember.name}</h4>
                    <p className="text-sm text-gray-600">{selectedMember.relation}</p>
                  </div>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Возраст</p>
                  <p className="font-semibold text-gray-900">{selectedMember.age} лет</p>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Пол</p>
                  <p className="font-semibold text-gray-900">
                    {selectedMember.gender === 'Male' ? 'Мужской' : 'Женский'}
                  </p>
                </div>

                {selectedMember.phone && (
                  <div className="glass border border-white/30 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Телефон</p>
                    <p className="font-semibold text-gray-900">{selectedMember.phone}</p>
                  </div>
                )}

                {selectedMember.email && (
                  <div className="glass border border-white/30 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Email</p>
                    <p className="font-semibold text-gray-900">{selectedMember.email}</p>
                  </div>
                )}

                {selectedMember.bloodType && (
                  <div className="glass border border-white/30 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Группа крови</p>
                    <p className="font-semibold text-gray-900">{selectedMember.bloodType}</p>
                  </div>
                )}

                {selectedMember.allergies && selectedMember.allergies.length > 0 && (
                  <div className="glass border border-white/30 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Аллергии</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.allergies.map((allergy, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMember.chronicDiseases && selectedMember.chronicDiseases.length > 0 && (
                  <div className="glass border border-white/30 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Хронические заболевания</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.chronicDiseases.map((disease, index) => (
                        <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                          {disease}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMember(null)}
                className="w-full mt-4 bg-[#2196F3] text-white py-3 rounded-lg font-semibold"
              >
                Закрыть
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

