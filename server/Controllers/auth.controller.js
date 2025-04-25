import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'
import bcrypt from 'bcryptjs'
import cloudinary from '../lib/cloudinary.js'
import { sendMailToNewUser } from '../lib/mail.js'


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
                email: newUser.email,
                friends: newUser.friends || []
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
        const user = await User.findOne({email}).populate({
            path: 'friends',
            select: 'name email profilePic'
        })
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
            profilePic: user.profilePic,
            friends: user.friends
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

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'friends',
      select: 'name email profilePic'
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const addFriends = async(req, res) => {
    try {
        const {id} = req.user
        const { email } = req.body
        if (!email) {
            return res.status(400).json({message: "email not present"})
        }
        const user = await User.findById(id).populate({
            path: 'friends',
            select: 'name, email, profilePic'
        })
        const friend = await User.findOne({email})
        if(!friend){
            console.log("we will ask the user to sign up")
            await sendMailToNewUser(user.email, email)
            return res.status(200).json({message:"friend request sent succesfully", friends: user.friends})
        }


        const alreadyFriends = user.friends.some(f => f._id.equals(friend._id));
        const isSelf = user._id.equals(friend._id);

        if(alreadyFriends){
            return res.status(400).json({message: "User is already in your friend list"})
        }

        if (isSelf) {
            return res.status(400).json({message: "You can't add yourself as friend"})
        }
        if (user && friend && !alreadyFriends && !isSelf) {
            user.friends.push(friend._id)
            friend.friends.push(user._id)
            await user.save()
            await friend.save()
        }

        const updatedUser = await User.findById(id).populate({
            path: 'friends',
            select: 'name email profilePic'
        });
        return res.status(201).json({ message: "Add friend Successfully", friends: updatedUser.friends });

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error", error})
    }
}