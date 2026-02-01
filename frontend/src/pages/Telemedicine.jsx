import React, { useState, useEffect } from 'react';
import VideoConsultation from '../components/telemedicine/VideoConsultation';
import ChatFollowUp from '../components/telemedicine/ChatFollowUp';

const Telemedicine = () => {
  const [webrtcSupported, setWebrtcSupported] = useState(true);
  const [activeTab, setActiveTab] = useState('video');

  useEffect(() => {
    // Check for WebRTC support
    const hasWebRTC = !!(
      navigator.mediaDevices?.getUserMedia ||
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia
    );
    setWebrtcSupported(hasWebRTC);
  }, []);

  return (
    <div style={{ padding: '40px 20px', minHeight: '80vh', backgroundColor: '#f5f7fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '10px', color: '#2c3e50' }}>Telemedicine Services</h1>
        <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>
          Start video consultations and chat with doctors.
        </p>

        {!webrtcSupported && (
          <div
            style={{
              padding: '20px',
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              borderRadius: '8px',
              marginBottom: '30px',
              color: '#c33'
            }}
          >
            <h3 style={{ marginTop: 0 }}>⚠️ WebRTC Support Required</h3>
            <p>
              Your browser does not support WebRTC. Please:
            </p>
            <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
              <li>Update to a modern browser (Chrome, Firefox, Safari, or Edge)</li>
              <li>Enable media permissions in your browser settings</li>
              <li>Allow camera and microphone access when prompted</li>
            </ul>
            <p>
              For now, you can use our chat-based consultation feature below.
            </p>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #e0e0e0' }}>
          <button
            onClick={() => setActiveTab('video')}
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'video' ? '#3498db' : 'transparent',
              color: activeTab === 'video' ? 'white' : '#7f8c8d',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: activeTab === 'video' ? 'bold' : 'normal',
              borderBottom: activeTab === 'video' ? '3px solid #3498db' : 'none',
              transition: 'all 0.3s ease'
            }}
            disabled={!webrtcSupported}
          >
            📹 Video Consultation
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            style={{
              padding: '12px 24px',
              backgroundColor: activeTab === 'chat' ? '#3498db' : 'transparent',
              color: activeTab === 'chat' ? 'white' : '#7f8c8d',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: activeTab === 'chat' ? 'bold' : 'normal',
              borderBottom: activeTab === 'chat' ? '3px solid #3498db' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            💬 Chat Follow-up
          </button>
        </div>

        {/* Tab Content */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {activeTab === 'video' && webrtcSupported && (
            <VideoConsultation />
          )}
          {activeTab === 'video' && !webrtcSupported && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#7f8c8d', fontSize: '16px' }}>
                Video consultation is not available. Please switch to a browser with WebRTC support or use chat below.
              </p>
            </div>
          )}
          {activeTab === 'chat' && (
            <ChatFollowUp />
          )}
        </div>
      </div>
    </div>
  );
};

export default Telemedicine;