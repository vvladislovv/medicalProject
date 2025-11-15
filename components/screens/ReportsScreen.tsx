'use client';

import { motion } from 'framer-motion';

interface ReportsScreenProps {
  onScreenChange?: (screen: string) => void;
}

export default function ReportsScreen({ onScreenChange }: ReportsScreenProps) {
  return (
    <div className="min-h-screen bg-[#F5F9FC] pb-20">
      {/* Header */}
      <div className="glass border-b border-white/30 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onScreenChange?.('home')} className="text-xl">←</button>
          <h1 className="text-lg font-semibold text-gray-800">Анализы и отчеты</h1>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col items-center justify-center min-h-[60vh]">
        {/* Main Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-8xl">📄</div>
          <div className="text-center mt-4 text-4xl">➕</div>
        </motion.div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-4">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onScreenChange?.('lab-tests')}
            className="w-full glass border border-[#2196F3] border-2 rounded-xl p-6 flex items-center justify-between bg-gradient-to-r from-[#2196F3]/10 to-[#E3F2FD]/10"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">🔬</div>
              <span className="text-lg font-semibold text-gray-800">Анализы</span>
            </div>
            <span className="text-2xl">→</span>
          </motion.button>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onScreenChange?.('reports-list')}
            className="w-full glass border border-white/30 rounded-xl p-6 flex items-center justify-between bg-gradient-to-r from-[#2196F3]/10 to-[#E3F2FD]/10"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">📋</div>
              <span className="text-lg font-semibold text-gray-800">Отчеты</span>
            </div>
            <span className="text-2xl">→</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

