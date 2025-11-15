'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { storage } from '@/utils/storage';

interface SignUpScreenProps {
  onSuccess: () => void;
}

export default function SignUpScreen({ onSuccess }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    if (!formData.agreeToTerms) {
      alert('Необходимо согласиться с условиями');
      return;
    }

    // Сохраняем пользователя
    storage.setUser({
      id: Date.now().toString(),
      name: formData.email.split('@')[0],
      email: formData.email,
    });

    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] flex flex-col">
      {/* Header */}
      <div className="bg-[#E3F2FD] px-4 py-6">
        <h1 className="text-2xl font-bold text-[#1976D2]">Sign up</h1>
      </div>

      <div className="flex-1 px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#2196F3]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#2196F3] pr-12"
                placeholder="Enter your password"
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
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#2196F3] pr-12"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-[#2196F3] focus:ring-[#2196F3]"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I agree with Privacy and Policy
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#2196F3] text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
          >
            Sign up
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or Sign up with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4">
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
      </div>
    </div>
  );
}

