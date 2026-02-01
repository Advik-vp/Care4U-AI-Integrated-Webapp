import os
from dotenv import load_dotenv

load_dotenv()

print('Configuration Check:')
print(f'MAIL_SERVER: {os.getenv("MAIL_SERVER")}')
print(f'MAIL_PORT: {os.getenv("MAIL_PORT")}')
print(f'MAIL_USE_TLS: {os.getenv("MAIL_USE_TLS")}')
print(f'MAIL_USERNAME: {os.getenv("MAIL_USERNAME")}')
print(f'ENABLE_EMAIL_NOTIFICATIONS: {os.getenv("ENABLE_EMAIL_NOTIFICATIONS")}')

print('\nFlask App Config Check:')
from app import create_app
from config import Config
app = create_app(Config)

with app.app_context():
    print(f'MAIL_USERNAME in config: {app.config.get("MAIL_USERNAME")}')
    print(f'MAIL_PASSWORD in config: {"*" * 10 if app.config.get("MAIL_PASSWORD") else "NOT SET"}')
    print(f'ENABLE_EMAIL_NOTIFICATIONS: {app.config.get("ENABLE_EMAIL_NOTIFICATIONS")}')
