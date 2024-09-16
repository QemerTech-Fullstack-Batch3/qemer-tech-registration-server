const bcypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../Models/UserModel')

exports.Register = async (req, res) => {
  try {
    const {name, gender, email, phone, role, learningMode} = req.body
    const existingUser = await User.findOne({phone: phone})
    if(existingUser){
      return res.status(501).send("Phone number already exists")
    }

    
  } catch (error) {
    
  }
}