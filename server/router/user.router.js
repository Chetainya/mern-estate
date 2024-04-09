const express = require("express");

const User = require('../model/user.modal.js');
const { generateToken } = require("../Services/auth.js");

const router = express.Router();

router.post('/signup' , async (req , res , next) => {
    const {userName , email , password} = req.body;
    try{
    const user = await User.create({
        userName,
        password,
        email
    })
    const token = generateToken(user);
    return res.status(201).cookie('token' , token).json(user);
}catch(err){
    next({statusCode : 400 , message : err.message})
}
})

router.post('/login' , async (req , res , next) => {
    const {email , password} = req.body;
    try{
    const {token , ...rest} = await User.matchPassword(email , password);
    
   
    res.status(201).cookie('token' , token).json(rest);
    }catch(err){
        next({statusCode : 400 , message : err.message})
    }
})

router.post('/googleAuth' , async (req , res , next) => {
    //handle google authentication

    // 1> user already present than generate token and navigate to home page
    const user = await User.findOne({email : req.body.email});
    try{
    if(user){

        const token = generateToken(user);
        return res.status(201).cookie('token' , token).json({"login" : user});
    }
    else{
        const newUser = await User.create({
            userName : req.body.userName,
            email : req.body.email,
            password : 'null',  // change it by genenating random values
            avatar : req.body.avatar

        })
        const token = generateToken(newUser);
        return res.status(201).cookie('token' , token).json({"new User" : newUser});
    }
}catch(err){
    next({statusCode : 400 , message : err.message})
}
    // 2> create new user and generate token and navigate to home page
})

module.exports = router