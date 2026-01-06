const express=require("express")
const { createPayment, verifyPayment, getAllPayments } = require("../controler/PaymentController")
const routes=express.Router()
const authmiddalware=require("../middalware/AuthMiddalware")


routes.post("/payment",authmiddalware,createPayment)
routes.post("/verify",authmiddalware,verifyPayment)
routes.get("/paymentget",getAllPayments)

module.exports=routes