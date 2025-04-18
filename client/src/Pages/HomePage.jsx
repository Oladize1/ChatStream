import { useState, useEffect } from 'react';
import { useAuthStore } from '../Store/Store.js';

const ChatApp = () => {
  const { friendsList } = useAuthStore()
  console.log({friends: friendsList})
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John Doe', text: 'Hey there! How are you?', time: '10:30 AM', incoming: true },
    { id: 2, sender: 'You', text: "I'm good, thanks! Working on a new project.", time: '10:32 AM', incoming: false },
  ]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const users = [
    { id: 1, name: 'John Doe', avatar: 'https://i.pravatar.cc/50?img=1', lastMessage: 'Hey, how are you?', time: '2 min ago', online: true },
    { id: 2, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/50?img=2', lastMessage: 'See you tomorrow!', time: '1 hr ago', online: false },
    { id: 3, name: 'John Doe', avatar: 'https://i.pravatar.cc/50?img=1', lastMessage: 'Hey, how are you?', time: '2 min ago', online: true },
    { id: 4, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/50?img=2', lastMessage: 'See you tomorrow!', time: '1 hr ago', online: false },
    { id: 5, name: 'John Doe', avatar: 'https://i.pravatar.cc/50?img=1', lastMessage: 'Hey, how are you?', time: '2 min ago', online: true },
    { id: 6, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/50?img=2', lastMessage: 'See you tomorrow!', time: '1 hr ago', online: false },
    { id: 7, name: 'John Doe', avatar: 'https://i.pravatar.cc/50?img=1', lastMessage: 'Hey, how are you?', time: '2 min ago', online: true },
    { id: 8, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/50?img=2', lastMessage: 'See you tomorrow!', time: '1 hr ago', online: false },
    { id: 9, name: 'John Doe', avatar: 'https://i.pravatar.cc/50?img=1', lastMessage: 'Hey, how are you?', time: '2 min ago', online: true },
    { id: 10, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/50?img=2', lastMessage: 'See you tomorrow!', time: '1 hr ago', online: false },
    { id: 11, name: 'John Doe', avatar: 'https://i.pravatar.cc/50?img=1', lastMessage: 'Hey, how are you?', time: '2 min ago', online: true },
    { id: 12, name: 'Jane Smith', avatar: 'https://i.pravatar.cc/50?img=2', lastMessage: 'See you tomorrow!', time: '1 hr ago', online: false },
  ];



  // Check screen size and adjust sidebar visibility
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      incoming: false,
    };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleChatSelect = (userId) => {
    setActiveChat(userId);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  return (
    <div className="flex h-screen bg-base-200">
      

      {/* Sidebar */}
      <div className={`${showSidebar ? 'block' : 'hidden'} md:block w-full md:w-1/3 lg:w-1/4 border-r border-base-300 bg-base-100 flex flex-col absolute md:relative z-40 h-full`}>
        <div className="p-4 border-b border-base-300 flex justify-between items-center">
          <h2 className="text-xl font-bold">Chats</h2>
          {isMobile && (
            <button onClick={() => setShowSidebar(false)} className="btn btn-circle btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="p-4 border-b border-base-300">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-base-200 focus:outline-none"
            />
            <span className="absolute left-3 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="h-full">
        <div className="overflow-y-auto flex-1">
          {friendsList.map((user) => (
            <div
              key={user.id}
              className={`flex items-center p-4 hover:bg-base-300 cursor-pointer ${activeChat === user.id ? 'bg-base-300' : ''}`}
              onClick={() => handleChatSelect(user.id)}
            >
              <div className={`avatar ${user.online ? 'online' : 'offline'}`}>
                <div className="w-12 rounded-full">
                  <img src={user.profilePic || './profile.png'} alt={user.name} />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500 truncate">{user.lastMessage || ''}</p>
              </div>
              <div className="text-xs text-gray-400">{user.time || ''}</div>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`${!showSidebar || !isMobile ? 'block' : 'hidden'} md:block flex-1 flex flex-col relative`}>
        {isMobile && !showSidebar && (
          <button 
            onClick={() => setShowSidebar(true)}
            className="md:hidden absolute top-4 left-4 z-30 btn btn-circle btn-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Chat Header */}
        <div className="p-4 border-b border-base-300 bg-base-100 flex items-center">
          {isMobile && (
            <button 
              onClick={() => setShowSidebar(true)}
              className="mr-2 btn btn-ghost btn-circle md:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src={users.find(u => u.id === activeChat)?.avatar} alt="Profile" />
            </div>
          </div>
          <div className="ml-3">
            <h3 className="font-semibold">{users.find(u => u.id === activeChat)?.name}</h3>
            <p className="text-sm text-gray-500">{users.find(u => u.id === activeChat)?.online ? 'Online' : 'Offline'}</p>
          </div>
          <div className="ml-auto flex space-x-4">
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-base-100">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat ${msg.incoming ? 'chat-start' : 'chat-end'} mb-4`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={msg.incoming ? users.find(u => u.id === activeChat)?.avatar : 'https://i.pravatar.cc/50?img=3'} alt="Profile" />
                </div>
              </div>
              <div className="chat-bubble bg-base-300 text-base-content">{msg.text}</div>
              <div className="chat-footer opacity-50 text-xs mt-1">{msg.time}</div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-base-300 bg-base-100 flex items-center">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 mx-4 input input-bordered focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;