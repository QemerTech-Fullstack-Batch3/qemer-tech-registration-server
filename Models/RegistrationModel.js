const mongoose = require('mongoose')

const RegistrationSchema = mongoose.Schema({
  studentInfo: {
    name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['M','F']
    },
    email: String,
    phone: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["Admin", "Student"]
    }
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
    enum: ["Online","InPerson"],
    required: true 
  },
}, { timestamps: true })

const Registration = mongoose.model("Registration", RegistrationSchema)

module.exports = Registration