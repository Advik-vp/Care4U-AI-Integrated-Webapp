from .auth import auth_bp
from .doctor import doctor_bp
from .patient import patient_bp
from .ai import ai_bp
from .video import video_bp

def register_routes(app):
    # Register API blueprints with /api prefix to avoid conflicts with React routes
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(doctor_bp, url_prefix='/api/doctor')
    app.register_blueprint(patient_bp, url_prefix='/api/patient')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    app.register_blueprint(video_bp, url_prefix='/api/video')