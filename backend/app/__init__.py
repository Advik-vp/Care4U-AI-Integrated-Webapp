from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from .routes import register_routes
from .services.email_service import init_mail
import os

def create_app(config_class):
    # Set up static folder for React build
    static_folder = os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'frontend', 'dist')
    app = Flask(__name__, static_folder=static_folder, static_url_path='')
    app.config.from_object(config_class)

    CORS(app)
    
    # Initialize email service
    init_mail(app)

    register_routes(app)
    
    # Serve static files and React App (catch-all for SPA routing)
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        # Check if the requested path is an actual file in dist
        file_path = os.path.join(app.static_folder, path)
        if os.path.isfile(file_path):
            return send_from_directory(app.static_folder, path)
        # For any other path (including React routes), serve index.html
        return send_from_directory(app.static_folder, 'index.html')

    return app