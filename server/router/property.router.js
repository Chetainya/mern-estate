const express = require("express");
const PropertyModal = require("../model/property.modal");

const router = express.Router();


router.get('/' , async (req , res , next) => {
    try{
        const data = await PropertyModal.find({});
        if(!data){
            return res.json({
                msg : "No Property Found"
            })
        }
        return res.json(data);
    }catch(err){
        return next({statusCode : '500' , message : "Try again after Some Time"})
    }
})