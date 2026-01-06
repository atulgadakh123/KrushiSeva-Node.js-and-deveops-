const express=require("express")
const { register, login, logout } = require("../controler/AuthController")
const routes=express.Router()
 const authMiddalware=require("../middalware/AuthMiddalware")
// const roleMiddleware=require("../middalware/RoleMiddaware")


routes.post("/reg",register)
routes.get("/login",login)
routes.post("/logout",authMiddalware,logout)

module.exports=routes

