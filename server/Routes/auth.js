import express from 'express'
import { signup, login, logout, updateProfile } from '../Controllers/auth.controller.js'
import { protectRoute } from '../middleware/protecteRoute.js'
export const authRouter = express.Router()

authRouter.post('/signup', signup)

authRouter.post('/login', login)

authRouter.post('/logout', logout)

authRouter.put('/update-profile', protectRoute, updateProfile)