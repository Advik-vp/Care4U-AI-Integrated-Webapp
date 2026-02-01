from flask import Blueprint, request, jsonify
from ..services.doctor_service import DoctorService
from ..services.auth_service import AuthService

doctor_bp = Blueprint('doctor', __name__)

@doctor_bp.route('/dashboard', methods=['GET'])
def dashboard():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = AuthService.verify_token(token)
        if not user:
            return jsonify({'error': 'Unauthorized'}), 401
        
        data = DoctorService.get_dashboard_data(user['user_id'])
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@doctor_bp.route('/patients', methods=['GET'])
def get_patients():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = AuthService.verify_token(token)
        if not user:
            return jsonify({'error': 'Unauthorized'}), 401
        
        patients = DoctorService.get_patients(user['user_id'])
        return jsonify(patients), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@doctor_bp.route('/appointments', methods=['GET'])
def get_appointments():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = AuthService.verify_token(token)
        if not user:
            return jsonify({'error': 'Unauthorized'}), 401
        
        appointments = DoctorService.get_appointments(user['user_id'])
        return jsonify(appointments), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@doctor_bp.route('/appointments', methods=['POST'])
def create_appointment():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = AuthService.verify_token(token)
        if not user:
            return jsonify({'error': 'Unauthorized'}), 401
        
        data = request.get_json()
        data['doctor_id'] = user['user_id']
        appointment = DoctorService.create_appointment(data)
        return jsonify(appointment), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@doctor_bp.route('/appointments/<appointment_id>', methods=['PUT'])
def update_appointment(appointment_id):
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user = AuthService.verify_token(token)
        if not user:
            return jsonify({'error': 'Unauthorized'}), 401
        
        data = request.get_json()
        result = DoctorService.update_appointment_status(appointment_id, data.get('status'))
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500