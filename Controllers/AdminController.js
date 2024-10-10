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
CreateSuperAdmin();

exports.LogInSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body
    const superAdmin = await Admin.findOne({ email })
    if (!superAdmin) {
      return res.status(404).send("Incorrect email or password.")
    }

    const isMatch = await bcrypt.compare(password, superAdmin.password)
    if (isMatch) {
      const superAdminInfo = { role: superAdmin.role } 
      const accessToken = jwt.sign(superAdminInfo, process.env.TOKEN_SECRET, { expiresIn: "30m" }) 
      return res.json({ message: `Welcome, ${superAdmin.name}!`, accessToken });
    } else {
      return res.status(401).send("Incorrect email or password. Please try again.")
    }
  } catch (error) {
    console.error("Error logging super admin: ", error);
    res.status(500).send("An error occurred while logging superadmin user.");
  }
}

exports.SignUp = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return res.status(400).send("User already exist.")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
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

exports.CreateAdmin = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (req.user.role !== 'SuperAdmin') {
      return res.status(403).send('Access denied. Only Super Admin can do this action.');
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).send("User already exists.");
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
      const adminInfo = { role: admin.role }
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
exports.ChangeAdminPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const admin = await Admin.findById(req.user.id);
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

exports.AssignRole = async (req, res) => {
  const { adminId } = req.params
  const { role } = req.body

  const adminRole = ['Admin', 'Registrar']
  try {
    if(req.user.role !== "SuperAdmin"){
      return res.status(403).send("Access denied. Only super admins can perform this action.")
    }
    
    if (!adminRole.includes(role)) {
      return res.status(400).send("Invalid role assigned.")
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { role, isActive: true },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).send("Admin not found")
    }

    res.status(200).json({ message: "Role assigned successfully!", admin: updatedAdmin });
  } catch (error) {
    console.error("Error assigning role: ", error);
    res.status(500).send("An error occurred while assigning the role.");
  }
}

exports.GetUsersInPending = async (req, res) => {
  try {
    if(req.user.role !== "SuperAdmin"){
      return res.status(403).send("Access denied. Only super admins can perform this action.")
    }
    const usersInPending = await Admin.find({ role: 'Pending' })
    res.status(200).send({ UsersInPending: usersInPending })
  } catch (error) {
    console.error("Error getting usersInPending: ", error)
    res.status(500).send("An error occurrd while fetching usersInPending.")
  }

}

exports.GetAdmins = async (req, res) => {
  try {
    if(req.user.role !== "SuperAdmin"){
      return res.status(403).send("Access denied. Only Super admins can perform this action.")
    }
    const admins = await Admin.find({ role: 'Admin' })
    res.status(200).send({ admins: admins })
  } catch (error) {
    console.error("Error getting admins: ", error)
    res.status(500).send("An error occurrd while fetching admins.")
  } 

}
exports.GetRegistrars = async (req, res) => {
  try {
    if(req.user.role !== "SuperAdmin"){
      return res.status(403).send("Access denied. Only super admins can perform this action.")
    }
    const registrar = await Admin.find({ role: 'Registrar' })
    res.status(200).send({ Registrar: registrar })
  } catch (error) {
    console.error("Error getting registrar: ", error)
    res.status(500).send("An error occurrd while fetching registrar.")
  }
}  
