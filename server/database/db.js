import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const dbConnect = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI,);
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }
}
export default dbConnect;