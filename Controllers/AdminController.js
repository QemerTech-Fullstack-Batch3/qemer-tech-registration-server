const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const Admin = require('../Models/AdminModel')


const CreateSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await Admin.findOne({ role: 'SuperAdmin' });
    if (existingSuperAdmin) {
      return;
    }
    const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10);

    const superAdmin = new Admin({
      username: 'superadmin',
      password: hashedPassword,
      email: 'superadmin@example.com',
      role: 'SuperAdmin',
      isActive: true
    });

    await superAdmin.save();
    console.log('Super admin created successfully!');
  } catch (error) {
    console.error('Error creating super admin:', error);
  }
}
// CreateSuperAdmin();

exports.CreateAdmin = async (req, res) => {
  if (req.user.role !== 'SuperAdmin') {
    return res.status(403).send('Access denied. Only Super Admin can do this action.'); 
  }
  const { username, email, password, role } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).send("User already exists.");
    }
    if (!password) {
      return res.status(400).send("Password is required.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      role,
      isActive: true
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully!" });

  } catch (error) {
    console.error("Error creating admin: ", error);
    res.status(500).send("An error occurred while creating admin.");
  }
}
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(404).send("Incorrect email or password.")
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (isMatch) {
      const adminInfo = { role: admin.role}
      const accessToken = jwt.sign(adminInfo, process.env.TOKEN_SECRET, { expiresIn: "60m" })
      return res.json({ message: `Welcome, ${admin.username}!`, accessToken, role: admin.role });
    } else {
      return res.status(401).send("Incorrect email or password. Please try again.")
    }
  } catch (error) {
    console.error("Error logging admin: ", error);
    res.status(500).send("An error occurred while logging admin user.");
  }
}

exports.ChangePassword = async (req, res) => {
  if (!['Admin','Registrar'].includes(req.user.role)){
    return res.status(400).send('Access denied')
  }
  const { email, currentPassword, newPassword } = req.body;
  try {
    const admin = await Admin.findOne({email})
    if (!admin) {
      return res.status(404).send("Admin not found.");
    }
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).send("Current password is incorrect.");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();

    res.status(200).send("Password changed successfully.");
  } catch (error) {
    console.error("Error changing admin password: ", error);
    res.status(500).send("An error occurred while changing admin password.");
  }
}



exports.GetAdmins = async (req, res) => {
  if(req.user.role !== "SuperAdmin"){
    return res.status(403).send("Access denied. Only Super admins can perform this action.")
  }
  try {
    const admins = await Admin.find({ role: 'Admin' })
    res.status(200).send({ admins: admins })
  } catch (error) {
    console.error("Error getting admins: ", error)
    res.status(500).send("An error occurrd while fetching admins.")
  } 

}
exports.GetRegistrars = async (req, res) => {
  if(req.user.role !== "SuperAdmin"){
    return res.status(403).send("Access denied. Only super admins can perform this action.")
  }
  try {
    const registrar = await Admin.find({ role: 'Registrar' })
    res.status(200).send({ Registrar: registrar })
  } catch (error) {
    console.error("Error getting registrar: ", error)
    res.status(500).send("An error occurrd while fetching registrar.")
  }
}  
