const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true 
  },
  role: {
    type: String,
    enum: ["superAdmin", "courseManager", "registrar"],
    default: "courseManager"
  },
  permissions: {
    type: [String]
  }
}, {timestamps: true})

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin