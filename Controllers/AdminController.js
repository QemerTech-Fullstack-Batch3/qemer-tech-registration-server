const bcypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Admin = require('../Models/AdminModel')

exports.SignUp = async (req, res) => {
  const {username, email, password} = req.body
  try {
    const existingAdmin = await Admin.findOne({email})
    if(existingAdmin){
      return res.status(400).send("User already exist.")
    }

    const hashedPassword = await bcypt.hash(password, 10)
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: "Pending"
    })
  } catch (error) {
    
  }
}