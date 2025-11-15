'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { showNotification } from '@/components/ui/Notification';

interface ConsultationsScreenProps {
  onScreenChange?: (screen: string) => void;
}

interface Consultation {
  id: string;
  doctor: string;
  date: string;
  type: string;
  status: string;
  duration?: string;
  topic?: string;
  notes?: string;
}

export default function ConsultationsScreen({ onScreenChange }: ConsultationsScreenProps) {
  const handleBack = () => {
    onScreenChange?.('profile');
  };
  const [consultations] = useState<Consultation[]>([
    { 
      id: '1', 
      doctor: 'Др. Амит Кумар', 
      date: '20.11.2024', 
      type: 'Онлайн', 
      status: 'Завершена',
      duration: '30 минут',
      topic: 'Общее обследование',
      notes: 'Консультация прошла успешно. Рекомендации по лечению предоставлены.'
    },
    { 
      id: '2', 
      doctor: 'Др. Адити Сингх', 
      date: '18.11.2024', 
      type: 'Видео', 
      status: 'Завершена',
      duration: '45 минут',
      topic: 'Кардиологическое обследование',
      notes: 'Обсуждены результаты анализов. Назначено дополнительное обследование.'
    },
    { 
      id: '3', 
      doctor: 'Др. Рохит Раджпут', 
      date: '15.11.2024', 
      type: 'Чат', 
      status: 'В процессе',
      duration: '20 минут',
      topic: 'Консультация по симптомам',
      notes: 'Консультация продолжается. Врач отвечает на вопросы.'
    },
  ]);

  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  const handleOpen = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    showNotification(`Открыта консультация с ${consultation.doctor}`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="text-xl">←</button>
          <h1 className="text-lg font-semibold text-gray-800">Мои консультации</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {consultations.map((consultation, index) => (
          <motion.div
            key={consultation.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            className="glass border border-white/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{consultation.doctor}</h3>
                <p className="text-sm text-gray-700">Дата: {consultation.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                consultation.status === 'Завершена' ? 'bg-green-100 text-green-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {consultation.status}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOpen(consultation)}
              className="w-full bg-[#2196F3] text-white py-2 rounded-lg text-sm font-medium"
            >
              Открыть
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Consultation Details Modal */}
      <AnimatePresence>
        {selectedConsultation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedConsultation(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass border border-white/30 rounded-2xl p-6 w-full max-w-sm bg-white max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Детали консультации</h3>
                <button
                  onClick={() => setSelectedConsultation(null)}
                  className="text-2xl text-gray-500"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Врач</p>
                  <p className="font-semibold text-gray-900">{selectedConsultation.doctor}</p>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Дата</p>
                  <p className="font-semibold text-gray-900">{selectedConsultation.date}</p>
                </div>


                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Длительность</p>
                  <p className="font-semibold text-gray-900">{selectedConsultation.duration}</p>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Тема</p>
                  <p className="font-semibold text-gray-900">{selectedConsultation.topic}</p>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Статус</p>
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium inline-block ${
                    selectedConsultation.status === 'Завершена' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedConsultation.status}
                  </span>
                </div>

                {selectedConsultation.notes && (
                  <div className="glass border border-white/30 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Примечания</p>
                    <p className="text-sm text-gray-900">{selectedConsultation.notes}</p>
                  </div>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedConsultation(null)}
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
