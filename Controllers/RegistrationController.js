const jwt = require('jsonwebtoken')
const axios = require('axios')
const Registration = require('../Models/RegistrationModel')
const Course = require('../Models/CourseModel')

exports.RegisterForCourse = async (req, res) => {
  try {
    const {fullName, gender, phone, havePc, CityOfResidence, courseId} = req.body

    //course check
    const course = await Course.findById(courseId)
    if(!course){
      return res.status(404).send("Course not found.")
    }
    const currentRegistrations = await Registration.countDocuments({ courseId });
    if (course.learningMode === "InPerson" && currentRegistrations >= course.spotLimit) {
      return res.status(409).json({ message: "The course has reached its spot limit. No more students can register." });
    }
    //student check
    const existingStudent = await Registration.findOne({
      courseId: courseId, 
      phone: phone
    })
    if(existingStudent){
      return res.status(409).send("Student already registered for this course")
    }
  
    const newRegistration = new Registration({
      fullName,
      gender,
      phone,
      havePc,
      CityOfResidence,
      courseId,
      learningMode: course.learningMode
    })
    await newRegistration.save()

    if(course.learningMode === "InPerson") {
      try {
        await axios.patch(`http://localhost:5000/${courseId}`);
      } catch (error) {
        console.error("Error in updating course status:", error.response ? error.response.data : error.message);
      }
    }

    const successMessage = {
      title: "Registration Successful!",
      message: "Thank you for registering. We've received your information and will contact you shortly with further details.",
      nextSteps: [
        "Stay tuned we will contact you."
      ]
    };
    
    res.status(201).json({ message: "Registration successful", data: successMessage });

  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: "An error occurred during registration", error: error.message });
  }
}

exports.GetRegisters = async (req, res) => {
  try {
    if (!["Admin","SuperAdmin"].includes(req.user.role)){
      return res.status(403).send('Access denied. Only admins can perform this action.')
    }
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
    if (!["Admin","SuperAdmin"].includes(req.user.role)){
      return res.status(403).send('Access denied. Only admins can perform this action.')
    }

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

exports.DeleteRegistrationCollection = async (req, res) => {
  try {
    if (!["Admin","SuperAdmin"].includes(req.user.role)){
      return res.status(403).send('Access denied. Only admins can perform this action.')
    }
    await Registration.deleteMany()
    res.status(200).send("Registration collection sucessfully deleted.")
  } catch (error) {
    console.error("Error deleteing registration collection.")
    res.status(500).send("An error occured while deleting the delete collection.")
  }
}

