const { createClient } = require('redis');

const REDIS_URL =
  process.env.NODE_ENV === 'development' ? process.env.REDIS_URL : process.env.REDIS_PRODUCTION_URL;

const redisClient = createClient({
  url: REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('connect', () => {
  console.log('redis client Connected successfully');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

async function connectRedis() {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Redis connection failed:', err);
  }
}

connectRedis();

module.exports = redisClient;
