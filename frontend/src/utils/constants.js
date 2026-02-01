export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const USER_ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PATIENT_DASHBOARD: '/patient-dashboard',
  DOCTOR_DASHBOARD: '/doctor-dashboard',
};