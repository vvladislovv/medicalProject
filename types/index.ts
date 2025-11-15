export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender?: 'Male' | 'Female';
  avatar?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  avatar: string;
  experience?: number;
  clinic?: string;
  city: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface HealthMetric {
  type: 'heartRate' | 'bloodSugar' | 'bloodPressure';
  value: string;
  date?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

export type Screen = 'home' | 'pharmacy' | 'appointment' | 'reports' | 'profile';

