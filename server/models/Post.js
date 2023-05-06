import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
    title:{type: String, required: true},
    category:{type: String, required: true },
    author:{type : mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    summary:{type: String, required: true},
    content:{type: String, required: true},
    cover:{type: String, required: false}
    
},{timestamps: true})

//Create post Static  Method
postSchema.statics.validatePost = async function (title, category, summary, content) {
     //Validation
     if (!title || !category || !summary || !content ) {
        throw Error('Veillez remplir tous les champs')
    }
    if(content.lengh == 0){
        throw Error('Le contenu doit faire au moins 3O charactères')

    }
     
}

export const Post = mongoose.model('Post', postSchema);
 
