import express from "express";
import fs from 'fs';
import path from 'path';

import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
const router = express.Router();
import validator from "validator";
import Token from '../models/token.js';
import sendEmail from '../utils/sendRegisterEmail.js';
import SendResetPassEMail from "../utils/sendResetPassEmail.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

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
        await Token.deleteOne({ _id: token._id });
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
            const subject = "Activation de votre compte worldTech"
            const message = "Bienvenu chez worldTech. Merci d'avoir choisit de nous rejoindre.";
            const url = `${process.env.BASE_URL}auth/users/${user._id}/verify/${token.token}`;

            await sendEmail(user.email, subject, message, url);
            return res.status(200).json({ message: 'Vous avez reçu un mail, cliquez sur le lien pour activer votre compte.' })
        }
        //Create auth Token
        const token = createToken(user._id);
        //Response
        res.status(200).json({

            UserID: user._id,
            token,
            profilInfos: {
                email,
                name: user.name,
                title: user.title,
                hobby: user.hobby,
                facebookUrl: user.facebookUrl,
                instagramUrl: user.instagramUrl,
                linkedInUrl: user.linkedInUrl,
                profilImage: user.profilImage,
                profilCoverImage: user.profilCoverImage,
            }
        });
    } catch (error) {
        //Response
        res.status(505).json({ message: error.message });
    }
}

//forgot Password
export const forgotPassword = async (req, res) => {
    // get email
    const email = req.body.email;
    const formatEmail = email.toLowerCase();

    const user = await User.findOne({ email: formatEmail });

    if (!user) {
        return res.status(404).json({ message: "Le mail saisis ne possède pas de compte" })
    }

    //Find token
    const token = await Token.findOne({ userId: user._id })
    if (!token) {
        // create token
        //Create the Verification Token to store on database
        const token = await Token.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")

        });
        //Send Verification email url
        const url = `${process.env.BASE_URL}auth/users/${user._id}/reset-password/${token.token}`;
        await SendResetPassEMail(user.email, "Réinitialisation du mot de passe de votre compte worldTech", url);

        //Success
        return res.status(200).json({ message: 'Vous avez reçu un mail, cliquez sur le lien pour réinitialiser votre mot de passe.' })

    }
    //Send Verification email url
    const url = `${process.env.BASE_URL}auth/users/${user._id}/reset-password/${token.token}`;
    await SendResetPassEMail(user.email, "Réinitialisation du mot de passe de votre compte worldTech", url);

    //Success
    return res.status(200).json({ message: 'Vous avez reçu un mail, cliquez sur le lien pour réinitialiser votre mot de passe.' })


}

//Reset Password
export const resetPassword = async (req, res) => {

    //get Password
    const { password, confirmPassword } = req.body;

    if (!password) {
        return res.status(404).json({ message: 'Veillez remplir tous les champs' })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(404).json({ message: 'Mot de passe trop faible!' })

    }
    if (password !== confirmPassword) {
        return res.status(404).json({ message: 'Les mots de passes saisis ne correspondent pas.' })
    }
    try {
        //Find the User
        const user = await User.findOne({ _id: req.params.id })
        // //Does the user Exist
        if (!user) {
            return res.status(400).send({ message: 'Lien invalid' });

        }
        // // Find the Verify token
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })
        //Does the token is Correct
        if (!token) {
            return res.status(400).send({ message: 'Lien invalid' });
        }

        // //Accept user Authentication
        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await User.updateOne({ _id: user._id }, {
            $set: {
                password: hash
            }
        });


        //Remove the Token
        await Token.deleteOne({ _id: token._id });
        //Reponse success Message
        res.status(200).send({ message: 'Mot de passe modifié. Vous pouvez à présent vous connecter' });


    } catch (error) {
        res.status(500).json({ message: error.message })
    }


    //Verify Token


    //Hash Password

    //update Password

    //Reset Success
}


//Get User Profil
export const getUserProfil = async (req, res) => {
    try {
        //Find the User
        const user = await User.findOne({ _id: req.params.id });
          //Create auth Token
          const token = createToken(user._id);
          //Response
          res.status(200).json({
                profilInfos: {
                  name: user.name,
                  title: user.title,
                  hobby: user.hobby,
                  facebookUrl: user.facebookUrl,
                  instagramUrl: user.instagramUrl,
                  linkedInUrl: user.linkedInUrl,
                  profilImage: user.profilImage,
                  profilCoverImage: user.profilCoverImage,
              }
          });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Edit Profil
export const editProfil = async (req, res) => {
    try {
        //Find the User
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(400).json({ message: 'Wrong credentials' });
        }
        

        //Manage String data 
        const profile = req.body;

        const name = profile.name;
        const title = profile.title;
        const hobby = profile.hobby;
        const facebookUrl = profile.facebookUrl
        const instagramUrl = profile.instagramUrl
        const linkedInUrl = profile.linkedInUrl
        const profilImage = profile.profilImage;
        const oldProfilImage = profile.oldProfilImage;
        // const profilCoverImage = profile.profilCoverImage;
        // const oldProfilCoverImage = profile.oldProfilCoverImage;

        if (profilImage != undefined) {
            // delete old Cover
            if (fs.existsSync('../uploads/' + oldProfilImage)) {
                fs.unlink(path.join("uploads/") + oldProfilImage, function (err) {
                    if (err)
                        throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            }
        }
        // if (profilCoverImage != undefined) {
        //     // delete old Cover
        //     fs.promises.unlink(path.join("uploads/profil/") + oldProfilCoverImage, function (err) {
        //         if (err)
        //             throw err;
        //         // if no error, file has been deleted successfully
        //         console.log('File deleted!');
        //     });
        // }

        const updatedProfil = await User.updateOne({ _id: req.params.id }, {
            $set: {
                name, title, hobby, facebookUrl, instagramUrl, linkedInUrl, profilImage
            }
        });
        if (JSON.parse(updatedProfil.modifiedCount) == false) {
            return res.status(404).json({ message: "Post not founded" });
        }
        res.status(200).json({ log: updatedProfil, message: "Profil updated succesfully" })


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
