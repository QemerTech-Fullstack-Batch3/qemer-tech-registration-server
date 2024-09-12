const mongoose = require('mongoose')

const PaymentSchema = mongoose.Schema({
  studentId: {
    type: String,
    required: true 
  },
  courseId: {
    type: String,
    required: true 
  },
  amount: {
    type: Number,
    required: true 
  },
  paymentDate: {
    type: Date,
    default: Date.now,
    required: true 
  },
  paymentStatus: {
    type: String,
    required: true 
  },
}, { timestamps: true })

const Payment = mongoose.model("Payment", PaymentSchema)

module.exports = Payment