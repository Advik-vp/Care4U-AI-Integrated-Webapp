import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Chat from '../components/Chat'
import './Room.css'

/**
 * Room Page Component
 * Video consultation room with split layout:
 * - Left: Jitsi video iframe
 * - Right: AI chat panel
 */
function Room() {
  const { roomId } = useParams()
  const [loading, setLoading] = useState(true)

  // Video provider configuration
  const USE_TWILIO = false // Set to true to use Twilio instead of Jitsi
  const jitsiDomain = 'meet.jit.si'
  const jitsiRoomUrl = `https://${jitsiDomain}/${roomId}`

  useEffect(() => {
    console.log('✓ Room loaded:', roomId)
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [roomId])

  return (
    <div className="room-container">
      {loading ? (
        <div className="room-loading">
          <div className="spinner-large"></div>
          <p>Preparing consultation room...</p>
        </div>
      ) : (
        <div className="room-layout">
          {/* Left Panel: Video */}
          <div className="video-panel">
            <div className="panel-header">
              <h2>📹 Video Consultation</h2>
              <span className="room-id">Room: {roomId.slice(0, 8)}...</span>
            </div>
            
            {USE_TWILIO ? (
              // Twilio Video (requires token implementation)
              <div className="video-container">
                <div className="coming-soon">
                  <p>Twilio Video Integration</p>
                  <p>Implement using token from /api/video/token</p>
                </div>
              </div>
            ) : (
              // Jitsi Video (default - no auth required)
              <div className="video-container">
                <iframe
                  src={jitsiRoomUrl}
                  allow="camera; microphone; fullscreen; display-capture"
                  allowFullScreen
                  title="Video Consultation"
                  className="jitsi-iframe"
                />
              </div>
            )}

            <div className="video-controls">
              <div className="control-hint">
                💡 Use the video controls above to manage camera, mic, and screen sharing
              </div>
            </div>
          </div>

          {/* Right Panel: AI Chat */}
          <div className="chat-panel">
            <div className="panel-header">
              <h2>🤖 AI Assistant</h2>
            </div>
            <Chat roomId={roomId} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Room
