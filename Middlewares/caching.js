const redis = require('redis')
const redisClient = redis.createClient()

exports.CacheCourseDetail = async (req, res, next) => {
  const courseId = req.params.id 
  try {
    const data = await redisClient.get(courseId)
    if(data){
      console.log("Serving from cache")
      return res.json(JSON.parse(data))
    }
  } catch (error) {
    console.log(error)
  }
}