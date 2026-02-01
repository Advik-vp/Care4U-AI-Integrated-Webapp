from flask import Blueprint, request, jsonify
import uuid

video_bp = Blueprint('video', __name__)

# Store active video rooms (in production, use Redis/database)
active_rooms = {}

@video_bp.route('/start-consultation', methods=['POST'])
def start_consultation():
    """
    Start a new video consultation
    Creates a unique room ID for Jitsi video call
    """
    try:
        data = request.get_json()
        patient_name = data.get('name', 'Anonymous')
        problem = data.get('problem', 'General consultation')
        user_id = data.get('userId', None)
        
        # Generate unique room ID
        room_id = str(uuid.uuid4())
        
        # Store room info
        active_rooms[room_id] = {
            'patient_name': patient_name,
            'problem': problem,
            'user_id': user_id,
            'created_at': str(uuid.uuid1().time)
        }
        
        return jsonify({
            'success': True,
            'roomId': room_id,
            'message': 'Video consultation room created'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@video_bp.route('/room/<room_id>', methods=['GET'])
def get_room_info(room_id):
    """Get information about a video room"""
    if room_id in active_rooms:
        return jsonify({
            'success': True,
            'room': active_rooms[room_id]
        }), 200
    else:
        return jsonify({
            'success': False,
            'error': 'Room not found'
        }), 404

@video_bp.route('/chat-message', methods=['POST'])
def chat_message():
    """
    Handle chat messages during video consultation
    """
    try:
        data = request.get_json()
        room_id = data.get('roomId', '')
        message = data.get('message', '')
        
        # Here you can integrate with AI service for responses
        # For now, simple acknowledgment
        reply = f"Message received: {message}. A healthcare professional will respond shortly."
        
        return jsonify({
            'success': True,
            'reply': reply
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
