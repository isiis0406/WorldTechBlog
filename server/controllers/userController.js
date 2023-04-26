import express from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
const router = express.Router();

//Create Token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

//Register
export const authRegister = async (req, res) => {

    const { email, password } = req.body;


    try {
        //Create user on database
        const user = await User.register(email, password);

        //Create token
        const token = createToken(user._id);

        // Response
        res.status(201).json({ email, token });
    } catch (error) {

        //Response
        res.status(505).json({ message: error.message });
    }

}

//Login
export const authLogin = async (req, res) => {
    //
    const { email, password } = req.body;

    try {
        //Login User
        const user = await User.login(email, password);
        //Create Token
        const token = createToken(user._id);
        //Response
        res.status(200).json({ email, token });
    } catch (error) {
        //Response
        res.status(505).json({ message: error.message });
    }
}
