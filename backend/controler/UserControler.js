const User=require("../model/User")


// create a new user
exports.create=async(req,res)=>{
    try{
    
        const user= await User.create(req.body)
         res.status(201).json({message:"User created successfully",user})
    }
    catch(err){
        res.status(500).json({message:"Internal server error"})
    }
}


 exports.getAllUsers=async(req,res)=>{
     try{
           const users=await User.find()
        res.status(200).json({
                users
        })
    }
    catch(err){
        res.status(500).json({message:"Internal server error",error:err.message})
    }
} 

exports.getUserBYId=async(req,res)=>{
    try{
        const userId=await User.findById(req.params.id)
        if(!userId){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(userId)
        
    }catch(err){
        res.status(500).json({
            message:"Internal server error", error:err.message
        })
    }
}

exports.updateUser=async(req,res)=>{
    try{
        const userid=await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators: true }
        ).select("-password")
        res.staus(200).json({
            message:"User updated successfully",
            userid
        })
    }catch(err){
        res.status(500)
        .json({message:"Internal server error",error:err.message})
    }
}

exports.deleteUser=async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"User deleted successfully"})
    }
    catch(err){
        res.status(500).json({message:"Internal server error",error:err.message})
    }
}