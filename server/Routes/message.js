import express from 'express'
export const messageRouter = express.Router()
import { protectRoute } from '../middleware/protecteRoute.js'
import { sendMessage } from '../Controllers/message.controller.js'

messageRouter.post('/send/:id', protectRoute, sendMessage)