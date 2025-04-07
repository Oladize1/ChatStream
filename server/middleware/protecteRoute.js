import User from '../models/User.js'

export const protectRoute = (req, res, next) => {
    try {
        next()
    } catch (error) {
        console.log(error)
        res.status().json()
    }
}