from app import create_app
from config import Config

app = create_app(Config)
print(f"App created successfully")
print(f"Routes: {len(list(app.url_map.iter_rules()))}")
print(f"HOST: {app.config['HOST']}")
print(f"PORT: {app.config['PORT']}")
print(f"DEBUG: {app.config['DEBUG']}")
print(f"OPENAI_API_KEY set: {'OPENAI_API_KEY' in app.config and app.config['OPENAI_API_KEY'] != ''}")
