import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import Message  from '../models/Message.js'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})



const userSocketMap = new Map()
export function getRecieverSocketId  (userId){
    const id = userSocketMap.get(userId)
    console.log("reciever",id)
    return id
}
io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId
    console.log("user connected with id", socket.id, userId)
    if (userId) {
        userSocketMap.set(userId, socket.id)
        console.log(`user that is logged in id: ${userId}, with his socket id ${socket.id}`)
        io.emit("onlineUsers", [...userSocketMap.keys()])
    }

    socket.on("chat", (msg)=>{
        console.log(msg)
        io.emit('chat', msg)
    })
    
    socket.on("join room", (room) => {
        socket.join(room)
        console.log(`user with ${socket.id} join the room`)
    })
    socket.on("leave room", (room) => {
        socket.leave(room)
        console.log(`user with ${socket.id} join the room`)
    })
    socket.on("message room", ({room, message}) => {
        const fullMessage = {
            from:userId,
            message,
            room,
            timestamp: new Date()
        };

        io.to(room).emit('message room', fullMessage);
    })


    socket.on("private message", async ({touserId, senderId, message, sender}) => {
        const targetUser = userSocketMap.get(touserId)
        const newMessage = new Message({
            senderId,
            recieverId: touserId,
            text: message
        })

        await newMessage.save()
        if (targetUser) {
            io.to(targetUser).emit("private message", {message, senderId, sender})
        } else {
            console.log('Target user is not connected');
        }
    })

    socket.on("typing", (username)=>{
        socket.broadcast.emit("typing", username)
    })

    socket.on("stop typing", (username)=> {
        socket.broadcast.emit("stop typing", username)
    })


    socket.on("disconnect", () => {
        console.log(`user with id ${socket.id} disconnected`)
        for (let [userId, ids] of userSocketMap.entries()) {
            if(ids === socket.id)
           userSocketMap.delete(userId)
        break;
        }
        io.emit("onlineUsers", [...userSocketMap.keys()])
    })
    
})


export {io, server, app} 