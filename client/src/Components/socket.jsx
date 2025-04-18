import React, {useState, useEffect, useRef} from 'react'
import io from 'socket.io-client'
import { useAuthStore } from '../Store/Store'


const  Socket = () => {
    const {authUser, selectedUser, getMessage} = useAuthStore()
    const socket = useRef()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [receiver, setReceiver] = useState('')
    const [typingUser, setTypingUser] = useState('')
    const [room, setRoom] = useState('');
    const [roomMessages, setRoomMessages] = useState([]);
    console.log(messages.text)
    console.log("selectedUser", selectedUser)
    useEffect(() => {
  if (room && socket.current) {
    socket.current.emit('join room', room);

    socket.current.on('room message', (msg) => {
      setRoomMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.current.emit('leave room', room);
      socket.current.off('room message');
    };
  }
}, [room]);
    useEffect(() => {
        if (authUser) {
            socket.current = io('http://localhost:3000', {
            query: {
                userId: authUser?._id
            }
        })
        }
        socket.current.on("onlineUsers", (usersList) => {
            const usersLists = usersList.filter(user => user !== authUser._id)
            setUsers(usersLists)
        })
        socket.current.on("private message", (msg) => {
            setMessages(prev => [...prev, msg])
        })


        socket.current.on("typing", (user) =>{
          setTypingUser(user)
        })

        socket.current.on("stop typing", () =>{
          setTypingUser(null)
        })

        return () => {
            socket.current.disconnect()
        }
    },[authUser])
    
    console.log(users)
    const [roomMessage, setRoomMessage] = useState('');

const handleRoomMessage = (e) => {
  e.preventDefault();
  if (room && roomMessage.trim()) {
    socket.current.emit('room message', { room, message: roomMessage });
    setRoomMessages(prev => [...prev, {
      from: username,
      message: roomMessage,
      room
    }]);
    setRoomMessage('');
  }
};


    const handleTyping = () => {
      socket.current.emit("typing", authUser?.name)

      setTimeout(() => {
        socket.current.emit("stop typing", authUser?.name)
      }, 2000)
    }


    const handleChatUser = async (id) => {
        await getMessage(id)
    }

    const handleMessage = (e) => {
        e.preventDefault()
        console.log(receiver)
        try {
            if(message){
                const text = {
                    touserId:selectedUser[0],
                    senderId: authUser._id,
                    sender: authUser?.name,
                    message: message.trim()
                }
            socket.current.emit("private message", text)
            socket.current.emit("stop typing", authUser?.name)
            setMessages(prev => [...prev, text])
            setMessage('')  
        }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <h1 className="text-white text-center text-3xl">Chats</h1>
         {/* 4️⃣ Chat message display */}
         {typingUser && <p className="text-sm text-gray-500">{typingUser} is typing...</p>}
      <div className="h-64 overflow-y-auto border p-2 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded my-1 w-24 ${
              msg.senderId === authUser._id ? 'bg-blue-300 text-right justify-right' : 'bg-gray-400'
            }`}
          >
            <p className='p-3'>{msg.sender}: {msg.message}</p>
          </div>
        ))}
      </div>
        <form onSubmit={handleMessage}>
        <input
         type="text"
         placeholder='Enter Chat here'
         value={message}
         onChange={(e) => {setMessage(e.target.value)
          handleTyping()
         }}
          />
          <button className='btn' type="submit">Send</button>
          </form>

          <div className="mt-2">
            {users.map((id, i) => (<div className='cursor-pointer' onClick={() => handleChatUser(id)} key={i}>{id}</div>))}
          </div>
    </div>
  )
}

export default Socket

