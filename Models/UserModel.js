const mongoose = require('mongoose')

const {RegistrationSchema} = require('./RegistrationModel')

const UserSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['M','F']
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin','Student'],
    default: "Student",
    required: true,
  },
  registration: [RegistrationSchema],
  learningMode: {
    type: String,
    enum: ["Online", "InPerson"]
  },
  enrolledCourses: [{
    courseName: {
      type: String
    }
  }]
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

module.exports = User