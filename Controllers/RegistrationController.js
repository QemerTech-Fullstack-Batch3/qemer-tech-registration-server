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

exports.RegisterForCourse = async (req, res) => {
  try {
    const {studentInfo, courseId, learningMode} = req.body
    const isCourseAvaiable = await Course.findOne({_id: courseId}) 
    if(!isCourseAvaiable){
      return res.status(404).send("Course not found.")
    }
    
    const existingStudent = await Register.findOne({courseId: courseId, studentInfo: studentInfo})
    if(existingStudent){
      return res.status(409).send("Student alreay registred for this course")
    }
  
    const student = new Register({
      studentInfo,
      courseId,
      learningMode
    })
    await student.save()
    res.status(201).send("Student successfully registered for the course!")
  } catch (error) {
    console.error("Error registering for course: ", error)
    res.status(500).send("An error occurred while registering")
  }
}

exports.GetRegisters = async (req, res) => {
  try {
    const registers = await Register.find()
    res.status(200).send(registers)
  } catch (error) {
    console.error("Error getting registers: ", error)
    res.status(500).send("An error occured while getting registers.")
  }
}

exports.GetUserRegistration = async (req, res) => {
  
}

exports.DeleteRegistration = async (req, res) => {
  try {
    const registrationId = req.params.id
    const registrationToDelete = Register.findById(registrationId)

    if(!registrationToDelete){
      return res.status(404).send("Registration not found.")
    }
    await Register.findByIdAndDelete(registrationId)
    res.status(201).send("Registration deleted Succesfully.")
  } catch (error) {
    console.error("Error deleting registration: ", error)
    res.status(500).send("An error occured while deleteing registration.")
  }
}

