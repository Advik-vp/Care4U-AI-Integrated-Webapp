from datetime import datetime
from ..db import get_collection, get_next_sequence

class DoctorService:
    @staticmethod
    def _appointments_collection():
        return get_collection('appointments')

    @staticmethod
    def _patients_collection():
        return get_collection('patient_data')

    @staticmethod
    def _users_collection():
        return get_collection('users')

    @staticmethod
    def get_dashboard_data(doctor_id):
        appointments = list(DoctorService._appointments_collection().find({'doctor_id': doctor_id}, {'_id': 0}))
        
        return {
            'patients_count': len(set(a.get('patient_id') for a in appointments)),
            'appointments': appointments,
            'total_appointments': len(appointments),
            'earnings': len(appointments) * 100,
            'critical_alerts': []
        }
    
    @staticmethod
    def get_patients(doctor_id):
        appointments = list(DoctorService._appointments_collection().find({'doctor_id': doctor_id}, {'_id': 0}))
        patient_ids = list(set(a.get('patient_id') for a in appointments))

        users_col = DoctorService._users_collection()
        patients = []
        for pid in patient_ids:
            patient_appointments = [a for a in appointments if a.get('patient_id') == pid]
            user = users_col.find_one({'user_id': pid})
            if user:
                display_name = user.get('full_name') or user.get('username') or f'Patient {pid}'
            else:
                display_name = f'Patient {pid}'
            patients.append({
                'id': pid,
                'name': display_name,
                'appointment_count': len(patient_appointments)
            })
        
        return patients
    
    @staticmethod
    def get_appointments(doctor_id):
        appointments = list(DoctorService._appointments_collection().find({'doctor_id': doctor_id}, {'_id': 0}))
        
        # Enrich with patient names
        users_col = DoctorService._users_collection()
        for appt in appointments:
            patient_id = appt.get('patient_id')
            if patient_id:
                patient = users_col.find_one({'user_id': patient_id})
                if patient:
                    appt['patient_name'] = patient.get('full_name') or patient.get('username') or f'Patient {patient_id}'
                else:
                    appt['patient_name'] = f'Patient {patient_id}'
            appt['status'] = appt.get('status', 'pending')
        
        return appointments
    
    @staticmethod
    def create_appointment(data):
        appointment = {
            'id': get_next_sequence('appointment_id'),
            'created_at': datetime.now().isoformat(),
            **data
        }
        DoctorService._appointments_collection().insert_one(appointment)

        patient_id = data.get('patient_id')
        if patient_id:
            timeline_entry = {
                'type': 'appointment',
                'date': data.get('date', datetime.now().isoformat()),
                'description': f"Appointment booked with Dr. {data.get('doctor_name', 'Unknown')}"
            }
            DoctorService._patients_collection().update_one(
                {'user_id': patient_id},
                {
                    '$setOnInsert': {
                        'user_id': patient_id,
                        'health_score': 85,
                        'recent_symptoms': [],
                        'appointments': [],
                        'vitals': [],
                        'timeline': []
                    },
                    '$push': {
                        'appointments': appointment,
                        'timeline': timeline_entry
                    }
                },
                upsert=True
            )

        return appointment
    
    @staticmethod
    def update_appointment_status(appointment_id, status):
        appointments_col = DoctorService._appointments_collection()
        result = appointments_col.update_one(
            {'id': int(appointment_id)},
            {'$set': {'status': status, 'updated_at': datetime.now().isoformat()}}
        )
        
        if result.modified_count > 0:
            return {'success': True, 'message': 'Appointment status updated'}
        else:
            return {'success': False, 'message': 'Appointment not found'}