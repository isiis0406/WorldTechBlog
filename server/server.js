import express, { application } from "express";
import cors from "cors";
import dotenv, { config } from 'dotenv';
import dbConnect from "./database/db.js";
import { authRouter } from "./routes/AuthRoute.js";
import { postRouter } from "./routes/postRoute.js";

import requireAuth from "./middleware/requireAuth.js";


const app = express();

app.use(cors());
app.use(express.json());

dbConnect();

app.use('/auth', authRouter);

app.use(requireAuth);

app.use('/posts', postRouter);

app.listen(process.env.PORT, () => { console.log(`Server listening on port ${process.env.PORT}`);});