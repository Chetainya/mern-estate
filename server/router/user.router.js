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
    return res.status(201).cookie('token' , token).json("User Created");
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

router.post('/googleAuth' , (req , res) => {
    return res.json(req.body)
})

module.exports = router