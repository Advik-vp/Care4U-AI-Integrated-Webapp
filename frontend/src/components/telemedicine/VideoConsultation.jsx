import React, { useState, useRef, useEffect } from 'react';

const VideoConsultation = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCall = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCallActive(true);
    } catch (err) {
      setError(`Failed to access camera/microphone: ${err.message}`);
      console.error('Media access error:', err);
    }
  };

  const endCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCallActive(false);
    setCameraOff(false);
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setCameraOff(!cameraOff);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (!isCallActive) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>Start a Video Consultation</h3>
        {error && (
          <div style={{
            padding: '15px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '5px',
            color: '#c33',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}
        <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>
          Click below to start a video call with a doctor. Make sure you have allowed camera and microphone access.
        </p>
        <button
          onClick={startCall}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#229954'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
        >
          📹 Start Video Call
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#000',
        borderRadius: '8px',
        overflow: 'hidden',
        aspectRatio: '16/9'
      }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        {cameraOff && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>📷</div>
              <p>Camera is OFF</p>
            </div>
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div style={{
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={toggleMute}
          style={{
            padding: '10px 20px',
            backgroundColor: isMuted ? '#e74c3c' : '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isMuted ? '🔇' : '🔊'} {isMuted ? 'Unmute' : 'Mute'}
        </button>

        <button
          onClick={toggleCamera}
          style={{
            padding: '10px 20px',
            backgroundColor: cameraOff ? '#e74c3c' : '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {cameraOff ? '📷' : '📹'} {cameraOff ? 'Turn On Camera' : 'Turn Off Camera'}
        </button>

        <button
          onClick={endCall}
          style={{
            padding: '10px 20px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
        >
          ☎️ End Call
        </button>
      </div>

      <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
        Call in progress... Waiting for doctor to join.
      </p>
    </div>
  );
};

export default VideoConsultation;