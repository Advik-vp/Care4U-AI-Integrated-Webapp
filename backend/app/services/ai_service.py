import openai
import anthropic
import json
from ..utils.prompts import load_prompt
from flask import current_app
import logging

try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False

logger = logging.getLogger(__name__)

class AIService:
    @staticmethod
    def _get_ai_provider():
        """Determine which AI provider to use based on available API keys"""
        openai_key = current_app.config.get('OPENAI_API_KEY')
        anthropic_key = current_app.config.get('ANTHROPIC_API_KEY')
        gemini_key = current_app.config.get('GEMINI_API_KEY')
        
        # Prioritize OpenAI first (most reliable)
        if openai_key:
            return 'openai', openai_key
        elif anthropic_key:
            return 'anthropic', anthropic_key
        elif gemini_key and GEMINI_AVAILABLE:
            return 'gemini', gemini_key
        else:
            return None, None
    
    @staticmethod
    def _get_fallback_response(context):
        """Provide intelligent fallback responses when AI is unavailable"""
        fallbacks = {
            'chat': "AI assistant is currently unavailable. Please try again later or consult our FAQ.",
            'symptoms': {
                'analysis': 'AI symptom checker is currently unavailable. We recommend consulting with a healthcare professional for accurate diagnosis.',
                'possible_condition': 'Unable to analyze - Please consult a healthcare provider',
                'recommended_doctor_type': 'General Practitioner',
                'urgency_level': 'medium',
                'next_steps': 'Schedule an appointment with your healthcare provider',
                'severity': 'unknown',
                'legal_disclaimer': 'This AI analysis is for informational purposes only and not a substitute for professional medical advice.',
                'recommendations': [
                    'Monitor your symptoms closely',
                    'Stay hydrated and get adequate rest',
                    'Seek immediate medical attention if symptoms worsen',
                    'Contact your healthcare provider for personalized advice'
                ]
            },
            'care_plan': "Personalized care plan generation is currently unavailable. Please consult with your healthcare provider."
        }
        return fallbacks.get(context, "Service temporarily unavailable")
    
    @staticmethod
    def chat(message, conversation_history=None):
        """AI chatbot with multi-provider support and graceful fallback"""
        try:
            prompt = load_prompt('chatbot')
            provider, api_key = AIService._get_ai_provider()
            
            if not provider:
                return AIService._get_fallback_response('chat')
            
            if provider == 'gemini':
                genai.configure(api_key=api_key)
                model = genai.GenerativeModel('gemini-1.5-flash')
                
                # Build conversation context
                full_prompt = prompt + "\n\n"
                if conversation_history:
                    for msg in conversation_history:
                        role = "User" if msg['role'] == 'user' else "Assistant"
                        full_prompt += f"{role}: {msg['content']}\n"
                full_prompt += f"User: {message}\nAssistant:"
                
                response = model.generate_content(full_prompt)
                return response.text
            
            elif provider == 'openai':
                client = openai.OpenAI(api_key=api_key)
                messages = [{"role": "system", "content": prompt}]
                if conversation_history:
                    messages.extend(conversation_history)
                messages.append({"role": "user", "content": message})
                
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=messages,
                    max_tokens=500,
                    temperature=0.7
                )
                return response.choices[0].message.content
            
            elif provider == 'anthropic':
                client = anthropic.Anthropic(api_key=api_key)
                full_message = prompt + "\n\nUser: " + message
                if conversation_history:
                    for msg in conversation_history:
                        full_message += f"\n{msg['role'].capitalize()}: {msg['content']}"
                
                response = client.messages.create(
                    model="claude-3-sonnet-20240229",
                    max_tokens=500,
                    messages=[{"role": "user", "content": full_message}]
                )
                return response.content[0].text
        
        except Exception as e:
            logger.error(f"AI chat error: {str(e)}")
            return AIService._get_fallback_response('chat')

    @staticmethod
    def check_symptoms(symptoms):
        """AI-powered symptom analysis with intelligent fallback"""
        try:
            prompt = load_prompt('symptom_checker')
            message = f"Patient symptoms: {symptoms}"
            provider, api_key = AIService._get_ai_provider()
            
            if not provider:
                logger.warning("No AI provider available, using fallback")
                return AIService._get_fallback_response('symptoms')
            
            analysis = None
            
            if provider == 'gemini':
                try:
                    genai.configure(api_key=api_key)
                    model = genai.GenerativeModel('gemini-1.5-flash')
                    full_prompt = prompt + "\n" + message
                    response = model.generate_content(full_prompt)
                    analysis = response.text
                    logger.info(f"Gemini analysis successful: {analysis[:100]}...")
                except Exception as gemini_error:
                    logger.error(f"Gemini error: {str(gemini_error)}")
                    logger.warning("Gemini failed, trying fallback")
                    return AIService._get_fallback_response('symptoms')
            
            elif provider == 'anthropic':
                client = anthropic.Anthropic(api_key=api_key)
                response = client.messages.create(
                    model="claude-3-sonnet-20240229",
                    max_tokens=1000,
                    messages=[{"role": "user", "content": prompt + "\n" + message}]
                )
                analysis = response.content[0].text
            
            elif provider == 'openai':
                client = openai.OpenAI(api_key=api_key)
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": prompt},
                        {"role": "user", "content": message}
                    ],
                    max_tokens=1000,
                    temperature=0.3
                )
                analysis = response.choices[0].message.content
            
            # Parse AI response to extract structured data
            return {
                'analysis': analysis,
                'possible_condition': analysis[:100] + '...' if len(analysis) > 100 else analysis,
                'recommended_doctor_type': 'General Practitioner',
                'urgency_level': 'medium',
                'next_steps': 'Schedule an appointment with a healthcare provider for proper diagnosis',
                'severity': 'moderate',
                'recommendations': [
                    'Monitor symptoms for 24-48 hours',
                    'Stay hydrated and get adequate rest',
                    'Consult a doctor if symptoms worsen',
                    'Seek immediate care for severe symptoms'
                ],
                'legal_disclaimer': 'This AI analysis is for informational purposes only and not a substitute for professional medical advice.',
                'provider': provider
            }
        
        except Exception as e:
            logger.error(f"Symptom check error: {str(e)}")
            return AIService._get_fallback_response('symptoms')
    
    @staticmethod
    def generate_care_plan(patient_data):
        """Generate personalized care plan using available AI provider"""
        try:
            prompt = load_prompt('care_plan_explanation')
            message = f"Generate care plan for patient with: {json.dumps(patient_data)}"
            provider, api_key = AIService._get_ai_provider()
            
            if not provider:
                return AIService._get_fallback_response('care_plan')
            
            if provider == 'openai':
                client = openai.OpenAI(api_key=api_key)
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": prompt},
                        {"role": "user", "content": message}
                    ],
                    max_tokens=800,
                    temperature=0.5
                )
                return response.choices[0].message.content
            
            elif provider == 'anthropic':
                client = anthropic.Anthropic(api_key=api_key)
                response = client.messages.create(
                    model="claude-3-sonnet-20240229",
                    max_tokens=800,
                    messages=[{"role": "user", "content": prompt + "\n" + message}]
                )
                return response.content[0].text
        
        except Exception as e:
            logger.error(f"Care plan generation error: {str(e)}")
            return AIService._get_fallback_response('care_plan')
    
    @staticmethod
    def health_check():
        """Check AI service availability and provider status"""
        provider, api_key = AIService._get_ai_provider()
        return {
            'available': provider is not None,
            'provider': provider,
            'status': 'operational' if provider else 'unavailable'
        }
