const mongoose = require('mongoose')

const RegistrationSchema = mongoose.Schema({
  
}, { timestamps: true })

const Registration = mongoose.model("Registration", RegistrationSchema)

module.exports = Registration