import React, { useState } from 'react';

const AIChatbot = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    setChat([...chat, { text: message, sender: 'user' }]);
    setMessage('');
    // Simulate AI response
    setTimeout(() => {
      setChat(prev => [...prev, { text: 'AI response', sender: 'ai' }]);
    }, 1000);
  };

  return (
    <div>
      <h3>AI Chatbot</h3>
      <div>
        {chat.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default AIChatbot;