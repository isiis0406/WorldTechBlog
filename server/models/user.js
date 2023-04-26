import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });


//Static register method
userSchema.statics.register = async function(email, password){

//Check points

    //Validation
    if(!email || !password){
        throw Error('Veillez remplir tous les champs')
    }

    if(!validator.isEmail(email)){
        throw Error('Email incorrect!');

    }

     //Does user exists
     const exist = await this.findOne({email});
     if (exist) {
         throw Error('Email déjà utilisé');
     }
     
    if(!validator.isStrongPassword(password)){
        throw Error ('Mot de passe trop faible!');
    }
   
    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    // Return signed user
    const user = await this.create({ email, password: hash });

    return user;
}

//Static login method
userSchema.statics.login = async function(email, password){
    //Check points

    //Validation
    if(!email || !password){
        throw Error('Veillez remplir tous les champs')
    }

    //Does user exist
    const user = await this.findOne({email});
    if (!user) {
        throw Error('Email incorrect');
    }

    //Matching password
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw Error('Mot de passe incorrect');
    }
    return user;
}


export const User = mongoose.model('User', userSchema);
