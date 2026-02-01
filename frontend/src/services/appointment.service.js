import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const bookAppointment = async (data) => {
  const response = await axios.post(`${API_BASE}/appointments`, data);
  return response.data;
};

export const getAppointments = async (userId) => {
  const response = await axios.get(`${API_BASE}/appointments?user=${userId}`);
  return response.data;
};