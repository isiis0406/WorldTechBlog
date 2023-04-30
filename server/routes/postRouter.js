import {Router} from 'express';
import requireAuth from "../middleware/requireAuth.js";


const postRouter = Router();
import {
   
    addOnePost,
    updateOnepost,
    deleteOnePost,
    //uploadCover
}  from '../controllers/postController.js'



//add One post
postRouter.post('/posts',requireAuth, addOnePost)

//

//update One post
postRouter.patch('/posts/:id', requireAuth, updateOnepost)

//delete One post
postRouter.delete('/posts/:id',requireAuth,  deleteOnePost)



export { postRouter };