from flask_mail import Mail, Message
from flask import current_app
import traceback

mail = Mail()

def init_mail(app):
    """Initialize Flask-Mail with the app"""
    mail.init_app(app)
    # Ensure debug level is set
    if not hasattr(mail, 'debug') or mail.debug is None:
        mail.debug = app.config.get('MAIL_DEBUG', 0)
    app.extensions['mail'] = mail

def send_appointment_confirmation(patient_email, patient_name, doctor_name, appointment_date, appointment_time, symptoms):
    """Send appointment confirmation email to patient"""
    try:
        print(f"DEBUG: Attempting to send email to {patient_email}")
        print(f"DEBUG: current_app: {current_app}")
        print(f"DEBUG: ENABLE_EMAIL_NOTIFICATIONS: {current_app.config.get('ENABLE_EMAIL_NOTIFICATIONS')}")
        print(f"DEBUG: MAIL_USERNAME: {current_app.config.get('MAIL_USERNAME')}")
        
        # Check if email notifications are enabled
        if not current_app.config.get('ENABLE_EMAIL_NOTIFICATIONS', False):
            print("Email notifications are disabled")
            return False
        
        # Check if email is configured
        if not current_app.config.get('MAIL_USERNAME'):
            print("Email not configured - MAIL_USERNAME missing")
            return False
        
        subject = f"Appointment Confirmation - {appointment_date}"
        
        # HTML email body
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }}
                .header {{ background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }}
                .content {{ background-color: white; padding: 30px; border-radius: 0 0 5px 5px; }}
                .appointment-details {{ background-color: #f0f0f0; padding: 20px; margin: 20px 0; border-left: 4px solid #4CAF50; }}
                .detail-row {{ margin: 10px 0; }}
                .label {{ font-weight: bold; color: #555; }}
                .footer {{ text-align: center; margin-top: 20px; padding: 20px; color: #777; font-size: 12px; }}
                .button {{ background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>✅ Appointment Confirmed!</h1>
                </div>
                <div class="content">
                    <p>Dear {patient_name},</p>
                    <p>Your appointment has been successfully booked. Here are your appointment details:</p>
                    
                    <div class="appointment-details">
                        <div class="detail-row">
                            <span class="label">Doctor:</span> Dr. {doctor_name}
                        </div>
                        <div class="detail-row">
                            <span class="label">Date:</span> {appointment_date}
                        </div>
                        <div class="detail-row">
                            <span class="label">Time:</span> {appointment_time}
                        </div>
                        <div class="detail-row">
                            <span class="label">Status:</span> <span style="color: #ff9800;">Pending Confirmation</span>
                        </div>
                        {f'<div class="detail-row"><span class="label">Symptoms:</span> {symptoms}</div>' if symptoms else ''}
                    </div>
                    
                    <p>Your doctor will review and confirm your appointment shortly. You will receive another notification once confirmed.</p>
                    
                    <p><strong>Important:</strong></p>
                    <ul>
                        <li>Please arrive 10 minutes early</li>
                        <li>Bring any relevant medical records</li>
                        <li>Keep your appointment ID for reference</li>
                    </ul>
                    
                    <p>If you need to cancel or reschedule, please log in to your patient portal.</p>
                    
                    <p>Thank you for choosing our healthcare platform!</p>
                    
                    <p>Best regards,<br><strong>Health Care Team</strong></p>
                </div>
                <div class="footer">
                    <p>This is an automated message. Please do not reply to this email.</p>
                    <p>&copy; 2026 Health Care Platform. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Plain text version
        text_body = f"""
Appointment Confirmation

Dear {patient_name},

Your appointment has been successfully booked.

Appointment Details:
- Doctor: Dr. {doctor_name}
- Date: {appointment_date}
- Time: {appointment_time}
- Status: Pending Confirmation
{f'- Symptoms: {symptoms}' if symptoms else ''}

Your doctor will review and confirm your appointment shortly.

Important:
- Please arrive 10 minutes early
- Bring any relevant medical records
- Keep your appointment ID for reference

Thank you for choosing our healthcare platform!

Best regards,
Health Care Team

---
This is an automated message. Please do not reply to this email.
        """
        
        msg = Message(
            subject=subject,
            recipients=[patient_email],
            body=text_body,
            html=html_body,
            sender=current_app.config.get('MAIL_DEFAULT_SENDER')
        )
        
        mail.send(msg)
        print(f"✅ Email sent successfully to {patient_email}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to send email: {str(e)}")
        traceback.print_exc()
        return False

def send_doctor_notification(doctor_email, doctor_name, patient_name, appointment_date, appointment_time, symptoms):
    """Send new appointment notification to doctor"""
    try:
        if not current_app.config.get('ENABLE_EMAIL_NOTIFICATIONS', False):
            return False
        
        if not current_app.config.get('MAIL_USERNAME'):
            return False
        
        subject = f"New Appointment Request - {patient_name}"
        
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }}
                .header {{ background-color: #2196F3; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }}
                .content {{ background-color: white; padding: 30px; border-radius: 0 0 5px 5px; }}
                .appointment-details {{ background-color: #f0f0f0; padding: 20px; margin: 20px 0; border-left: 4px solid #2196F3; }}
                .detail-row {{ margin: 10px 0; }}
                .label {{ font-weight: bold; color: #555; }}
                .footer {{ text-align: center; margin-top: 20px; padding: 20px; color: #777; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🔔 New Appointment Request</h1>
                </div>
                <div class="content">
                    <p>Dear Dr. {doctor_name},</p>
                    <p>You have received a new appointment request:</p>
                    
                    <div class="appointment-details">
                        <div class="detail-row">
                            <span class="label">Patient:</span> {patient_name}
                        </div>
                        <div class="detail-row">
                            <span class="label">Date:</span> {appointment_date}
                        </div>
                        <div class="detail-row">
                            <span class="label">Time:</span> {appointment_time}
                        </div>
                        {f'<div class="detail-row"><span class="label">Symptoms:</span> {symptoms}</div>' if symptoms else ''}
                    </div>
                    
                    <p>Please log in to your doctor portal to review and confirm this appointment.</p>
                    
                    <p>Best regards,<br><strong>Health Care Platform</strong></p>
                </div>
                <div class="footer">
                    <p>This is an automated message. Please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_body = f"""
New Appointment Request

Dear Dr. {doctor_name},

You have received a new appointment request:

Patient: {patient_name}
Date: {appointment_date}
Time: {appointment_time}
{f'Symptoms: {symptoms}' if symptoms else ''}

Please log in to your doctor portal to review and confirm this appointment.

Best regards,
Health Care Platform
        """
        
        msg = Message(
            subject=subject,
            recipients=[doctor_email],
            body=text_body,
            html=html_body,
            sender=current_app.config.get('MAIL_DEFAULT_SENDER')
        )
        
        mail.send(msg)
        print(f"✅ Doctor notification sent to {doctor_email}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to send doctor notification: {str(e)}")
        traceback.print_exc()
        return False
