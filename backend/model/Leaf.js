const mongoose=require("mongoose")

const leafSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    disease:{
        type:String,
        required:true,

    },
    cause:{
        type:String,
        required:true
    },
    farmer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Farmer",
    }
},{timestamps:true})

module.exports=mongoose.model("Leaf",leafSchema)