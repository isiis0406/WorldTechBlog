import express from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import requireAuth from "../middleware/requireAuth.js";

import {
    authRegister,
    authLogin,
    authVerify,
    forgotPassword,
    resetPassword,
    editProfil,
    getUserProfil
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

//Reset Password
router.post('/users/:id/reset_pass/:token', resetPassword)

//Get user profil
router.get('/users/:id/profil', getUserProfil)

// Edit user profil
router.patch('/users/:id/edit_profil', requireAuth, editProfil)

export { router as authRouter };