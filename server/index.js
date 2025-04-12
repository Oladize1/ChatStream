import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { app, server } from './lib/socketio.js'
dotenv.config()

import {authRouter} from './Routes/auth.js'


import { connectDb } from './DB/connectDB.js'
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/api/auth', authRouter)

app.get('/test', (req, res) => {
    res.send('Hello world')
})

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