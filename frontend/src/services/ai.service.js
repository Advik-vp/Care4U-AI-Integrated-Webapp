import api from './api';

class AIService {
  async checkSymptoms(symptoms) {
    try {
      const response = await api.post('/ai/symptom-check', { symptoms });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Symptom check failed' };
    }
  }

  async chat(message, conversationHistory = []) {
    try {
      const response = await api.post('/ai/chat', { 
        message, 
        conversation_history: conversationHistory 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Chat request failed' };
    }
  }
}

export default new AIService();