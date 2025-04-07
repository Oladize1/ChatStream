import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookie.jwt
        if(!token){
            return res.status(401).json({message: "UnAuthorized - No token provided"})
        }
        const decoded = jwt.verify(token, process.env.SECRET)

        if (!decoded) {
            res.status(401).json({message: "UnAuthorized - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            res.status(404).json({message: "User not Found"})
        }

        req.user = user

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({message: ""})
    }
}