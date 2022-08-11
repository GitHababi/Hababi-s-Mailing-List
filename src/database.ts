import mongoose from 'mongoose';
import * as logger from './utils/console'
export const databaseConnect = () => {
    console.log("[\x1b[36mHML\x1b[37m] Connecting to database")
    mongoose.connect(process.env.databaseURI ?? '')
        .then((result)=>logger.info("Connection to database successful"))
        .catch((error)=>logger.error(`Error: ${error.message}\n${error.error}`))
};
export const connection = mongoose.connection.useDb('MailingList');
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    attachment: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
})
const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    }
})

export const Post = mongoose.model('Post', postSchema)
export const User = mongoose.model('User', userSchema)