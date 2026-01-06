const mongoose=require("mongoose")


const paymentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    amount:{
        type:Number,
        required:true,
        min:100,
        },
         paymentId: {
      type: String,  
      default: null
    },
        status:{
            type:String,
            enum:["pending","completed","failed"],
            default:"pending"

        },
        // purpose: {
        //       type: String,
        //       enum: ["chat", "scan", "subscription"],
        //       default: "subscription"
        //  },

        //paymentId:String,
        orderId:String
},{timestamps:true})

module.exports=mongoose.model("Payment",paymentSchema)