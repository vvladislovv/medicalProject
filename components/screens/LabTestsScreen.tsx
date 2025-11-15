'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { showNotification } from '@/components/ui/Notification';

interface LabTestsScreenProps {
  onScreenChange?: (screen: string) => void;
}

interface Test {
  id: string;
  name: string;
  date: string;
  status: string;
  results?: {
    parameter: string;
    value: string;
    norm: string;
  }[];
}

export default function LabTestsScreen({ onScreenChange }: LabTestsScreenProps) {
  const [tests] = useState<Test[]>([
    { 
      id: '1', 
      name: 'Общий анализ крови', 
      date: '15.11.2024', 
      status: 'Готов',
      results: [
        { parameter: 'Гемоглобин', value: '145 г/л', norm: '130-160 г/л' },
        { parameter: 'Эритроциты', value: '4.8 × 10¹²/л', norm: '4.0-5.5 × 10¹²/л' },
        { parameter: 'Лейкоциты', value: '6.2 × 10⁹/л', norm: '4.0-9.0 × 10⁹/л' },
        { parameter: 'Тромбоциты', value: '250 × 10⁹/л', norm: '180-320 × 10⁹/л' },
      ]
    },
    { 
      id: '2', 
      name: 'Биохимический анализ', 
      date: '10.11.2024', 
      status: 'Готов',
      results: [
        { parameter: 'Глюкоза', value: '5.2 ммоль/л', norm: '3.9-6.1 ммоль/л' },
        { parameter: 'Холестерин', value: '5.1 ммоль/л', norm: '< 5.2 ммоль/л' },
        { parameter: 'АЛТ', value: '25 Ед/л', norm: '< 41 Ед/л' },
        { parameter: 'АСТ', value: '28 Ед/л', norm: '< 37 Ед/л' },
      ]
    },
    { 
      id: '3', 
      name: 'Анализ мочи', 
      date: '05.11.2024', 
      status: 'Готов',
      results: [
        { parameter: 'Цвет', value: 'Соломенно-желтый', norm: 'Соломенно-желтый' },
        { parameter: 'Прозрачность', value: 'Прозрачная', norm: 'Прозрачная' },
        { parameter: 'Белок', value: '0.0 г/л', norm: '< 0.033 г/л' },
        { parameter: 'Глюкоза', value: '0.0 ммоль/л', norm: '0.0 ммоль/л' },
      ]
    },
  ]);

  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  const handleBack = () => {
    onScreenChange?.('reports');
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      {/* Header */}
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="text-xl">←</button>
          <h1 className="text-lg font-semibold text-gray-800">Мои анализы</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {tests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            className="glass border border-white/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{test.name}</h3>
                <p className="text-sm text-gray-600">Дата: {test.date}</p>
                <p className="text-sm text-[#2196F3] font-medium mt-1">{test.status}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedTest(test);
                  showNotification(`Открыт: ${test.name}`, 'success');
                }}
                className="bg-[#2196F3] text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Открыть
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Test Details Modal */}
      <AnimatePresence>
        {selectedTest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedTest(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass border border-white/30 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedTest.name}</h3>
                <button
                  onClick={() => setSelectedTest(null)}
                  className="text-2xl text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-800 mb-2">Дата: {selectedTest.date}</p>
                <p className="text-sm text-[#2196F3] font-medium">Статус: {selectedTest.status}</p>
              </div>

              {selectedTest.results && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 mb-3">Результаты:</h4>
                  {selectedTest.results.map((result, index) => (
                    <div
                      key={index}
                      className="glass border border-white/30 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-900">{result.parameter}</span>
                        <span className="text-sm text-[#2196F3] font-semibold">{result.value}</span>
                      </div>
                      <p className="text-xs text-gray-700">Норма: {result.norm}</p>
                    </div>
                  ))}
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTest(null)}
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

