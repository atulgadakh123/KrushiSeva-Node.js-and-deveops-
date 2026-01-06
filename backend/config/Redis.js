const redis=require("redis")


const redisClient=redis.createClient({
    url:"redis://redis:6379"

})
redisClient.on("connect",()=>{
    console.log("Connected to Redis sucessfully")
})

redisClient.on("error",(err)=>{
    console.error("Redis Client Error",err)
})

const connectRedis=async()=>{
  try { await redisClient.connect()
    console.log("Redis connected")
}catch(err){
    conosle.error("Redis connection failed",err)
}


}
connectRedis()


module.exports=redisClient