import express from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
const router = express.Router();
import Token from '../models/token.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';
import { log } from "console";

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
        //  const token = createToken(user._id);

        // Response
        res.status(201).json({ email, message: 'Vous avez reçu un mail, cliquez sur le lien pour activer votre compte.' });
    } catch (error) {

        //Response
        res.status(505).json({ message: error.message });
    }

}

//Verify Email
export const authVerify = async (req, res) => {
    try {
        //Find the User
        const user = await User.findOne({ _id: req.params.id })
        // //Does the user Exist
        if (!user) {
            return res.status(400).send({ message: 'Lien invalid' });

        }
        // Find the Verify token
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })
        //Does the token is Correct
        if (!token) {
            return res.status(400).send({ message: 'Lien invalid' });
        }

        //Accept user Authentication
        await User.updateOne({ _id: user._id }, {
            $set: {
                verified: true
            }
        });

        //Remove the Token
        // await Token.findByIdAndRemove(token._id);
        //Reponse success Message
        res.status(200).send({ message: 'Email vérifié avec succes' });


    } catch (error) {
        console.log(error.message);
    }

}

//Login
export const authLogin = async (req, res) => {
    //

    const { email, password } = req.body;

    try {
        //Login User
        const user = await User.login(email, password);
        //Is user Verified 
        if (user.verified === false) {
            let token = await Token.findOne({ userId: user._id });
            if (!token) {
                //Create the Verification Token to store on database
                const token = await Token.create({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex")
                })
                //Send Verification email url
                const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
                await sendEmail(user.email, "Activation du compte worldTech", url);
            }

            //Send Verification email url
            const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
            await sendEmail(user.email, "Activation du compte worldTech", url);
            return res.status(400).json({ message: 'Vous avez reçu un mail, cliquez sur le lien pour activer votre compte.' })
        }
        //Create auth Token
        const token = createToken(user._id);
        //Response
        res.status(200).json({ email, token });
    } catch (error) {
        //Response
        res.status(505).json({ message: error.message });
    }
}
