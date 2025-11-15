'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { showNotification } from '@/components/ui/Notification';

interface OrdersScreenProps {
  onScreenChange?: (screen: string) => void;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  items: string[];
  address?: string;
  deliveryDate?: string;
  paymentMethod?: string;
}

export default function OrdersScreen({ onScreenChange }: OrdersScreenProps) {
  const handleBack = () => {
    onScreenChange?.('profile');
  };
  const [orders] = useState<Order[]>([
    { 
      id: '1', 
      date: '25.11.2024', 
      status: 'Доставлен', 
      total: '2 450 ₽', 
      items: ['Аспирин', 'Парацетамол'],
      address: 'г. Москва, ул. Ленина, д. 10, кв. 5',
      deliveryDate: '25.11.2024',
      paymentMethod: 'Банковская карта'
    },
    { 
      id: '2', 
      date: '20.11.2024', 
      status: 'В пути', 
      total: '1 890 ₽', 
      items: ['Витамины', 'Кальций'],
      address: 'г. Москва, ул. Ленина, д. 10, кв. 5',
      deliveryDate: '22.11.2024',
      paymentMethod: 'Банковская карта'
    },
    { 
      id: '3', 
      date: '15.11.2024', 
      status: 'Доставлен', 
      total: '3 200 ₽', 
      items: ['Антибиотики'],
      address: 'г. Москва, ул. Ленина, д. 10, кв. 5',
      deliveryDate: '15.11.2024',
      paymentMethod: 'Банковская карта'
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleDetails = (order: Order) => {
    setSelectedOrder(order);
    showNotification(`Детали заказа #${order.id}`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="text-xl">←</button>
          <h1 className="text-lg font-semibold text-gray-800">Мои заказы</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            className="glass border border-white/30 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600">Заказ #{order.id}</p>
                <p className="text-sm text-gray-600">Дата: {order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                order.status === 'Доставлен' ? 'bg-green-100 text-green-700' :
                order.status === 'В пути' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-700 mb-1">Товары: {order.items.join(', ')}</p>
              <p className="text-lg font-bold text-gray-900">Итого: {order.total}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDetails(order)}
              className="w-full bg-[#2196F3] text-white py-2 rounded-lg text-sm font-medium"
            >
              Подробнее
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass border border-white/30 rounded-2xl p-6 w-full max-w-sm bg-white max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Детали заказа</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-2xl text-gray-500"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Номер заказа</p>
                  <p className="font-semibold text-gray-900">#{selectedOrder.id}</p>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Дата заказа</p>
                  <p className="font-semibold text-gray-900">{selectedOrder.date}</p>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Статус</p>
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium inline-block ${
                    selectedOrder.status === 'Доставлен' ? 'bg-green-100 text-green-700' :
                    selectedOrder.status === 'В пути' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedOrder.status}
                  </span>
                </div>

                <div className="glass border border-white/30 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Товары</p>
                  <ul className="space-y-1">
                    {selectedOrder.items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-900">• {item}</li>
                    ))}
                  </ul>
                </div>

                {selectedOrder.address && (
                  <div className="glass border border-white/30 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Адрес доставки</p>
                    <p className="text-sm text-gray-900">{selectedOrder.address}</p>
                  </div>
                )}

                {selectedOrder.deliveryDate && (
                  <div className="glass border border-white/30 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Дата доставки</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.deliveryDate}</p>
                  </div>
                )}

                {selectedOrder.paymentMethod && (
                  <div className="glass border border-white/30 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Способ оплаты</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.paymentMethod}</p>
                  </div>
                )}

                <div className="glass border border-white/30 rounded-lg p-3 bg-blue-50">
                  <p className="text-xs text-gray-600 mb-1">Итого</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedOrder.total}</p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedOrder(null)}
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
