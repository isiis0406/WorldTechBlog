import { Post } from '../models/Post.js';
// import fileUpload  from "express-fileupload";


//Get all Post
export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Get One post
export const getOnePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post == null){
            return res.status(404).json({message: "Cannot find post"})
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Add On post
export const addOnePost = async (req, res) => {
    try {
    
            //Manage String data 
            const dataPost = 
            {   title: req.body.title, 
                abstract: req.body.abstract, 
                author: req.body.author,
                content: req.body.content,
                cover: req.body.cover
                } 
        //Store infos & cover path to the database
        const newPost = await Post.create(dataPost);
        res.status(201).json({post: newPost, message: 'Post created successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



// Update One post
export const updateOnepost = async (req, res) => {
    try {
        const {title, abstract, author, content,cover} = req.body;
        const updatedPost = await Post.updateOne({_id: req.params.id}, {
            $set: {title, abstract, author, content,cover
            }
        });
        if (JSON.parse(updatedPost.modifiedCount) == false) {
            return res.status(404).json({ message: "Post not founded" });
        }
        res.status(200).json({log: updatedPost ,message: "Post updated succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Delete One post 
export const deleteOnePost = async (req, res) =>{
    try {
        const deletedPost = await Post.deleteOne({ _id: req.params.id});
        if (JSON.parse(deletedPost.deletedCount) == false) {
            return res.status(404).json({ message: "Post not founded" });
        }
        const response = 
        
        res.status(200).json({log: deletedPost ,message: "Post deleted succesfully"})
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }    
}

