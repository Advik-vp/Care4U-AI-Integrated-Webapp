import React, { useState } from 'react';

const ChatFollowUp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'doctor',
      text: 'Hello! How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Simulate doctor response
    setTimeout(() => {
      const doctorResponse = {
        id: messages.length + 2,
        sender: 'doctor',
        text: 'Thank you for your message. I\'m reviewing your case and will respond shortly.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, doctorResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '500px', gap: '15px' }}>
      <h3 style={{ color: '#2c3e50', margin: '0 0 10px 0' }}>Chat with Doctor</h3>

      {/* Messages Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '15px',
        backgroundColor: '#f5f7fa',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '12px 15px',
                borderRadius: '8px',
                backgroundColor: msg.sender === 'user' ? '#3498db' : '#ecf0f1',
                color: msg.sender === 'user' ? 'white' : '#2c3e50',
                wordWrap: 'break-word'
              }}
            >
              <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>
                {msg.text}
              </p>
              <span style={{ fontSize: '12px', opacity: 0.7 }}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#3498db',
              animation: 'bounce 1.4s infinite'
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#3498db',
              animation: 'bounce 1.4s infinite',
              animationDelay: '0.2s'
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#3498db',
              animation: 'bounce 1.4s infinite',
              animationDelay: '0.4s'
            }} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '12px 15px',
            border: '1px solid #bdc3c7',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.3s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3498db'}
          onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !newMessage.trim()}
          style={{
            padding: '12px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            opacity: isLoading ? 0.6 : 1,
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = '#2980b9')}
          onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = '#3498db')}
        >
          Send
        </button>
      </form>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default ChatFollowUp;