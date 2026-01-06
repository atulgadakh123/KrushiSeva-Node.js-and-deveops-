const express=require("express")
const { createLeaf } = require("../controler/LeafController")
const routes=express.Router()
const uploads=require("../uploads/Multer")
// const PaymentAcess=require("../middalware/PaymentAcessMiddalware")
const authorization=require("../middalware/AuthMiddalware")


routes.post("/leaf",uploads.single("image"),authorization,createLeaf)


module.exports=routes

