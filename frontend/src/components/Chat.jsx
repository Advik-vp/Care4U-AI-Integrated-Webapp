import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './Chat.css'

/**
 * Chat Component
 * AI-powered chat interface
 * - Displays message history
 * - Sends messages to /api/ask-ai
 * - Shows loading indicator while waiting for AI response
 */
function Chat({ roomId }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I\'m your AI medical assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle sending message
  const handleSend = async () => {
    const trimmedInput = inputValue.trim()
    
    if (!trimmedInput) return
    if (loading) return

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmedInput,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setLoading(true)

    try {
      // Call AI endpoint
      const response = await axios.post('/api/ask-ai', {
        message: trimmedInput,
        roomId: roomId
      })

      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.data.reply || 'Sorry, I didn\'t understand that.',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Show error message
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'Sorry, I\'m having trouble connecting. Please make sure the backend server is running.',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-container">
      {/* Messages List */}
      <div className="messages-list">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'message-user' : 'message-ai'}`}
          >
            <div className="message-avatar">
              {message.sender === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {loading && (
          <div className="message message-ai">
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
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-container">
        <textarea
          className="chat-input"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          rows="1"
          disabled={loading}
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={loading || !inputValue.trim()}
        >
          {loading ? '⏳' : '📤'}
        </button>
      </div>
    </div>
  )
}

export default Chat
