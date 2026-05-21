const redisClient = require("../config/redis");

const cache = ({
  keyPrefix = "cache",
  ttl = 60,
} = {}) => {
  return async (req, res, next) => {
    try {

      // create unique cache key
      const cacheKey = `${keyPrefix}:${req.originalUrl}`;

      // check cache
      const cachedData = await redisClient.get(cacheKey);
      const cachedDataJson = JSON.parse(cachedData);

      if (cachedData) {
        return res.status(200).json({
          success: true,
          source: "redis-cache",
          message: cachedDataJson.message,
          data: cachedDataJson.data,
        });
      }
      // store original json method
      const originalJson = res.json.bind(res);

      // override res.json
      res.json = async (data) => {
        try {
          await redisClient.setEx(
            cacheKey,
            ttl,
            JSON.stringify(data)
          );
        } catch (err) {
          console.error("Redis SET Error:", err);
        }

        return originalJson(data);
      };

      next();

    } catch (error) {
      console.error("❌ Cache Middleware Error:", error);
      next();
    }
  };
};

module.exports = cache;