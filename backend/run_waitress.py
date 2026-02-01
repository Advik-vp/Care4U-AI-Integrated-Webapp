from app import create_app
from config import Config
from waitress import serve

print("Creating app...")
app = create_app(Config)
print("App created successfully")

print(f"Starting Waitress server on {app.config['HOST']}:{app.config['PORT']}")
print("Press Ctrl+C to stop the server")

# Run with Waitress (production-ready WSGI server)
serve(app, host=app.config['HOST'], port=app.config['PORT'], threads=4)
