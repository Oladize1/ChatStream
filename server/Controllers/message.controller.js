import Message from '../models/Message.js'
import cloudinary from '../lib/cloudinary.js'

export const sendMessage = async(req, res) =>{
    try {
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
     res.status(201).json(newMessage)  
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}

export const getMessage = async(req, res) => {
    try {
        const {_id } = req.user
        const { id } = req.params

        const messages = await Message.find({
            $or : [
                {senderId: _id, recieverId: id},
                {senderId: id, recieverId: _id}
            ]
        }).sort({createdAt:1})
        res.status(200).json(messages)
        console.log("messages from backend", messages)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal sever Error", error})
    }
}