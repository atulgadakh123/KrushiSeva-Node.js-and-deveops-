const app=require("./app")
const connectDB=require("./config/Db")
const dotenv=require("dotenv")
const http=require("http")
// const Server=require("socket.io")
dotenv.config()

connectDB()
const server=http.createServer(app)
const {Server}=require("socket.io")
const io=new Server(server,{
    cors:{origin:"*"}
})




const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

