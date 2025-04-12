import express from 'express'
import { signup, login, logout, updateProfilePic, checkAuth } from '../Controllers/auth.controller.js'
import { protectRoute } from '../middleware/protecteRoute.js'
export const authRouter = express.Router()

authRouter.post('/signup', signup)

authRouter.post('/login', login)

authRouter.post('/logout', logout)

authRouter.put('/update-profile', protectRoute, updateProfilePic)

authRouter.get('/check', protectRoute, checkAuth)