const Course = require('../Models/CourseModel')

exports.CreateCourse = async (req, res) => {
  
}
exports.GetCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.status(200).send(courses)
  } catch (error) {
    res.status(501).send(error)
  }
}
