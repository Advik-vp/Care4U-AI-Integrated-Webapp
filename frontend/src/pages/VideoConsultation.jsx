import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VideoConsultation.css';

const VideoConsultation = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I\'m your AI medical assistant. How can I help you during this consultation?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);

  const jitsiDomain = 'meet.jit.si';
  const jitsiRoomUrl = `https://${jitsiDomain}/${roomId}`;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || sending) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setSending(true);

    try {
      const response = await axios.post('/api/ai/chat', {
        message: userMessage.text,
        roomId: roomId
      });

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.data.response || 'I\'m here to help. Please describe your symptoms.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'Sorry, I\'m having trouble connecting. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="video-loading">
        <div className="spinner"></div>
        <p>Preparing consultation room...</p>
      </div>
    );
  }

  return (
    <div className="video-consultation-container">
      <div className="video-header">
        <h2>🏥 Video Consultation</h2>
        <div className="room-info">
          <span>Room ID: {roomId?.slice(0, 8)}...</span>
          <button onClick={() => navigate(-1)} className="exit-btn">
            Exit Consultation
          </button>
        </div>
      </div>

      <div className="video-main-content">
        {/* Video Panel */}
        <div className="video-panel">
          <div className="video-container">
            <iframe
              src={jitsiRoomUrl}
              allow="camera; microphone; fullscreen; display-capture"
              allowFullScreen
              title="Video Consultation"
              className="jitsi-frame"
            />
          </div>
        </div>

        {/* Chat Panel */}
        <div className="chat-panel">
          <div className="chat-header">
            <h3>💬 AI Assistant</h3>
          </div>

          <div className="messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-content">
                  <div className="message-text">{msg.text}</div>
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {sending && (
              <div className="message ai">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <textarea
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={sending}
              rows="2"
            />
            <button 
              onClick={handleSendMessage} 
              disabled={sending || !inputValue.trim()}
              className="send-btn"
            >
              📤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConsultation;
