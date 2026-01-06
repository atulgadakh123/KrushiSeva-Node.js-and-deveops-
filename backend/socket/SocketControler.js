

const Chat = require("../model/Chat");
const RedisClient = require("../config/Redis");
const User = require("../model/User");
const Payment = require("../model/Payment");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("sendMessage", async (data) => {
      try {
        const { sender, receiver, message } = data;

      
        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);

        if (!senderUser || !receiverUser) {
          return; 
        }

        

        
        if (
          senderUser.role === "farmer" &&
          receiverUser.role !== "expert"
        ) {
          return;
        }

      
        if (senderUser.role === "farmer") {
          const payment = await Payment.findOne({
            user: sender,
            status: "success"
          });

          if (!payment) {
            return;
          }
        }

       
        const chat = await Chat.create({
          sender,
          receiver,
          message
        });

        
        await RedisClient.set(
          `lastMessage:${sender}:${receiver}`,
          message
        );

       
        io.emit("receiveMessage", chat);

      } catch (error) {
        console.error("Chat socket error:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
