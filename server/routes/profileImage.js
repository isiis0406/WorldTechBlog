import {Router} from 'express';
import requireAuth from "../middleware/requireAuth.js";



const profilImageRouter = Router();
import {
    uploadProfilImage, 
    resizeImage
 
}  from '../controllers/imageUpload.js'



//Upload profil Image
profilImageRouter.post('/profil/avatar/upload', uploadProfilImage, resizeImage,  (req, res) => {
    res.status(200).json('Profil image uploaded')
});



export { profilImageRouter };