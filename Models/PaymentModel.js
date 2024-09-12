const mongoose = require('mongoose')

const PaymentSchema = mongoose.Schema({
  
}, { timestamps: true })

const Payment = mongoose.model("Payment", PaymentSchema)

module.exports = Payment