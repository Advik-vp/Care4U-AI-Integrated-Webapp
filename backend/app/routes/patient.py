from flask import Blueprint, request, jsonify
from ..services.patient_service import PatientService
from ..services.auth_service import AuthService

patient_bp = Blueprint('patient', __name__)

@patient_bp.route('/dashboard', methods=['GET'])
def dashboard():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = AuthService.verify_token(token)
        if not user:
            return jsonify({'error': 'Unauthorized'}), 401
        
        data = PatientService.get_dashboard_data(user['user_id'])
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/symptoms', methods=['POST'])
def submit_symptoms():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = AuthService.verify_token(token)
        if not user:
            return jsonify({'error': 'Unauthorized'}), 401
        
        data = request.get_json()
        symptoms = data.get('symptoms')
        result = PatientService.analyze_symptoms(user['user_id'], symptoms)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/vitals', methods=['POST'])
def submit_vitals():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = AuthService.verify_token(token)
        if not user:
            return jsonify({'error': 'Unauthorized'}), 401
        
        data = request.get_json()
        result = PatientService.submit_vitals(user['user_id'], data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/appointments', methods=['POST'])
def book_appointment():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = AuthService.verify_token(token)
        if not user:
            return jsonify({'error': 'Unauthorized'}), 401
        
        data = request.get_json()
        result = PatientService.book_appointment(user['user_id'], data)
        return jsonify(result), 200
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/appointments', methods=['GET'])
def get_appointments():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = AuthService.verify_token(token)
        if not user:
            return jsonify({'error': 'Unauthorized'}), 401
        
        appointments = PatientService.get_appointments(user['user_id'])
        return jsonify(appointments), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@patient_bp.route('/doctors', methods=['GET'])
def get_doctors():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = AuthService.verify_token(token)
        if not user:
            return jsonify({'error': 'Unauthorized'}), 401
        
        doctors = PatientService.get_available_doctors()
        return jsonify(doctors), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500