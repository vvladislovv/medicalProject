import { User, Appointment, HealthMetric } from '@/types';

const STORAGE_KEYS = {
  USER: 'caresync_user',
  APPOINTMENTS: 'caresync_appointments',
  HEALTH_METRICS: 'caresync_health_metrics',
  CURRENT_SCREEN: 'caresync_current_screen',
  IS_LOGGED_IN: 'caresync_is_logged_in',
  SELECTED_CITY: 'caresync_selected_city',
};

export const storage = {
  // User
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  setUser: (user: User): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
  },

  clearUser: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
  },

  isLoggedIn: (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true';
  },

  // Appointments
  getAppointments: (): Appointment[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return data ? JSON.parse(data) : [];
  },

  setAppointments: (appointments: Appointment[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  },

  addAppointment: (appointment: Appointment): void => {
    const appointments = storage.getAppointments();
    appointments.push(appointment);
    storage.setAppointments(appointments);
  },

  // Health Metrics
  getHealthMetrics: (): HealthMetric[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.HEALTH_METRICS);
    return data ? JSON.parse(data) : [];
  },

  setHealthMetrics: (metrics: HealthMetric[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.HEALTH_METRICS, JSON.stringify(metrics));
  },

  // Current Screen
  getCurrentScreen: (): string => {
    if (typeof window === 'undefined') return 'splash';
    return localStorage.getItem(STORAGE_KEYS.CURRENT_SCREEN) || 'splash';
  },

  setCurrentScreen: (screen: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CURRENT_SCREEN, screen);
  },

  // Selected City
  getSelectedCity: (): string => {
    if (typeof window === 'undefined') return 'Москва';
    return localStorage.getItem(STORAGE_KEYS.SELECTED_CITY) || 'Москва';
  },

  setSelectedCity: (city: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SELECTED_CITY, city);
  },
};

