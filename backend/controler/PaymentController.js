const Payment=require("../model/Payment")

exports.createPayment=async(req,res)=>{
    try{
        const{amount}=req.body

        const payment=await Payment.create({
            user:req.user.id,
            amount
        })
        res.status(201).json(
           { 
            message:"payment created successfully",
             user:req.user.id,
            payment,
            // paymentId
        }
        )
    }catch(error){
        res.status(500).json({message:"Error creating payment",error})
    }
}

exports.verifyPayment=async(req,res)=>{
    try{
        const{paymentId}=req.body
        if(!paymentId){
            return res.status(400).json({
                message:"payment is required"
            })
        }

        const payment=await Payment.findOne({
            user:req.user.id,
            status:"pending"
        } )
        payment.paymentId="dummy",
        payment.status="completed"

        await payment.save();
        res.status(200).json({message:"Payment verified successfully",payment})
    }catch(err){
        res.status(500).json({message:"Error verifying payment",error:err.message})
    }
}

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "name email role");

    res.status(200).json({
      payments
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching all payments",
      error: error.message
    });
  }
};
