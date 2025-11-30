const redisClient = require("../config/redis");

const cache = (keyPrefix) => {
  return async (req, res, next) => {
    try {
      // Build unique key using URL query + params
      const key = keyPrefix + ":" + JSON.stringify({
        params: req.params,
        query: req.query
      });

      // Check cache
      const cachedData = await redisClient.get(key);
      if (cachedData) {
        console.log("⚡ Redis Cache Hit");
        return res.json(JSON.parse(cachedData));
      }

      // Hijack res.json to store data after controller responds
      const oldJson = res.json.bind(res);
      res.json = async (data) => {
        await redisClient.setEx(key, 60, JSON.stringify(data)); // Cache for 60s
        oldJson(data);
      };

      next();
    } catch (err) {
      console.error("Redis cache error:", err);
      next();
    }
  };
};

module.exports = { cache };
