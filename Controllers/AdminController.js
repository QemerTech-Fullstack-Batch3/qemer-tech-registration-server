const bcypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Admin = require('../Models/AdminModel')

exports.SignUp = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return res.status(400).send("User already exist.")
    }

    const hashedPassword = await bcypt.hash(password, 10)
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: "Pending",
      isActive: false
    })
    await newAdmin.save()
    res.status(201).json({ message: "Registration successful! Awaiting role assignment by super admin." })

  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).send("An error occurred while registering the user.");
  }
}

exports.AssignRole = async (req, res) => {
  const {adminId} = req.params
  const {role} = req.body

  const adminRole = ['admin','registrar']
  try {
    if(!adminRole.includes(role)){
      return res.status(400).send("Invalid role assigned.")
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { role, isActive: true },
      { new: true }
    );

    if(!updatedAdmin){
      return res.status(404).send("Admin not found")
    }

    res.status(200).json({ message: "Role assigned successfully!", admin: updatedAdmin });
  } catch (error) {
    console.error("Error assigning role: ", error);
    res.status(500).send("An error occurred while assigning the role.");
  }

}