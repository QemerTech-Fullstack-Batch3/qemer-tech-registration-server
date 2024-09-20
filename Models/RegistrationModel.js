const mongoose = require('mongoose')

const RegistrationSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male","Female"],
    required: true
  },
  phone: {
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
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "NotPaid"],
    default: "NotPaid",
  }
}, { timestamps: true })

const Registration = mongoose.model("Registration", RegistrationSchema)

module.exports = Registration