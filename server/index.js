import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { app, server } from './lib/socketio.js'
dotenv.config()

import {authRouter} from './Routes/auth.js'
import { messageRouter } from './Routes/message.js'
import { callRouter } from './Routes/call.js'
const __dirname = path.resolve()

import { connectDb } from './DB/connectDB.js'
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)
app.use('/api/call', callRouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")))
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"))
    })
}



const connect = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        server.listen(process.env.PORT, (() => {
            console.log(`server listening on PORT ${process.env.PORT}`);
        }))
    } catch (error) {
        console.error(error)
    }
}

connect()