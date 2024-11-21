const redis = require('redis')
const {ClientClosedError} = require('redis')
let redisClient;

try {
  redisClient = redis.createClient(6379);
  redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
    // Handle connection errors gracefully (e.g., retry logic)
  });
} catch (error) {
  console.error('Error creating Redis client:', error);
  // Handle initial connection errors
}

const CacheCourseDetail = async (req, res, next) => { 
  const courseId = req.params.id;

  try {
    const data = await redisClient.get(courseId);
    if (data) {
      console.log("Course detail from cache");
      return res.json(JSON.parse(data));
    }
  } catch (error) {
    if (error instanceof ClientClosedError) {
      console.error('Redis client closed, bypassing cache...');
    } else {
      console.error('Error fetching data from cache:', error);
    }
  }

  next();
}

module.exports = {
  redisClient,
  CacheCourseDetail,
};