import mongoose from 'mongoose'

export const connectDb = async (uri) => {
    try {
        const conn = await mongoose.connect(uri)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error)
    }
}