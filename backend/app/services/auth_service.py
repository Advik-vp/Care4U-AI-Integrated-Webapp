import jwt
import hashlib
from datetime import datetime, timedelta
from flask import current_app
from ..db import get_collection, get_next_sequence

class AuthService:
    @staticmethod
    def _hash_password(password):
        return hashlib.sha256(password.encode()).hexdigest()
    
    @staticmethod
    def register(username, password, email, role='patient', full_name=''):
        users_col = get_collection('users')

        if users_col.find_one({'username': username}):
            return None

        user_id = get_next_sequence('user_id')
        user = {
            'user_id': user_id,
            'username': username,
            'password': AuthService._hash_password(password),
            'email': email,
            'role': role,
            'full_name': full_name,
            'created_at': datetime.now().isoformat()
        }

        users_col.insert_one(user)

        return {'id': user_id, 'username': username, 'role': role}
    
    @staticmethod
    def login(username, password):
        users_col = get_collection('users')
        hashed_password = AuthService._hash_password(password)

        user = users_col.find_one({'username': username, 'password': hashed_password})

        if not user:
            return None
        
        # Generate JWT token
        secret_key = current_app.config.get('SECRET_KEY', 'default-secret-key')
        token = jwt.encode({
            'user_id': user['user_id'],
            'username': user['username'],
            'role': user['role'],
            'exp': datetime.utcnow() + timedelta(days=7)
        }, secret_key, algorithm='HS256')
        
        return {
            'token': token,
            'user': {
                'id': user['user_id'],
                'username': user['username'],
                'email': user.get('email', ''),
                'role': user.get('role', ''),
                'full_name': user.get('full_name', '')
            }
        }
    
    @staticmethod
    def verify_token(token):
        try:
            secret_key = current_app.config.get('SECRET_KEY', 'default-secret-key')
            payload = jwt.decode(token, secret_key, algorithms=['HS256'])
            return payload
        except:
            return None