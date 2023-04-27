import {Router} from 'express';

const postRouter = Router();
import {
   
    addOnePost,
    updateOnepost,
    deleteOnePost,
    //uploadCover
}  from '../controllers/postController.js'


//add One post
postRouter.post('/posts', addOnePost)

//

//update One post
postRouter.patch('/posts/:id', updateOnepost)

//delete One post
postRouter.delete('/posts/:id', deleteOnePost)



export { postRouter };