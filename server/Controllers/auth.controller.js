import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signup = async(req, res) => {
    let {email, name, password} = req.body
    try {
        name = name.trim()
        if (!email || !name || !password) {
            return res.status(400).json({ message: 'all fields are required' })
        }

        if (name.length < 3) {
            return res.status(400).json({message: "name must be greater than 3 characters"})
        }
        if (password.length < 6) {
            return res.status(400).json({message: "password must be greater than 6 characters"})
        }

        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({message: "user already exist"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        
        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                name:newUser.name,
                email: newUser.email
            })
        } else {
            res.status(400).json({message: "invalid data"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error", error})
    }
}

export const login = async(req, res) => {
    const { email, password } = req.body
    try {
        if ( !email || !password ){
            return res.status(400).json({ message: "All fields are required" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
}

export const logout = async(req, res) => {}

export const updateProfile = async() => {

}