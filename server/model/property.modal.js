const mongoose = require("mongoose");


const propertySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true,
    },
    price : {
        type : String,
        required : true,
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
} , {timestamps : true});

const PropertyModal = mongoose.model('property' , propertySchema);

module.exports = PropertyModal;