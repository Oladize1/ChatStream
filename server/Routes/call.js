import express from "express";
import { protectRoute } from "../middleware/protecteRoute.js";
import { getStreamChat } from "../Controllers/call.controller.js";
export const callRouter = express.Router()

callRouter.use(protectRoute)

callRouter.post('/get-token', getStreamChat)