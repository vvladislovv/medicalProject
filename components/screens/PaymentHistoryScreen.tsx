'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { showNotification } from '@/components/ui/Notification';

interface PaymentHistoryScreenProps {
  onScreenChange?: (screen: string) => void;
}

interface Payment {
  id: string;
  date: string;
  amount: string;
  service: string;
  status: string;
  method?: string;
  orderNumber?: string;
}

export default function PaymentHistoryScreen({ onScreenChange }: PaymentHistoryScreenProps) {
  const handleBack = () => {
    onScreenChange?.('profile');
  };
  const [payments] = useState<Payment[]>([
    { 
      id: '1', 
      date: '25.11.2024', 
      amount: '2 450 ₽', 
      service: 'Заказ лекарств', 
      status: 'Оплачено',
      method: 'Банковская карта',
      orderNumber: '#1234'
    },
    { 
      id: '2', 
      date: '20.11.2024', 
      amount: '1 500 ₽', 
      service: 'Консультация', 
      status: 'Оплачено',
      method: 'Банковская карта',
      orderNumber: '#1235'
    },
    { 
      id: '3', 
      date: '15.11.2024', 
      amount: '800 ₽', 
      service: 'Анализы', 
      status: 'Оплачено',
      method: 'Банковская карта',
      orderNumber: '#1236'
    },
  ]);

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleGetReceipt = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowReceipt(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="text-xl">←</button>
          <h1 className="text-lg font-semibold text-gray-800">История платежей</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {payments.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            className="glass border border-white/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{payment.service}</h3>
                <p className="text-sm text-gray-700">Дата: {payment.date}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{payment.amount}</p>
                <span className="text-xs text-green-600 font-medium">{payment.status}</span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGetReceipt(payment)}
              className="w-full bg-[#2196F3] text-white py-2 rounded-lg text-sm font-medium"
            >
              Получить чек
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Receipt Modal */}
      <AnimatePresence>
        {showReceipt && selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowReceipt(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass border border-white/30 rounded-2xl p-6 w-full max-w-sm bg-white max-h-[80vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Чек об оплате</h3>
                <p className="text-sm text-gray-600">CareSync</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Номер заказа</p>
                  <p className="font-semibold text-gray-900">{selectedPayment.orderNumber}</p>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Услуга</p>
                  <p className="font-semibold text-gray-900">{selectedPayment.service}</p>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Дата оплаты</p>
                  <p className="font-semibold text-gray-900">{selectedPayment.date}</p>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Способ оплаты</p>
                  <p className="font-semibold text-gray-900">{selectedPayment.method}</p>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3 bg-blue-50">
                  <p className="text-xs text-gray-600 mb-1">Сумма</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPayment.amount}</p>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Статус</p>
                  <p className="font-semibold text-green-600">{selectedPayment.status}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowReceipt(false)}
                  className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
                >
                  Закрыть
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    showNotification('Чек отправлен на email', 'success');
                    setShowReceipt(false);
                  }}
                  className="flex-1 bg-[#2196F3] text-white py-3 rounded-lg font-semibold"
                >
                  Отправить
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
