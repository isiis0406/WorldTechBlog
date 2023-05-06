import { Post } from '../models/Post.js';
import { User } from '../models/user.js';
import fs from 'fs';
import path from 'path';
import { error, log } from 'console';


// import fileUpload  from "express-fileupload";


//Get all Post
export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//Get User Post
export const getUserPost = async (req, res) => {
    const authorId = req.params.id
    try {
        const posts = await Post.find({author : authorId }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Get One post
export const getOnePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: "Cannot find post" })
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Add On post
export const addOnePost = async (req, res) => {
    try {

        //Find Author ID
        const user = await User.findById(req.body.title.authorId);
        //Manage String data 
        const post = req.body.title;
        const dataPost =
        {
            title: post.title,
            category: post.category,
            author: user._id,
            summary: post.summary,
            content: post.content,
            cover: post.cover
        }

        // //Store infos & cover path to the database
        await Post.validatePost(dataPost.title, dataPost.category, dataPost.summary, dataPost.content);
        const newPost = await Post.create(dataPost);

        // res.json({dataPost})
        res.status(201).json({ post: newPost, message: 'Post created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// Update One post
export const updateOnepost = async (req, res) => {
    try {
        //Find Author ID
        const user = await User.findById(req.body.title.authorId);

        //Manage String data 
        const post = req.body.title;

        const title = post.title;
        const category = post.category;
        const author = user._id;
        const summary = post.summary;
        const content = post.content
        const cover = post.cover;
        const oldCoverName = post.oldCoverName;

        if (cover != undefined) {
            // delete old Cover
            fs.unlink(path.join("uploads/") + oldCoverName, function (err) {
                if (err)
                    throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
            });
        }




        const updatedPost = await Post.updateOne({ _id: req.params.id }, {
            $set: {
                title, category, author, summary, content, cover
            }
        });
        if (JSON.parse(updatedPost.modifiedCount) == false) {
            return res.status(404).json({ message: "Post not founded" });
        }
        res.status(200).json({ log: updatedPost, message: "Post updated succesfully" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Delete One post 
export const deleteOnePost = async (req, res) => {
    try {

        const post = await Post.findById({ _id: req.params.id });

        const cover = post.cover;
        if (cover) {
            // delete old Cover
            fs.unlink(path.join("uploads/") + cover, function (err) {
                if (err)
                    throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
            });
        }

        const deletedPost = await Post.deleteOne({ _id: req.params.id });
        if (JSON.parse(deletedPost.deletedCount) == false) {
            return res.status(404).json({ message: "Post not founded" });
        }
        const response =

            res.status(200).json({ log: deletedPost, message: "Post deleted succesfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

