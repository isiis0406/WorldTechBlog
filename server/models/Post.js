import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
    title:{type: String},
    category:{type: String, },
    author:{type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    content:{type: String},
    cover:{type: String, required: false}
    
},{timestamps: true})
export const Post = mongoose.model('Post', postSchema);
 
