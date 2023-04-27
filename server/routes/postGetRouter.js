import {Router} from 'express';

const postGetRouter = Router();
import {
    getAllPost, 
    getOnePost, 
    }  from '../controllers/postController.js'

//get all post
postGetRouter.get('/posts', getAllPost);

//get One post
postGetRouter.get('/posts/:id', getOnePost)




export { postGetRouter };