from flask import Blueprint, request, jsonify
from ..services.ai_service import AIService

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/health', methods=['GET'])
def health():
    """Check AI service availability"""
    status = AIService.health_check()
    return jsonify(status), 200

@ai_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message')
    response = AIService.chat(message)
    return jsonify({'response': response}), 200

@ai_bp.route('/symptom-check', methods=['POST'])
def symptom_check():
    data = request.get_json()
    symptoms = data.get('symptoms')
    result = AIService.check_symptoms(symptoms)
    return jsonify(result), 200