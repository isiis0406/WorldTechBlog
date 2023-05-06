import {Router} from "express";
import multer from 'multer';


import requireAuth from "../middleware/requireAuth.js";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads')
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name);
    }
})

const storageProfil = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads/profil')
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name);
    }
})
const upload = multer({ storage: storage});
const uploadProfil = multer({ storage: storageProfil});

//Upload Cover posts Image
router.post("/upload", requireAuth , upload.single('file'), (req,res) =>{
    res.status(200).json( "image uploaded");

})

//Upload Cover profil Image
router.post("/upload/profil",requireAuth, uploadProfil.single('file'), (req,res) =>{
    res.status(200).json( "image uploaded");

})


export { router as uploadRouter };
