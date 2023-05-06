import {Router} from 'express';
import requireAuth from "../middleware/requireAuth.js";


const postRouter = Router();
import {
    getAllPost, 
    getOnePost, 
    addOnePost,
    updateOnepost,
    deleteOnePost,
    getUserPost
}  from '../controllers/postController.js'



//get all post
postRouter.get('/posts', getAllPost);

//get User posts
postRouter.get('/users/:id/posts', getUserPost);

//get One post
postRouter.get('/posts/:id', getOnePost)


//add One post
postRouter.post('/posts',requireAuth, addOnePost)

//update One post
postRouter.patch('/posts/:id', requireAuth, updateOnepost)

//delete One post
postRouter.delete('/posts/:id',requireAuth,  deleteOnePost)



export { postRouter };