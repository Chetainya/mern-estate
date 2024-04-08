const express = require("express");

const User = require('../model/user.modal.js')

const router = express.Router();

router.post('/signup' , async (req , res , next) => {
    const {userName , email , password} = req.body;
    try{
    await User.create({
        userName,
        password,
        email
    })
    return res.status(201).json("User Created");
}catch(err){
    next({statusCode : 400 , message : err.message})
}
})

router.post('/login' , async (req , res , next) => {
    const {email , password} = req.body;
    try{
    const result = await User.matchPassword(email , password);
    res.json(result);
    }catch(err){
        next({statusCode : 400 , message : err.message})
    }
})

module.exports = router