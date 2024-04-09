const mongoose = require("mongoose");
const {createHmac , randomBytes} = require('crypto');
const { generateToken } = require("../Services/auth");

const userSchema = new mongoose.Schema({

    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    salt : {
        type : String
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        default : ''
    }

} , {timestamps : true})


userSchema.static('matchPassword' , async function(email , password){
    const user = await User.findOne({email});
    if(!user){
        throw new Error('User Not Found')
    }
    const userProvidedPasswordHash = createHmac('sha256' , user.salt).update(password).digest('hex');
    if(userProvidedPasswordHash !== user.password){
        throw new Error('Wrong Password');
    }
    const token = generateToken(user);
    const userReturnData = {
       
        ...user._doc
    }
    return {
        token,
        ...userReturnData,
        password : null,
        salt : null
    };
})

userSchema.pre('save' , function(next){
    const user = this;
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256' , salt).update(user.password).digest('hex');
    this.salt = salt;
    this.password  = hashedPassword;
    next();
})


const User= mongoose.model("user" , userSchema);

module.exports = User;