const jwt = require('jsonwebtoken')
const Registration = require('../Models/RegistrationModel')
const Course = require('../Models/CourseModel')

exports.RegisterForCourse = async (req, res) => {
  try {
    const {fullName, gender, phone, courseId} = req.body
    const isCourseAvaiable = await Course.findOne({_id: courseId}) 
    if(!isCourseAvaiable){
      return res.status(404).send("Course not found.")
    }
    
    const existingStudent = await Registration.findOne({courseId: courseId, phone: phone})
    if(existingStudent){
      return res.status(409).send("Student alreay registred for this course")
    }
  
    const student = new Registration({
      fullName,
      gender,
      phone,
      courseId
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
    const registers = await Registration.find()
    res.status(200).send(registers)
  } catch (error) {
    console.error("Error fetching registrations: ", error)
    res.status(500).send("An error occured while getting registers.")
  }
}

exports.GetStudentRegistrationInfo = async (req, res) => {
  const registrationId = req.params.id 
  const registration = await Registration.findById(registrationId)
  if(!registration){
    res.status(404).send("Registration not found")
  }

  res.status(200).send(registration)
}

exports.DeleteRegistration = async (req, res) => {
  try {
    const registrationId = req.params.id
    const registrationToDelete = Registration.findById(registrationId)

    if(!registrationToDelete){
      return res.status(404).send("Registration not found.")
    }
    await Registration.findByIdAndDelete(registrationId)
    res.status(201).send("Registration deleted Succesfully.")
  } catch (error) {
    console.error("Error deleting registration: ", error)
    res.status(500).send("An error occured while deleteing registration.")
  }
}

