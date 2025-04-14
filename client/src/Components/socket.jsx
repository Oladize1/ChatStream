import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

const  Socket = () => {
const [message, setMessage] = useState('')
const [messages, setMessages] = useState([])

    const canSave = Boolean(message)
    useEffect(() => {
        socket.on("chat", (msg) => {
            setMessages(prev => [...prev, msg])
        })
        return () => {
            socket.off("chat")
        }
    },[])
    

    const handleMessage = (e) => {
        e.preventDefault()
        try {
            if(message){
            const text = message.trim()
            socket.emit("chat", text)
            setMessage('')  
        }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <h1 className="text-white text-center text-3xl">Chats</h1>
        <div className="w-full h-52 ring-2 ring-white rounded-md my-3 mx-auto">
            <ul>
                {messages.map((msg, index) => (
                    <li key={index} className="p-2 bg-gray-400 rounded mb-2">{msg}</li>
                 ))}
            </ul>
        </div>
        <form onSubmit={handleMessage}>
        <input
         type="text"
         placeholder='Enter Chat here'
         value={message}
         onChange={(e) => setMessage(e.target.value)}
          />
          <button className='btn' type="submit">Send</button>
          </form>
    </div>
  )
}

export default Socket

