const redis = require('redis');

const redisClient = redis.createClient({
    url: 'redis://localhost:6379' 
});

// Connect to Redis
(async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connected');
    } catch (err) {
        console.error('Redis connection error:', err);
    }
})();

// Handle Redis errors
redisClient.on('error', err => console.error('Redis Client Error:', err));

const CacheCourseDetail = async (req, res, next) => { 
    const courseId = req.params.id;

    try {
        if (!redisClient.isOpen) {
            console.log('Redis client is not connected, bypassing cache...');
            return next();
        }

        const data = await redisClient.get(courseId);
        if (data) {
            console.log("Course detail from cache");
            return res.json(JSON.parse(data));
        }
        next();
    } catch (error) {
        console.error('Cache error:', error);
        next();
    }
}

const CacheAllCourses = async (req, res, next) => {
  try {
      if (!redisClient.isOpen) {
          console.log('Redis client is not connected, bypassing cache...');
          return next();
      }

      const data = await redisClient.get('formattedCourses');
      if (data) {
          console.log("Courses from cache");
          return res.json(JSON.parse(data));
      }
      next();
  } catch (error) {
      console.error('Cache error:', error);
      next();
  }
}

const CacheAllPackages = async (req, res, next) => {
  try {
    if(!redisClient.isOpen){
      console.log('Redis client is not connected, bypassing cache...')
      return next()
    }

    const data = await redisClient.get('packages')
    if(data){
      console.log('Packages from cache')
      return res.json(JSON.parse(data))
    }
    next()
  } catch (error) {
    console.error('Cache error:', error)
    next()
  }
}
const CacheAllPackagesWithCourse = async (req, res, next) => {
  try {
    if(!redisClient.isOpen){
      console.log('Redis client is not connected, bypassing cache...')
      return next()
    }

    const data = await redisClient.get('populatedPackages')
    if(data){
      console.log('Package with courses from cache')
      return res.json(JSON.parse(data))
    }
    next()
  } catch (error) {
    console.error('Cache error:', error)
    next()
  }
}
const CachePackage = async (req, res, next) => {
  const packageId = req.params.id
  try {
    if(!redisClient.isOpen){
      console.log('Redis client is not connected, bypassing cache...')
      return next()
    }

    const data = await redisClient.get(packageId)
    if(data){
      console.log('Package detail from cache')
      return res.json(JSON.parse(data))
    }
    next()
  } catch (error) {
    console.error('Cache error:', error)
    next()
  }
}

const CacheAllRegisters = async (req, res, next) => {
  try {
    if(!redisClient.isOpen){
      console.log('Redis cache is disconnected, bypassing cahce...')
      return next()
    }

    const data = await redisClient.get('registers')
    if(data){
      console.log('Registers from cache')
      return res.json(JSON.parse(data))
    }
    next()
  } catch (error) {
    console.error('Cache error:', error)
    next()
  }
}

const CacheRegistrationDetail = async (req, res, next) => {
  const registrationId = req.params.id
  try {
    if(!redisClient.isOpen){
      console.log('Redis cache is not connected, bypassing cahce...')
      return next()
    }

    const data = await redisClient.get(registrationId)
    if(data){
      console.log('Registration detail from cache')
      return res.json(JSON.parse(data))
    }
    next()
  } catch (error) {
    console.error('Cache error:', error)
    next()
  }
}
module.exports = {
    redisClient,
    CacheCourseDetail,
    CacheAllCourses,
    CacheAllPackages,
    CacheAllPackagesWithCourse,
    CachePackage,
    CacheAllRegisters,
    CacheRegistrationDetail
};