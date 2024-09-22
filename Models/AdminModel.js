const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
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
    enum: ["SuperAdmin", "Admin", "Registrar", "Pending"],
    default: "Pending"
  },
  permissions: {
    type: [String]
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin