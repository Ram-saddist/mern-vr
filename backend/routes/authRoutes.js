const express= require("express")
const router=express.Router() 
const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
const User= require("../models/User")

router.post("/register",async (req,res)=>{
    try{
        const {name,email,password,mobile}=req.body 
        console.log("----------",name,email,password,mobile)
        const existingUser= await User.findOne({email})

        if(existingUser){
            return res.status(401).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name,email,password:hashedPassword,mobile
        })
        return res.status(201).json({message:"User created successfully"})
    }
    catch(err){
        console.log("error from register",err)
        return res.status(500).json({message:"Error in server"})
    }
})

router.post("/login",async (req,res)=>{
    try{
        const {email,password}=req.body 
        let user=await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"User email not found"})
        }
        let isMatch=bcrypt.compare(password,user.hashedPassword)
        if(!isMatch){
            return res.status(401).json({message:"Invalid password"})
        }
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        return res.status(200).json({message:"Login successful",user,token})
    }
    catch(err){
        console.log("from login route",err)
        return res.status(500).json({message:`from login route server error ${err}`})
    }
})



module.exports=router