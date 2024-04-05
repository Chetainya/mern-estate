const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    userName : {
        type : String,
        required : true
    },
    email : {
        type : password,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    }

} , {timestamps : true})


const userModal = mongoose.model("user" , userSchema);

exports.default = userModal;