import express from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import {authRegister, authLogin, authVerify} from '../controllers/userController.js';
const router = express.Router();


//Register
router.post('/register', authRegister)

//Verify Email
router.get('/users/:id/verify/:token', authVerify)

//Login
router.post('/login', authLogin)


export { router as authRouter };