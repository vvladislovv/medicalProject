'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { showNotification } from '@/components/ui/Notification';

interface ReportsListScreenProps {
  onScreenChange?: (screen: string) => void;
}

interface Report {
  id: string;
  name: string;
  date: string;
  doctor: string;
  conclusion?: string;
  recommendations?: string[];
}

export default function ReportsListScreen({ onScreenChange }: ReportsListScreenProps) {
  const [reports] = useState<Report[]>([
    { 
      id: '1', 
      name: 'Результаты обследования', 
      date: '20.11.2024', 
      doctor: 'Др. Амит Кумар',
      conclusion: 'Общее состояние удовлетворительное. Все показатели в пределах нормы.',
      recommendations: [
        'Продолжить текущий режим питания',
        'Повторить обследование через 6 месяцев',
        'Принимать витамины группы B'
      ]
    },
    { 
      id: '2', 
      name: 'Заключение кардиолога', 
      date: '18.11.2024', 
      doctor: 'Др. Адити Сингх',
      conclusion: 'Сердечно-сосудистая система в норме. ЭКГ без патологий.',
      recommendations: [
        'Регулярные физические нагрузки',
        'Контроль артериального давления',
        'Соблюдение диеты с низким содержанием соли'
      ]
    },
    { 
      id: '3', 
      name: 'Результаты УЗИ', 
      date: '12.11.2024', 
      doctor: 'Др. Рохит Раджпут',
      conclusion: 'Ультразвуковое исследование не выявило патологических изменений.',
      recommendations: [
        'Плановое обследование через год',
        'При появлении симптомов обратиться к врачу'
      ]
    },
  ]);

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleBack = () => {
    onScreenChange?.('reports');
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      {/* Header */}
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="text-xl">←</button>
          <h1 className="text-lg font-semibold text-gray-800">Мои отчеты</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            className="glass border border-white/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{report.name}</h3>
                <p className="text-sm text-gray-600">Дата: {report.date}</p>
                <p className="text-sm text-gray-600">Врач: {report.doctor}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedReport(report);
                  showNotification(`Открыт: ${report.name}`, 'success');
                }}
                className="bg-[#2196F3] text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Открыть
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Report Details Modal */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass border border-white/30 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedReport.name}</h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-2xl text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4 space-y-2">
                <p className="text-sm text-gray-800">Дата: {selectedReport.date}</p>
                <p className="text-sm text-gray-800">Врач: {selectedReport.doctor}</p>
              </div>

              {selectedReport.conclusion && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Заключение:</h4>
                  <p className="text-sm text-gray-900 glass border border-white/30 rounded-lg p-3">
                    {selectedReport.conclusion}
                  </p>
                </div>
              )}

              {selectedReport.recommendations && selectedReport.recommendations.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Рекомендации:</h4>
                  <ul className="space-y-2">
                    {selectedReport.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-900 flex items-start gap-2">
                        <span className="text-[#2196F3]">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedReport(null)}
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

