const express =require("express")
const userRoutes=require("./routes/UserRoutes")
const AuthRoutes=require("./routes/AuthRoutes")
const LeafRoute=require("./routes/LeafRoute")
const paymentRoutes=require("./routes/PaymentRoutes")
const ChatRoutes=require("./routes/ChatRoutes")
const app=express()
app.use (express.json())

app.use("/",userRoutes)
app.use("/",AuthRoutes)
app.use("/",LeafRoute)
app.use("/",paymentRoutes)
app.use("/",ChatRoutes)



app.use("/health",(req,res)=>{
    res.status(200)
    .json({
        status:"OK",
        message:"Server is healthy"
    })

})

module.exports=app