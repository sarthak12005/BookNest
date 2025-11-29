const redisClient = require("../config/redis");

const cache = (keyPrefix) => {
    return async (req, res, next) => {
        try {
            const key = keyPrefix + JSON.stringify(req.params);

            const cachedData = await redisClient.get(key);

            if (cachedData) {
                console.log("⚡ Serving from Redis cache");
                return res.json(JSON.parse(cachedData));
            }

            // Override res.json to store data in cache
            const originalSend = res.json.bind(res);
            res.json = async (data) => {
                await redisClient.setEx(key, 60, JSON.stringify(data));
                originalSend(data);
            };

            next();
        } catch (error) {
            console.error("❌ Error in cache middleware:", error);
            next(); // continue even if redis fails
        }
    };
};

module.exports = { cache };
