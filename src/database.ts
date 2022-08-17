import mongoose, { MongooseError } from 'mongoose';
import * as logger from './utils/console'
export const databaseConnect = () => {
    console.log("[HML] Connecting to database")
    mongoose.connect(process.env.databaseURI ?? '')
        .then((result)=>logger.info("Connection to database successful"))
        .catch((error)=>logger.error(`Error: ${error.message}\n${error.error}`))
};
export const connection = mongoose.connection.useDb('MailingList');
connection.dropCollection('viewsessions')

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
const viewSessionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    postIndex: {
        type: Number,
        required:true
    }
})

export const Post = mongoose.model('Post', postSchema)
export const User = mongoose.model('User', userSchema)
export const ViewSession = mongoose.model('ViewSession', viewSessionSchema)


export let posts: (mongoose.Document<unknown, any, {
    title: string;
    attachment: string;
    timestamp: number;
}> & {
    title: string;
    attachment: string;
    timestamp: number;
} & {
    _id: mongoose.Types.ObjectId;
})[] = [];

// Initialize by caching posts

Post.find({}).sort({ timestamp: 1}).exec((error, sortedResults) => {
    sortedResults.map((element) => posts.push(element));
    if (error)
    logger.error(error)
    logger.info(`${sortedResults.length} posts have been loaded!`)
})
