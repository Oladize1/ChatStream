import Message from '../models/Message.js'
import cloudinary from '../lib/cloudinary.js'

export const sendMessage = async(req, res) =>{
    try {
        console.log(req.user)
        const { message, image } = req.body
        const { id:recieverId } = req.params
        const {_id: userId } = req.user


        let imageUrl;
        if(image){
            const response = await cloudinary.uploader.upload(image)
            imageUrl = response.secure_url
        }


        const newMessage = new Message({
            senderId: userId,
            recieverId: recieverId,
            text: message,
            image: imageUrl || ''
        })
        await newMessage.save()
        console.log(recieverId, message, userId)
     res.status(201).json()  
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}