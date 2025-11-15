'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storage } from '@/utils/storage';
import HomeScreen from '@/components/screens/HomeScreen';
import PharmacyScreen from '@/components/screens/PharmacyScreen';
import AppointmentScreen from '@/components/screens/AppointmentScreen';
import ReportsScreen from '@/components/screens/ReportsScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import LabTestsScreen from '@/components/screens/LabTestsScreen';
import ReportsListScreen from '@/components/screens/ReportsListScreen';
import PillReminderScreen from '@/components/screens/PillReminderScreen';
import OrdersScreen from '@/components/screens/OrdersScreen';
import ConsultationsScreen from '@/components/screens/ConsultationsScreen';
import PaymentHistoryScreen from '@/components/screens/PaymentHistoryScreen';
import SettingsScreen from '@/components/screens/SettingsScreen';
import NotificationsScreen from '@/components/screens/NotificationsScreen';
import FamilyMembersScreen from '@/components/screens/FamilyMembersScreen';
import EditProfileScreen from '@/components/screens/EditProfileScreen';
import PharmacyCategoryScreen from '@/components/screens/PharmacyCategoryScreen';
import ScannerScreen from '@/components/screens/ScannerScreen';
import BottomNavigation from '@/components/navigation/BottomNavigation';
import NotificationContainer from '@/components/ui/Notification';
import { pharmacyCategories } from '@/utils/data';
import { Screen } from '@/types';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen | string>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Создаем дефолтного пользователя если его нет
    if (!storage.getUser()) {
      storage.setUser({
        id: '1',
        name: 'User',
        email: 'user@example.com',
        age: 25,
        gender: 'Male',
      });
    }

    // Проверяем сохраненный экран
    const savedScreen = storage.getCurrentScreen();
    if (savedScreen && ['home', 'pharmacy', 'appointment', 'reports', 'profile'].includes(savedScreen)) {
      setCurrentScreen(savedScreen as Screen);
    } else {
      setCurrentScreen('home');
      storage.setCurrentScreen('home');
    }

    setIsLoading(false);
  }, []);

  const handleScreenChange = (screen: Screen | string) => {
    setCurrentScreen(screen);
    if (['home', 'pharmacy', 'appointment', 'reports', 'profile'].includes(screen)) {
      storage.setCurrentScreen(screen);
    }
  };

  if (isLoading) {
    return null;
  }

  const showBottomNav = ['home', 'pharmacy', 'appointment', 'reports', 'profile'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#F5F9FC] relative overflow-hidden">
      <NotificationContainer />
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <HomeScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'pharmacy' && (
          <motion.div
            key="pharmacy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PharmacyScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'appointment' && (
          <motion.div
            key="appointment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AppointmentScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'reports' && (
          <motion.div
            key="reports"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ReportsScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'lab-tests' && (
          <motion.div
            key="lab-tests"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <LabTestsScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'reports-list' && (
          <motion.div
            key="reports-list"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <ReportsListScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'pill-reminder' && (
          <motion.div
            key="pill-reminder"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <PillReminderScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'orders' && (
          <motion.div
            key="orders"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <OrdersScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'consultations' && (
          <motion.div
            key="consultations"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <ConsultationsScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'payment-history' && (
          <motion.div
            key="payment-history"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <PaymentHistoryScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <SettingsScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'notifications' && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <NotificationsScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'family-members' && (
          <motion.div
            key="family-members"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <FamilyMembersScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen === 'edit-profile' && (
          <motion.div
            key="edit-profile"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <EditProfileScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}

        {currentScreen?.toString().startsWith('pharmacy-category-') && (
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <PharmacyCategoryScreen
              onScreenChange={handleScreenChange}
              categoryId={currentScreen.toString().replace('pharmacy-category-', '')}
              categoryName={(() => {
                const catId = currentScreen.toString().replace('pharmacy-category-', '');
                const category = pharmacyCategories.find((c) => c.id === catId);
                return category?.name || 'Категория';
              })()}
            />
          </motion.div>
        )}

        {currentScreen === 'scanner' && (
          <motion.div
            key="scanner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ScannerScreen onScreenChange={handleScreenChange} />
          </motion.div>
        )}
      </AnimatePresence>

      {showBottomNav && (
        <BottomNavigation
          currentScreen={currentScreen as Screen}
          onScreenChange={(screen) => handleScreenChange(screen)}
        />
      )}
    </div>
  );
}

