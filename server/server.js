import express, { application } from "express";
import cors from "cors";
import dotenv, { config } from 'dotenv';
import dbConnect from "./database/db.js";
import { authRouter } from "./routes/AuthRoute.js";
import { postRouter } from "./routes/postRouter.js";
import { uploadRouter } from "./routes/uploadRouter.js";
import  path from 'path';
import multer from 'multer';
import { URL } from "url";



import requireAuth from "./middleware/requireAuth.js";

const app = express();

const __dirname = new URL('.', import.meta.url).pathname;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"../server/uploads")));


dbConnect();

app.use('/auth', authRouter);


// app.use(requireAuth);


// Upload Storage for Imges
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads')
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name);
    }
})
const upload = multer({ storage: storage});

//Upload Image Route
app.use("/upload", requireAuth , upload.single('file'), (req,res) =>{
    res.status(200).json( "image uploaded");

})

// app.use('/', uploadRouter)


app.use('/', postRouter);

app.listen(process.env.PORT, () => { console.log(`Server listening on port ${process.env.PORT}`);});