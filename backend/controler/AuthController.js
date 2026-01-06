const User=require("../model/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const tokenService=require("../services/TokenServic")
// create a new user
exports.register=async(req,res)=>{
    try{
        const{name,email,password,role}=req.body
        const UserExists=await User.findOne({email})
        if(UserExists){
            return res.status(400).json({message:"user already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)

         const user =await User.create({
            
            name,
            email,
            password:hashedPassword,
            role
            
            
         })
         res.status(201).json({message:"User created successfully",user})
    }
    catch (error) {
  console.error("REGISTER ERROR:", error);
  res.status(500).json({
    message: "Internal server error",
    error: error.message
  });
}
}


 exports.login=async(req,res)=>{
     try{
         const {email,password}=req.body
         const exists=await User.findOne({email})
         if(!exists){
             return res.status(400).json({message:"User does not exist"})
         }
         const match=await bcrypt.compare(password,exists.password)
         if(!match){
             return res.status(400).json({message:"Invalid credentials"})
         }
         const token=jwt.sign({id:exists._id,role:exists.role},process.env.KEY,
            {expiresIn:"1h"})

         res.status(200).json({
            message:"Login sucessful",
            user:{
                id:exists.id,
                name:exists.name,
                email:exists.email,
                role:exists.role
            },
            token
         })
        
    }
    catch(err){
        res.status(500).json({message:"Internal server error",error:err.message})
    }
} 

exports.logout=async(req,res)=>{
    try{
        const authHeader=req.headers.authorization

        const token=authHeader.split( " ")[1]
       
        const decoded=jwt.decode(token)
        await tokenService.blacklistToken(token,decoded.exp)

        res.status(200).json({message:"Logout successful"})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}