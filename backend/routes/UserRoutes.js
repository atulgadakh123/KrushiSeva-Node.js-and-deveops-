const express=require("express")
const { create, getAllUsers, updateUser, getUserBYId, deleteUser } = require("../controler/UserControler")
const authMiddalware=require("../middalware/AuthMiddalware")
const roleMiddleware=require("../middalware/RoleMiddaware")
const router=express.Router()


router.post("/create",create)
  router.get ("/user",authMiddalware,roleMiddleware(["admin"]),getAllUsers) 
  router.get("/user/:id",authMiddalware,getUserBYId)
  router.put("/user/:id",authMiddalware,updateUser)
  router.delete("/user/:id",authMiddalware,roleMiddleware(["admin"]),deleteUser)

module.exports=router 