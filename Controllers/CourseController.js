const Course = require('../Models/CourseModel')

exports.CreateCourse = async (req, res) => {
  try {
    const {courseName, duration, description, price, schedule} = req.body
    const course = await Course.create({courseName, duration, description, price, schedule})
    res.send(course)
  } catch (error) {
    console.error("Error creating course:", error)
    res.status(500).send("An error occured while creating a course")
  }
}
exports.GetCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.status(200).send(courses)
  } catch (error) {
    res.status(501).send(error)
  }
}
