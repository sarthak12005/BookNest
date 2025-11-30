const redisClient = require("../config/redis");

const cache = (keyPrefix) => {
    return async (req, res, next) => {
        try {
            const key = keyPrefix + JSON.stringify(req.params);

            const cachedData = await redisClient.get(key);

            if (cachedData) {
                return res.json(JSON.parse(cachedData));
            }

            const originalSend = res.json.bind(res);
            res.json = async (data) => {
                await redisClient.setEx(key, 60, JSON.stringify(data));
                originalSend(data);
            };

            next();
        } catch (error) {
            console.error("❌ Error in cache middleware:", error);
            next(); 
        }
    };
};

module.exports = { cache };
