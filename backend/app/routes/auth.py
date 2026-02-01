from flask import Blueprint, request, jsonify
from ..services.auth_service import AuthService

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': 'Username and password required'}), 400
        
        result = AuthService.login(username, password)
        if result:
            return jsonify(result), 200
        return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        role = data.get('role', 'patient')
        full_name = data.get('full_name', '')
        
        if not username or not password or not email:
            return jsonify({'error': 'Username, password, and email required'}), 400
        
        user = AuthService.register(username, password, email, role, full_name)
        if user:
            return jsonify({'message': 'User registered successfully', 'user': user}), 201
        return jsonify({'error': 'User already exists'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/verify', methods=['GET'])
def verify():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return jsonify({'error': 'No token provided'}), 401
        
        payload = AuthService.verify_token(token)
        if payload:
            return jsonify({'valid': True, 'user': payload}), 200
        return jsonify({'valid': False}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500