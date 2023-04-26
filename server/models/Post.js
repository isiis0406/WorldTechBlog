import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
    title:{type: String, required: true, min: 4},
    abstract:{type: String, required: true},
    author:{type: String},
    content:{type: String, required: true},
    cover:{type: String, required: false}
    
},{timestamps: true})
export const Post = mongoose.model('Post', postSchema);
 
