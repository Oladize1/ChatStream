// ChatRoom.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { format } from 'timeago.js';

// Connect to your Socket.IO server at the appropriate URL:
const socket = io('http://localhost:3000');

const ChatRoom = () => {
  const [room, setRoom] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Listen for messages from the server:
  useEffect(() => {
    socket.on('chat message room', (data) => {
      console.log(data)
      console.log('Received message:', data);
      setMessages((prev) => [...prev, data]);
    });

    // Clean up listener on unmount:
    return () => {
      socket.off('chat message');
    };
  }, []);

  // Function to join a room:
  const joinRoom = () => {
    if (room.trim()) {
      socket.emit('join room', room.trim());
      setIsJoined(true);
      // Optionally clear previous messages when joining a new room:
      setMessages([]);
    }
  };

  // Function to leave a room:
  const leaveRoom = () => {
    if (room.trim()) {
      socket.emit('leave room', room.trim());
      setIsJoined(false);
      setMessages([]);
    }
  };

  // Function to send a message to the room:
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && isJoined) {
      // Emit a room-specific message:
      socket.emit('chat message room', { room, msg: message });
      setMessage('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chat Room</h2>

      {/* Room join/leave controls */}
      <div className="mb-4 flex gap-2">
        
        <input
          type="text"
          placeholder="Enter room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="input input-bordered flex-grow"
        />
        <button onClick={joinRoom} className="btn btn-primary">
          Join Room
        </button>
        {isJoined && (
          <button onClick={leaveRoom} className="btn btn-secondary">
            Leave Room
          </button>
        )}
      </div>

      {/* Chat messages container */}
      {isJoined ? (
        <div className="border p-4 mb-4 h-80 overflow-y-auto">
          <ul className="space-y-2">
            {messages.map((msg, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded">
                <p>{msg.msg}</p>
                <span className="text-xs text-gray-500">
                  {format(msg.timestamp)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">Join a room to start chatting</p>
      )}

      {/* Form for sending messages */}
      {isJoined && (
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow border p-2 rounded"
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default ChatRoom;
