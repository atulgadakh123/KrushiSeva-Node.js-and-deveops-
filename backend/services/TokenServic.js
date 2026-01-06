const redisClient = require("../config/Redis");

exports.blacklistToken = async (token, exp) => {
  // exp is JWT expiry time in seconds
  const currentTime = Math.floor(Date.now() / 1000);
  const ttl = exp - currentTime;

  if (ttl > 0) {
    await redisClient.setEx(`bl:${token}`, ttl, "blacklisted");
  }
};

exports.isTokenBlacklisted = async (token) => {
  const result = await redisClient.get(`bl:${token}`);
  return result === "blacklisted";
};
