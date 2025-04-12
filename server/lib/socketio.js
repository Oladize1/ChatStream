import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173']
    },
    connectionStateRecovery: {

    }
})

io.on('connection', (socket) => {
    console.log('user connected  with id', socket.id)
    socket.on("chat", (msg) => {
        console.log(`message: ${msg.text}`)
    })

    socket.on("disconnect", ()=>{
        console.log('user disconnected')
    })
})


export {app, server, io}