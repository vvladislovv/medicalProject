'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { storage } from '@/utils/storage';

interface LoginScreenProps {
  onSignUp: () => void;
  onSuccess: () => void;
}

export default function LoginScreen({ onSignUp, onSuccess }: LoginScreenProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем существующего пользователя или создаем нового
    const existingUser = storage.getUser();
    if (existingUser && existingUser.email === formData.email) {
      storage.setUser(existingUser);
    } else {
      storage.setUser({
        id: Date.now().toString(),
        name: formData.email.split('@')[0],
        email: formData.email,
      });
    }

    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] flex flex-col">
      <div className="flex-1 px-4 py-6 flex flex-col items-center justify-center">
        {/* Doctor Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="text-8xl">👨‍⚕️</div>
          <div className="text-center mt-4">
            <div className="text-4xl mb-2">💉</div>
            <div className="text-3xl">➕</div>
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#2196F3] mb-8">Вход</h1>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              placeholder="Email Address"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#2196F3] pr-12"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div className="text-right mt-2">
              <button className="text-sm text-[#2196F3]">Забыли пароль?</button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#2196F3] text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
          >
            Войти
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6 w-full">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">или войдите через</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4 w-full">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 glass border border-white/30 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <span className="text-xl">📘</span>
            <span className="font-medium">Facebook</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 glass border border-white/30 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <span className="text-xl">🔍</span>
            <span className="font-medium">Google</span>
          </motion.button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <button
            onClick={onSignUp}
            className="text-[#2196F3] font-medium"
          >
            Нет аккаунта? Зарегистрируйтесь
          </button>
        </div>
      </div>
    </div>
  );
}

