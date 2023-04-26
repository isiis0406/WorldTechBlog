import {Router} from 'express';

const postRouter = Router();
import {
    getAllPost, 
    getOnePost, 
    addOnePost,
    updateOnepost,
    deleteOnePost,
    //uploadCover
}  from '../controllers/postController.js'

//get all post
postRouter.get('/posts', getAllPost);

//get One post
postRouter.get('/posts/:id', getOnePost)


//add One post
postRouter.post('/posts/', addOnePost)

//

//update One post
postRouter.patch('/posts/:id', updateOnepost)

//delete One post
postRouter.delete('/posts/:id', deleteOnePost)



export { postRouter };