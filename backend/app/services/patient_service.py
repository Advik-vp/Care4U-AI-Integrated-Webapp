from .ai_service import AIService
from .email_service import send_appointment_confirmation, send_doctor_notification
from datetime import datetime
from ..db import get_collection, get_next_sequence

class PatientService:
    @staticmethod
    def _default_patient_doc(user_id):
        return {
            'user_id': user_id,
            'health_score': 85,
            'recent_symptoms': [],
            'appointments': [],
            'vitals': [],
            'timeline': []
        }

    @staticmethod
    def _patient_collection():
        return get_collection('patient_data')

    @staticmethod
    def _appointments_collection():
        return get_collection('appointments')

    @staticmethod
    def get_dashboard_data(user_id):
        patient_col = PatientService._patient_collection()
        doc = patient_col.find_one({'user_id': user_id})
        if not doc:
            return PatientService._default_patient_doc(user_id)

        return {
            'health_score': doc.get('health_score', 85),
            'recent_symptoms': doc.get('recent_symptoms', []),
            'appointments': doc.get('appointments', []),
            'vitals': doc.get('vitals', []),
            'timeline': doc.get('timeline', [])
        }
    
    @staticmethod
    def submit_vitals(user_id, vitals):
        vital_entry = {
            'timestamp': datetime.now().isoformat(),
            **vitals
        }
        timeline_entry = {
            'type': 'vitals',
            'date': datetime.now().isoformat(),
            'description': f"Vitals recorded: BP {vitals.get('blood_pressure', 'N/A')}, Heart Rate {vitals.get('heart_rate', 'N/A')}"
        }

        patient_col = PatientService._patient_collection()
        patient_col.update_one(
            {'user_id': user_id},
            {
                '$setOnInsert': PatientService._default_patient_doc(user_id),
                '$push': {
                    'vitals': vital_entry,
                    'timeline': timeline_entry
                }
            },
            upsert=True
        )
        return vital_entry
    
    @staticmethod
    def analyze_symptoms(user_id, symptoms):
        result = AIService.check_symptoms(symptoms)

        symptom_entry = {
            'timestamp': datetime.now().isoformat(),
            'symptoms': symptoms,
            'analysis': result
        }
        timeline_entry = {
            'type': 'symptom_check',
            'date': datetime.now().isoformat(),
            'description': "Symptom check performed"
        }

        patient_col = PatientService._patient_collection()
        patient_col.update_one(
            {'user_id': user_id},
            {
                '$setOnInsert': PatientService._default_patient_doc(user_id),
                '$push': {
                    'recent_symptoms': symptom_entry,
                    'timeline': timeline_entry
                }
            },
            upsert=True
        )
        return result
    
    @staticmethod
    def book_appointment(user_id, appointment_data):
        # Get patient name and email from users collection
        users_col = get_collection('users')
        patient = users_col.find_one({'user_id': user_id})
        patient_name = patient.get('full_name') or patient.get('username') or f'Patient {user_id}' if patient else f'Patient {user_id}'
        patient_email = patient.get('email') if patient else None
        
        # Get doctor name and email
        doctor_id = appointment_data.get('doctor_id')
        doctor = users_col.find_one({'user_id': doctor_id})
        doctor_name = doctor.get('full_name') or doctor.get('username') or f'Doctor {doctor_id}' if doctor else f'Doctor {doctor_id}'
        doctor_email = doctor.get('email') if doctor else None
        
        appointment = {
            'id': get_next_sequence('appointment_id'),
            'timestamp': datetime.now().isoformat(),
            'patient_id': user_id,
            'patient_name': patient_name,
            'doctor_id': doctor_id,
            'doctor_name': doctor_name,
            'date': appointment_data.get('date'),
            'time': appointment_data.get('time'),
            'symptoms': appointment_data.get('symptoms', ''),
            'status': 'pending'
        }

        # Store appointment in dedicated appointments collection
        PatientService._appointments_collection().insert_one(appointment)
        
        # Remove MongoDB _id from response (not JSON serializable)
        appointment.pop('_id', None)
        
        # Send email notifications
        print(f"DEBUG: About to send emails to patient_email={patient_email}, doctor_email={doctor_email}")
        try:
            # Send confirmation to patient
            if patient_email:
                print(f"DEBUG: Sending confirmation to patient: {patient_email}")
                send_appointment_confirmation(
                    patient_email=patient_email,
                    patient_name=patient_name,
                    doctor_name=doctor_name,
                    appointment_date=appointment_data.get('date'),
                    appointment_time=appointment_data.get('time'),
                    symptoms=appointment_data.get('symptoms', '')
                )
            
            # Send notification to doctor
            if doctor_email:
                print(f"DEBUG: Sending notification to doctor: {doctor_email}")
                send_doctor_notification(
                    doctor_email=doctor_email,
                    doctor_name=doctor_name,
                    patient_name=patient_name,
                    appointment_date=appointment_data.get('date'),
                    appointment_time=appointment_data.get('time'),
                    symptoms=appointment_data.get('symptoms', '')
                )
        except Exception as e:
            # Don't fail the appointment booking if email fails
            print(f"Email notification error: {str(e)}")
        
        return {
            'success': True,
            'message': 'Appointment booked successfully!',
            'appointment': appointment
        }
    
    @staticmethod
    def get_appointments(user_id):
        appointments_col = PatientService._appointments_collection()
        appointments = list(appointments_col.find({'patient_id': user_id}, {'_id': 0}))
        
        # Enrich with doctor names
        users_col = get_collection('users')
        for appt in appointments:
            doctor_id = appt.get('doctor_id')
            if doctor_id:
                doctor = users_col.find_one({'user_id': doctor_id})
                if doctor:
                    appt['doctor_name'] = doctor.get('full_name') or doctor.get('username') or f'Doctor {doctor_id}'
                else:
                    appt['doctor_name'] = f'Doctor {doctor_id}'
            appt['status'] = appt.get('status', 'pending')
        
        return appointments
    
    @staticmethod
    def get_available_doctors():
        users_col = get_collection('users')
        doctors = list(users_col.find({'role': 'doctor'}, {'_id': 0, 'password': 0}))
        
        result = []
        for doc in doctors:
            result.append({
                'id': doc.get('user_id'),
                'name': doc.get('full_name') or doc.get('username'),
                'specialization': doc.get('specialization', 'General Physician'),
                'username': doc.get('username')
            })
        
        return result