const redisClient =require("../config/Redis")



exports.getcashe=async(key)=>{
  
    const data=await redisClient.get(key)
    return data?JSON.parse(data):null

}

exports.setcashe=async(key,value,ttl=60)=>{
    await redisClient.setEx(
        key,
        ttl,
        JSON.stringify(value)
    )
}