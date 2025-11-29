const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
});

redisClient.on("connect", () => {
    console.log("redis client Connected successfully");
})

redisClient.on("error", (err) => {
    console.error("❌ Redis connection error:", err);
});

// ❗ FIX: wrap connect inside a function
async function connectRedis() {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error("Redis connection failed:", err);
    }
}

connectRedis();


module.exports = redisClient;