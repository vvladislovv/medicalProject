'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onNext: () => void;
}

export default function SplashScreen({ onNext }: SplashScreenProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    const redirectTimer = setTimeout(() => {
      onNext();
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [onNext]);

  return (
    <div className="min-h-screen bg-[#2196F3] flex items-center justify-center relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.8 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center z-10"
      >
        {/* Логотип - стетоскоп в форме сердца */}
        <motion.div
          className="relative mb-6"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="text-white text-8xl">❤️</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-6xl">🩺</div>
          </div>
        </motion.div>

        {/* Название */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: showContent ? 0 : 20, opacity: showContent ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-white text-4xl font-bold mb-2"
        >
          CareSync
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: showContent ? 0 : 20, opacity: showContent ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-white/90 text-lg"
        >
          All in One App
        </motion.p>
      </motion.div>
    </div>
  );
}

