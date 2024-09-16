const jwt = require('jsonwebtoken')
const Register = require('../Models/RegistrationModel')
const Course = require('../Models/CourseModel')

exports.Register = async (req, res) => {
  try {
    const {studentId, courseId, registrationDate, paymentStatus, learningMode} = req.body

    const isCourseAvaiable = await Course.findOne({courseId: courseId}) 
    if(!isCourseAvaiable){
      return res.status().send("Course not found.")
    }

    const studRegistered = await Register.findOne({studentId: studentId ,courseId: courseId})

    if(studRegistered){
      return res.status(409).send("Student already registered for this course.")
    }

    const newRegistration = {studentId, courseId, registrationDate, paymentStatus, learningMode}
    await newRegistration.create()

    res.status(201).send("Student successfully registered for the course!")
  } catch (error) {
    res.status(500).send("An error occurred while registering.")
  }
}

