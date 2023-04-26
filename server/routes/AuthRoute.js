import express from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import {authRegister, authLogin} from '../controllers/userController.js';
const router = express.Router();


//Register
router.post('/register', authRegister)

//Login
router.post('/login', authLogin)


export { router as authRouter };