// ChatRoom.jsx
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast'
import io from 'socket.io-client';
import { format } from 'timeago.js';

// Create a socket instance pointing to your backend server.
// If you're running locally, it might be 'http://localhost:3000'
const socket = io('http://localhost:3000');

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Listen for incoming messages on component mount
  useEffect(() => {
    // When a "chat message" event is received, update the messages state
    socket.on('chat', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    // Cleanup the event listener on unmount
    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Emit the "chat message" event with the message text and additional meta data if needed
      const msg = {
        text: message,
        timestamp: new Date()
        // Add sender info here if available, e.g., current user name
      };
      socket.emit('chat', msg);
      socket.emit('hello', 'world')
      setMessage('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chat Room</h2>
      <div className="border p-4 mb-4 h-80 overflow-y-auto">
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded">
              <p>{msg.text}</p>
              <span className="text-xs text-gray-500">
                {format(msg.timestamp)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-grow border p-2 rounded"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary p-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
