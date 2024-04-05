const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose')


const app = express();


dotenv.config();

mongoose.connect("mongodb://localhost:27017/realestate").then(() => console.log('DB connected')).catch((err) => console.log(err));


app.get('/' , (req , res) => {
    return res.send("Hello from server");
})

app.listen(3000 , () => console.log("Server running on PORT:3000"));

