const Course = require('../Models/CourseModel')

exports.CreateCourse = async (req, res) => {
  try {
    const {courseName, duration, description, price} = req.body
    const course = new Course({courseName, duration, description, price})
    
    await course.save()
    res.status(201).send(course)
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
    console.error('Error fetching courses:', error)
    res.status(501).send(error)
  }
}
exports.GetCourseInfo = async (req, res) => {
  try {
    const courseId = req.params.id 
    const course = await Course.findById(courseId)
    if(!course){
      return res.status(404).send("Course not found.")
    }

    res.status(200).send(course)
  } catch (error) {
    console.error('Error while fetching a specific course:', error)
    res.status(501).send("An error occured while getting a specific course info")
  }
}

exports.EditCourse = async (req, res) => {
  try {
    const {courseName, duration, description, price, schedule} = req.body
    const courseId = req.params.id 
    const course = await Course.findById(courseId)
    if(!course){
      return res.status(404).send("Course not found")
    }

    const editCourse = await Course.findByIdAndUpdate(
      courseId,
      {courseName, duration, description, price, schedule},
      {new: true}
    )
    res.status(200).send(editCourse)
  } catch (error) {
    console.error("Error while updating a course: ", error)
    res.status(501).send("An error occured updating a course")
  }
}

exports.DeleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id 
    const course = Course.findById(courseId)
    if(!course){
      return res.status(404).send("Course not found")
    }

    await Course.findByIdAndDelete(courseId)
    res.status(200).send("Course Succesfully deleted.")
  } catch (error) {
    console.error("Error while deleting a course", error)
    res.status(501).send("An error occured deleting a course")
  }
}