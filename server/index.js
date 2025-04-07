import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
const app = express()

import { connectDb } from './DB/connectDB.js'

import { authRouter } from './Routes/auth.js'


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
        app.listen(process.env.PORT, (() => {
            console.log(`server listening on PODT ${process.env.PORT}`);
        }))
    } catch (error) {
        console.error(error)
    }
}

connect()