import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Security
    SECRET_KEY = os.getenv('SECRET_KEY', 'default-secret-key-change-in-production')
    
    # AI Providers (supports multiple, will use first available)
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    
    # Alternative AI provider keys (for future expansion)
    GOOGLE_AI_KEY = os.getenv('GOOGLE_AI_KEY')  # Gemini support (alternative key name)
    HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY')  # HuggingFace support
    
    # Database
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
    MONGODB_DB = os.getenv('MONGODB_DB', 'care4u')
    
    # Server Configuration
    DEBUG = os.getenv('DEBUG', 'False').lower() in ('true', '1', 'yes')
    HOST = os.getenv('HOST', '0.0.0.0')
    PORT = int(os.getenv('PORT', 5000))
    
    # AI Service Configuration
    AI_TIMEOUT = int(os.getenv('AI_TIMEOUT', 30))  # seconds
    AI_MAX_RETRIES = int(os.getenv('AI_MAX_RETRIES', 3))
    AI_FALLBACK_ENABLED = os.getenv('AI_FALLBACK_ENABLED', 'True').lower() in ('true', '1', 'yes')
    
    # Email Configuration
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'True').lower() in ('true', '1', 'yes')
    MAIL_USE_SSL = os.getenv('MAIL_USE_SSL', 'False').lower() in ('true', '1', 'yes')
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')  # Sender email
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')  # App password
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', os.getenv('MAIL_USERNAME'))
    MAIL_DEBUG = 0  # Flask-Mail debug level (0 = off)
    
    # Feature Flags (enable/disable features for deployment flexibility)
    ENABLE_AI_CHAT = os.getenv('ENABLE_AI_CHAT', 'True').lower() in ('true', '1', 'yes')
    ENABLE_SYMPTOM_CHECKER = os.getenv('ENABLE_SYMPTOM_CHECKER', 'True').lower() in ('true', '1', 'yes')
    ENABLE_CARE_PLANS = os.getenv('ENABLE_CARE_PLANS', 'True').lower() in ('true', '1', 'yes')
    ENABLE_EMAIL_NOTIFICATIONS = os.getenv('ENABLE_EMAIL_NOTIFICATIONS', 'True').lower() in ('true', '1', 'yes')