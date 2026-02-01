import api from './api';

class PatientService {
  async getDashboard() {
    try {
      const response = await api.get('/patient/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch dashboard' };
    }
  }

  async submitSymptoms(symptoms) {
    try {
      const response = await api.post('/patient/symptoms', { symptoms });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to submit symptoms' };
    }
  }

  async submitVitals(vitals) {
    try {
      const response = await api.post('/patient/vitals', vitals);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to submit vitals' };
    }
  }

  async bookAppointment(appointmentData) {
    try {
      const response = await api.post('/patient/appointments', appointmentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to book appointment' };
    }
  }
}

export default new PatientService();