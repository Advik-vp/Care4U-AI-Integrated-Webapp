import sys
import traceback
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

try:
    from app import create_app
    from config import Config
    
    print("Creating app...")
    app = create_app(Config)
    print("App created successfully")
    
    print(f"Starting server on {app.config['HOST']}:{app.config['PORT']}")
    print(f"Debug mode: {app.config['DEBUG']}")
    
    # Add a simple test route
    @app.route('/')
    def home():
        return {"message": "CARE4U Health Platform API", "status": "running"}
    
    # Run the server
    app.run(
        host=app.config['HOST'],
        port=app.config['PORT'],
        debug=False,  # Disable debug to avoid reloader issues
        use_reloader=False,
        threaded=True
    )
    
    print("\nServer stopped normally")
except KeyboardInterrupt:
    print("\nServer stopped by user")
except Exception as e:
    print(f"\n\nERROR OCCURRED:")
    print(f"Exception type: {type(e).__name__}")
    print(f"Exception message: {str(e)}")
    print("\nFull traceback:")
    traceback.print_exc()
    sys.exit(1)
