const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.URL)
       console.log("MOngoDB connected sucessfully")
    }catch(err){
        console.log("Error in DB connection",err)
    }
}

module.exports=connectDB