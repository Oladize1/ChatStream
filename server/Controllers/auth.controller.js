import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'
import cloudinary from '../lib/cloudinary.js'


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
        res.status(500).json({message: "Internal Server Error", error: error.message})
    }
}

export const login = async(req, res) => {
    const { email, password } = req.body
    try {
        if ( !email || !password ){
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({message: "Invalid credentials"})
        }

        const passwordCheck = await bcrypt.compare(password, user.password)

        if (!passwordCheck) {
            return res.status(404).json({ message: "invalid credentials" })
        }

        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'Internal Server Error', error: error.message})
    }
}

export const logout = async(req, res) => {
   try {
        res.cookie('jwt', '', {maxAge: 0})
        res.status(200).json({message: "log out successful"})
   } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Internal Server Error", error: error.message})
   }
}

export const updateProfilePic = async(req, res) => {
    try {
        const {profilePic} = req.body
        const userId = req.user._id

        if(!profilePic){
            return res.status(400).json({message: "Profile picture is not provided"})
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})
        res.status(201).json({updatedUser})
    } catch (error) {
      console.log(error.message)
      res.status(500).json({message: "Internal Server Error", error: error.message})  
    }
}

export const checkAuth = (req, res) => {
    try {
        console.log(req)
        res.status(200).json(req.user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error", error: error})
    }
}