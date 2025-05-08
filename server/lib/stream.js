import { StreamChat } from 'stream-chat'
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

export const ServerClient = StreamChat.getInstance(apiKey, apiSecret)