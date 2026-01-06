const express = require("express")
const Chat = require("../model/Chat")
const authMiddleware = require("../middalware/AuthMiddalware")
const paymentMiddleware = require("../middalware/PaymentMiddalware")

const routes = express.Router()


routes.post(
  "/chat",
  authMiddleware,
  paymentMiddleware,
  async (req, res) => {
    try {
      const { receiver, message } = req.body   

      const chat = await Chat.create({          
        sender: req.user.id,
        receiver,
        message
      })

      res.status(201).json({
        message: "Chat created successfully",
        chat
      })
    } catch (error) {
      res.status(500).json({
        message: "Error creating chat",
        error: error.message
      })
    }
  }
)


routes.get(
  "/chat",  
  authMiddleware,
  paymentMiddleware,
  async (req, res) => {
    try {
      const chats = await Chat.find({
        $or: [
          {
            sender: req.user.id,
            receiver: req.params.expertId
          },
          {
            sender: req.params.expertId,
            receiver: req.user.id
          }
        ]
      }).sort({ createdAt: 1 })

      res.status(200).json({
        message: "Chats fetched successfully",
        chats
      })
    } catch (error) {
      res.status(500).json({
        message: "Error fetching chats",
        error: error.message
      })
    }
  }
)

module.exports = routes
