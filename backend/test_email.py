import os
from dotenv import load_dotenv
from flask_mail import Mail, Message
from flask import Flask

load_dotenv()

app = Flask(__name__)
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')

mail = Mail(app)

print('📧 Email Configuration:')
print(f'  Server: {app.config["MAIL_SERVER"]}')
print(f'  Port: {app.config["MAIL_PORT"]}')
print(f'  TLS: {app.config["MAIL_USE_TLS"]}')
print(f'  Username: {app.config["MAIL_USERNAME"]}')
print(f'  Password: ****{app.config["MAIL_PASSWORD"][-4:] if app.config["MAIL_PASSWORD"] else "NOT SET"}')
print()

if not app.config['MAIL_USERNAME'] or not app.config['MAIL_PASSWORD']:
    print('❌ Email credentials missing!')
else:
    try:
        with app.app_context():
            msg = Message(subject='Test Email from Health Platform', 
                         recipients=[app.config['MAIL_USERNAME']], 
                         body='This is a test email to verify email configuration is working.')
            mail.send(msg)
            print('✅ Test email sent successfully!')
            print(f'   Check your email: {app.config["MAIL_USERNAME"]}')
    except Exception as e:
        print(f'❌ Error sending email: {str(e)}')
