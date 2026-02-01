#!/usr/bin/env python
"""Simple test to verify email service is working with app context"""

from app import create_app
from config import Config
from app.services.email_service import send_appointment_confirmation, send_doctor_notification

print("Testing email sending within app context...")

app = create_app(Config)

with app.app_context():
    print("\n✅ Inside app context")
    print(f"MAIL_USERNAME: {app.config.get('MAIL_USERNAME')}")
    print(f"ENABLE_EMAIL_NOTIFICATIONS: {app.config.get('ENABLE_EMAIL_NOTIFICATIONS')}")
    
    print("\n🔄 Attempting to send test email...")
    result = send_appointment_confirmation(
        patient_email="advikvivan72@gmail.com",
        patient_name="Test Patient",
        doctor_name="Dr. Test",
        appointment_date="2026-02-20",
        appointment_time="02:30 PM",
        symptoms="Fever, headache"
    )
    
    if result:
        print("\n✅ Email sent successfully!")
    else:
        print("\n❌ Email sending failed")
