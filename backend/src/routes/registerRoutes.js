const express = require("express");
const User = require('../models/user');

const router = express.Router();

router.post('/register',async(req,res)=>{
    const {clerkUserId,email}= req.body;

    if(!clerkUserId || !email){
        return res.status(400).json({error:'Missing required fields'});
    } 

    try{
        const existingUser= await User.findOne({clerkUserId});

        if(existingUser){
            return res.status(200).json({message:'User alredy exists'});
        }

        const newUser = new User({clerkUserId,email})
        await newUser.save();

        res.status(201).json({message:"User saved to DB"});

    }catch(error){
        res.status(500).json({ error:'Server error',error});
    }
});

module.exports=router;