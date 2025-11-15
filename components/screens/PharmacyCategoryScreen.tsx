'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { showNotification } from '@/components/ui/Notification';

interface PharmacyCategoryScreenProps {
  onScreenChange?: (screen: string) => void;
  categoryId?: string;
  categoryName?: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: number;
  description: string;
  inStock: boolean;
  image?: string;
}

export default function PharmacyCategoryScreen({ onScreenChange, categoryId, categoryName }: PharmacyCategoryScreenProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Моковые данные товаров для разных категорий
  const getProductsByCategory = (catId?: string): Product[] => {
    const allProducts: Record<string, Product[]> = {
      '1': [ // Уход за волосами
        { id: 'p1', name: 'Шампунь для волос', price: '450 ₽', originalPrice: '550 ₽', discount: 18, description: 'Укрепляющий шампунь для всех типов волос', inStock: true },
        { id: 'p2', name: 'Бальзам для волос', price: '380 ₽', description: 'Восстанавливающий бальзам', inStock: true },
        { id: 'p3', name: 'Маска для волос', price: '650 ₽', description: 'Питательная маска', inStock: true },
        { id: 'p4', name: 'Масло для волос', price: '520 ₽', description: 'Увлажняющее масло', inStock: true },
      ],
      '2': [ // Уход за кожей
        { id: 'p5', name: 'Крем для лица', price: '890 ₽', description: 'Увлажняющий крем для всех типов кожи', inStock: true },
        { id: 'p6', name: 'Сыворотка', price: '1200 ₽', description: 'Антивозрастная сыворотка', inStock: true },
        { id: 'p7', name: 'Тоник для лица', price: '450 ₽', description: 'Очищающий тоник', inStock: true },
        { id: 'p8', name: 'Солнцезащитный крем', price: '680 ₽', description: 'SPF 50+', inStock: true },
      ],
      '3': [ // Детский уход
        { id: 'p9', name: 'Детский крем', price: '320 ₽', description: 'Нежный крем для детей', inStock: true },
        { id: 'p10', name: 'Детский шампунь', price: '280 ₽', description: 'Безопасный шампунь для детей', inStock: true },
        { id: 'p11', name: 'Детское мыло', price: '150 ₽', description: 'Гипоаллергенное мыло', inStock: true },
        { id: 'p12', name: 'Детский крем от опрелостей', price: '250 ₽', description: 'Защитный крем', inStock: true },
      ],
      '4': [ // Здоровье полости рта
        { id: 'p13', name: 'Зубная паста', price: '180 ₽', description: 'Отбеливающая паста', inStock: true },
        { id: 'p14', name: 'Зубная щетка', price: '120 ₽', description: 'Мягкая щетина', inStock: true },
        { id: 'p15', name: 'Ополаскиватель', price: '250 ₽', description: 'Антибактериальный', inStock: true },
        { id: 'p16', name: 'Зубная нить', price: '95 ₽', description: 'Фторсодержащая', inStock: true },
      ],
      '5': [ // Простуда и кашель
        { id: 'p17', name: 'Парацетамол', price: '120 ₽', description: 'Жаропонижающее средство', inStock: true },
        { id: 'p18', name: 'Ибупрофен', price: '180 ₽', description: 'Противовоспалительное средство', inStock: true },
        { id: 'p19', name: 'Сироп от кашля', price: '250 ₽', description: 'Отхаркивающий сироп', inStock: true },
        { id: 'p20', name: 'Спрей для горла', price: '220 ₽', description: 'Антисептический спрей', inStock: true },
      ],
      '6': [ // БАДы
        { id: 'p21', name: 'Витамин D', price: '450 ₽', description: 'Витамин D3 2000 МЕ', inStock: true },
        { id: 'p22', name: 'Омега-3', price: '680 ₽', description: 'Рыбий жир', inStock: true },
        { id: 'p23', name: 'Магний', price: '320 ₽', description: 'Магний B6', inStock: true },
        { id: 'p24', name: 'Витамин C', price: '280 ₽', description: 'Аскорбиновая кислота', inStock: true },
      ],
      '7': [ // Обезболивающие
        { id: 'p25', name: 'Анальгин', price: '95 ₽', description: 'Обезболивающее средство', inStock: true },
        { id: 'p26', name: 'Но-шпа', price: '220 ₽', description: 'Спазмолитик', inStock: true },
        { id: 'p27', name: 'Кеторол', price: '180 ₽', description: 'Сильное обезболивающее', inStock: true },
        { id: 'p28', name: 'Нурофен', price: '250 ₽', description: 'Обезболивающее и жаропонижающее', inStock: true },
      ],
      '8': [ // Желудочные средства
        { id: 'p29', name: 'Мезим', price: '320 ₽', description: 'Ферментный препарат', inStock: true },
        { id: 'p30', name: 'Омепразол', price: '180 ₽', description: 'От изжоги', inStock: true },
        { id: 'p31', name: 'Активированный уголь', price: '85 ₽', description: 'Адсорбент', inStock: true },
        { id: 'p32', name: 'Смекта', price: '220 ₽', description: 'От диареи', inStock: true },
      ],
    };

    return allProducts[catId || '1'] || allProducts['1'];
  };

  const products = getProductsByCategory(categoryId);

  const handleBack = () => {
    onScreenChange?.('pharmacy');
  };

  const handleAddToCart = (product: Product) => {
    showNotification(`${product.name} добавлен в корзину`, 'success');
  };

  const handleOrder = () => {
    if (!selectedProduct) return;
    const total = parseFloat(selectedProduct.price.replace(/[^\d]/g, '')) * quantity;
    showNotification(`Заказ на сумму ${total} ₽ оформлен!`, 'success');
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="text-xl">←</button>
          <h1 className="text-lg font-semibold text-gray-800">{categoryName || 'Категория'}</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            className="glass border border-white/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                💊
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                      {product.discount && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          -{product.discount}%
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 bg-[#2196F3] text-white py-2 rounded-lg text-sm font-medium"
                  >
                    Подробнее
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium"
                  >
                    В корзину
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass border border-white/30 rounded-2xl p-6 w-full max-w-sm bg-white max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-2xl text-gray-500"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <div className="w-full h-32 rounded-lg bg-gray-100 flex items-center justify-center text-4xl mb-4">
                  💊
                </div>
                <p className="text-sm text-gray-700 mb-4">{selectedProduct.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <>
                      <span className="text-sm text-gray-400 line-through">{selectedProduct.originalPrice}</span>
                      {selectedProduct.discount && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          -{selectedProduct.discount}%
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-600">Количество:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Итого:</p>
                  <p className="text-xl font-bold text-gray-900">
                    {parseFloat(selectedProduct.price.replace(/[^\d]/g, '')) * quantity} ₽
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold"
                >
                  В корзину
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOrder}
                  className="flex-1 bg-[#2196F3] text-white py-3 rounded-lg font-semibold"
                >
                  Заказать
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

