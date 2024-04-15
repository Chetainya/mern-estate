const express = require("express");
const {createHmac , randomBytes} = require('crypto');
const multer  = require('multer')


const User = require('../model/user.modal.js');
const { generateToken } = require("../Services/auth.js");


const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
       
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage })




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


router.post("/update" , async (req , res , next) => {
    try{
        console.log(req.body.password , req.user.id)
        const salt = randomBytes(16).toString();
        const hashedPassword = createHmac('sha256' , salt).update(req.body.password).digest('hex');
        
        await User.findByIdAndUpdate(req.user.id , {password : hashedPassword , salt})
        return res.json({
            msg: "success"
        })

    }catch(err){
        next({statusCode : 400 , message : err.message})
    }
})


router.post('/update/profilePicture' , upload.single("file") , async (req , res) => {
    
    await User.findByIdAndUpdate(req.user.id , {avatar : `http://localhost:3000/uploads/${req.file.filename}`})
    res.send(req.file.filename);
    return;
})




module.exports = router