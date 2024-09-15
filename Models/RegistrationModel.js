const mongoose = require('mongoose')

const RegistrationSchema = mongoose.Schema({
  studentId: {
    type: String,
    required: true 
  },
  courseId: {
    type: String,
    required: true 
  },
  registrationDate: {
    type: Date,
    default: Date.now,
    required: true 
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "NotPaid"],
    default: "NotPaid",
    required: true 
  },
  learningMode: {
    type: String,
    required: true 
  },
}, { timestamps: true })

const Registration = mongoose.model("Registration", RegistrationSchema)

module.exports = {RegistrationSchema, Registration}