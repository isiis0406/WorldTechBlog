import express from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import {
    authRegister,
    authLogin,
    authVerify,
    forgotPassword,
    resetPassword
} from '../controllers/userController.js';
const router = express.Router();


//Register
router.post('/register', authRegister)

//Verify Email
router.get('/users/:id/verify/:token', authVerify)

//Login
router.post('/login', authLogin)

//Reset Password
router.post('/forgot_pass', forgotPassword)

router.post('/users/:id/reset_pass/:token', resetPassword)

export { router as authRouter };