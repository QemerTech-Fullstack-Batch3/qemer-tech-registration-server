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
    required: true,
    unique: true
  },
  havePc: { 
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  CityOfResidence: {
    type: String,
    enum: ["Addis Ababa", "Outside Addis Ababa"],
    required: function() { return this.learningMode === 'InPerson'; }
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "NotPaid"],
    default: "NotPaid",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }
}, { timestamps: true })

const Registration = mongoose.model("Registration", RegistrationSchema)

module.exports = Registration