import api from './api';

class DoctorService {
  async getDashboard() {
    try {
      const response = await api.get('/doctor/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch dashboard' };
    }
  }

  async getPatients() {
    try {
      const response = await api.get('/doctor/patients');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch patients' };
    }
  }

  async getAppointments() {
    try {
      const response = await api.get('/doctor/appointments');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch appointments' };
    }
  }

  async createAppointment(appointmentData) {
    try {
      const response = await api.post('/doctor/appointments', appointmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create appointment' };
    }
  }
}

export default new DoctorService();
