import { ServerClient } from "../lib/stream.js"


export const getStreamChat = (req, res) => {
    try {
        const {id: userId} = req.user
        const token = ServerClient.createToken(userId)
        res.status(201).json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error making call", error})
    }
}