'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getDoctorsByCity, specializations, cities } from '@/utils/data';
import { storage } from '@/utils/storage';
import { Appointment } from '@/types';
import { showNotification } from '@/components/ui/Notification';

interface AppointmentScreenProps {
  onScreenChange?: (screen: string) => void;
}

export default function AppointmentScreen({ onScreenChange }: AppointmentScreenProps) {
  const [selectedCity, setSelectedCity] = useState<string>(storage.getSelectedCity());
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('Все');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('10:00');
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCityModal, setShowCityModal] = useState(false);

  const doctors = getDoctorsByCity(selectedCity);

  useEffect(() => {
    storage.setSelectedCity(selectedCity);
  }, [selectedCity]);

  const handleBack = () => {
    onScreenChange?.('home');
  };

  const handleAppointment = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) return;

    // Устанавливаем дату по умолчанию (через 3 дня)
    const defaultDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setAppointmentDate(defaultDate);
    setSelectedDoctor(doctorId);
    setShowCalendar(true);
  };

  const confirmAppointment = () => {
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      showNotification('Пожалуйста, выберите дату и время', 'warning');
      return;
    }

    const doctor = doctors.find(d => d.id === selectedDoctor);
    if (!doctor) return;

    const appointment: Appointment = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      date: appointmentDate,
      time: appointmentTime,
      status: 'upcoming',
    };

    storage.addAppointment(appointment);
    setCreatedAppointment(appointment);
    setShowCalendar(false);
    setShowSuccessScreen(true);
    showNotification(`Запись к ${doctor.name} успешно создана!`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      {/* Header */}
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="text-xl">←</button>
            <h1 className="text-lg font-semibold text-gray-800">Запись к врачу</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCityModal(true)}
            className="flex items-center gap-2 text-[#2196F3]"
          >
            <span>📍</span>
            <span className="text-sm font-medium">{selectedCity}</span>
          </motion.button>
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
            placeholder="Поиск врача и специалиста"
            className="flex-1 bg-transparent outline-none text-sm text-gray-900"
          />
        </motion.div>

        {/* Specializations */}
        <div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {['Все', ...specializations].map((spec, index) => (
              <motion.button
                key={spec}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSpecialization(spec)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedSpecialization === spec
                    ? 'bg-[#2196F3] text-white'
                    : 'glass border border-white/30 text-gray-700'
                }`}
              >
                {spec}
              </motion.button>
            ))}
            <button className="px-4 py-2 rounded-full glass border border-white/30 text-gray-700 whitespace-nowrap">
              Показать еще
            </button>
          </div>
        </div>

        {/* Top Doctors */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Лучшие врачи</h3>
          <div className="space-y-4">
            {doctors
              .filter(doc => {
                const matchesSpecialization = selectedSpecialization === 'Все' || doc.specialization === selectedSpecialization;
                const matchesSearch = searchQuery === '' || 
                  doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesSpecialization && matchesSearch;
              })
              .map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass border border-white/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#E3F2FD] flex items-center justify-center text-3xl">
                      {doctor.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
                      <p className="text-sm text-gray-600">{doctor.specialization}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-medium">{doctor.rating}</span>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAppointment(doctor.id)}
                      className="bg-[#2196F3] text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Записаться
                    </motion.button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Calendar Modal */}
        {showCalendar && selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCalendar(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass border border-white/30 rounded-2xl p-6 w-full max-w-sm"
            >
              <h3 className="text-xl font-bold mb-4">Выберите дату и время</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Дата</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 rounded-lg glass border border-white/30 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Время</label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg glass border border-white/30 text-gray-900"
                  >
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>14:00</option>
                    <option>15:00</option>
                    <option>16:00</option>
                  </select>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmAppointment}
                  className="w-full bg-[#2196F3] text-white py-3 rounded-lg font-semibold"
                >
                  Подтвердить запись
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Success Screen */}
        {showSuccessScreen && createdAppointment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuccessScreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass border border-white/30 rounded-2xl p-6 w-full max-w-sm bg-white"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <span className="text-4xl">✅</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Запись подтверждена!</h3>
                <p className="text-sm text-gray-600">Ваша запись успешно создана</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Врач</p>
                  <p className="font-semibold text-gray-900">{createdAppointment.doctorName}</p>
                  <p className="text-sm text-gray-700">{createdAppointment.specialization}</p>
                </div>
                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Дата и время</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(createdAppointment.date).toLocaleDateString('ru-RU', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-gray-700">Время: {createdAppointment.time}</p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSuccessScreen(false)}
                className="w-full bg-[#2196F3] text-white py-3 rounded-lg font-semibold"
              >
                Отлично
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* City Selection Modal */}
        <AnimatePresence>
          {showCityModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCityModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass border border-white/30 rounded-2xl p-6 w-full max-w-sm bg-white max-h-[80vh] overflow-y-auto"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Выберите город</h3>
                <div className="space-y-2">
                  {cities.map((city) => (
                    <motion.button
                      key={city}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowCityModal(false);
                        showNotification(`Город изменен на ${city}`, 'success');
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        selectedCity === city
                          ? 'bg-[#2196F3] text-white'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{city}</span>
                        {selectedCity === city && <span>✓</span>}
                      </div>
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCityModal(false)}
                  className="w-full mt-4 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
                >
                  Отмена
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

