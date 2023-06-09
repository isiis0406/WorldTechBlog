import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';


const tokenSchema = new mongoose.Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' ,
        unique: true},
    token: { 
        type: String, 
        required: true },
        createdAt: { 
            type: Date, 
            default: Date.now(),
        expires: 3600} //1 Hour
}, { timestamps: true });



const  Token = mongoose.model('Token', tokenSchema);
export default Token;