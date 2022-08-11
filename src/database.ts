import mongoose from 'mongoose';

export const databaseConnect = () => {
    console.log("[\x1b[36mHML\x1b[37m] Connecting to database")
    mongoose.connect(process.env.databaseURI ?? '')
        .then((result)=>console.log("[\x1b[36mHML\x1b[37m] Connection to database successful"))
        .catch((error)=>console.error(`[\x1b[31mHML\x1b[37m] Error: ${error.message}\n${error.error}`))
};
export const connection = mongoose.connection.useDb('MailingList');
const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    }
});

export const User = mongoose.model('User',userSchema);