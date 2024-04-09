const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose')
const cors = require('cors');



const userRouter = require('./router/user.router.js')

const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
dotenv.config();

mongoose.connect("mongodb://localhost:27017/realestate").then(() => console.log('DB connected')).catch((err) => console.log(err));

app.use(express.json())
app.use('/user',userRouter);
app.get('/' , (req , res) => {
    return res.send("Hello from server");
})


app.use((err , req , res , next) => {
    const code = err.statusCode
    const message = err.message
    res.json({
        code,
        message,
        status : "faliure"
    
    })
    return next();
})

app.listen(3000 , () => console.log("Server running on PORT:3000"));

