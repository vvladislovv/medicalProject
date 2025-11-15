'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { showNotification } from '@/components/ui/Notification';

interface ScannerScreenProps {
  onScreenChange?: (screen: string) => void;
}

export default function ScannerScreen({ onScreenChange }: ScannerScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedText, setScannedText] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Очистка при размонтировании
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Используем заднюю камеру
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      console.error('Ошибка доступа к камере:', error);
      showNotification('Не удалось получить доступ к камере', 'error');
      // Симуляция для демо
      setTimeout(() => {
        setIsScanning(true);
        setScannedText('Рецепт успешно отсканирован! Лекарства: Аспирин, Парацетамол');
        showNotification('Рецепт успешно отсканирован', 'success');
      }, 2000);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const handleScan = () => {
    // Симуляция сканирования
    stopScanning();
    setScannedText('Рецепт успешно отсканирован! Лекарства: Аспирин, Парацетамол');
    showNotification('Рецепт успешно отсканирован', 'success');
  };

  const handleBack = () => {
    stopScanning();
    onScreenChange?.('pharmacy');
  };

  const handleConfirm = () => {
    showNotification('Заказ по рецепту оформлен', 'success');
    onScreenChange?.('pharmacy');
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="glass border-b border-white/30 px-4 py-4 bg-black/50">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="text-white text-xl">←</button>
          <h1 className="text-lg font-semibold text-white">Сканирование рецепта</h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="relative flex-1">
        {!isScanning ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="text-6xl mb-6">📷</div>
            <h2 className="text-xl font-bold text-white mb-4 text-center">
              Сканирование рецепта
            </h2>
            <p className="text-gray-300 text-center mb-8">
              Разместите рецепт в рамке и нажмите кнопку для начала сканирования
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={startScanning}
              className="bg-[#2196F3] text-white px-8 py-4 rounded-xl font-semibold text-lg"
            >
              Начать сканирование
            </motion.button>
          </div>
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-[70vh] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-4 border-white rounded-lg w-80 h-96">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white"></div>
              </div>
            </div>
            <div className="absolute bottom-20 left-0 right-0 px-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleScan}
                className="w-full bg-[#2196F3] text-white py-4 rounded-xl font-semibold text-lg mb-3"
              >
                Сканировать
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={stopScanning}
                className="w-full bg-gray-600 text-white py-4 rounded-xl font-semibold"
              >
                Отмена
              </motion.button>
            </div>
          </div>
        )}

        {scannedText && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="glass border border-white/30 rounded-2xl p-6 w-full max-w-sm bg-white"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Результат сканирования</h3>
              <div className="glass border border-white/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-900">{scannedText}</p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setScannedText(null);
                    setIsScanning(false);
                  }}
                  className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold"
                >
                  Сканировать снова
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirm}
                  className="flex-1 bg-[#2196F3] text-white py-3 rounded-lg font-semibold"
                >
                  Подтвердить
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

