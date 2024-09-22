const Admin = require('../Models/AdminModel')

const authenticateSuperAdmin = async (req, res, next) => {
  const adminId = req.adminId
  const admin = await Admin.findById(adminId)
  
  if (!admin || admin.role !== "SuperAdmin") {
    return res.status(403).send("Access denied. Only super admins can perform this action.")
  }

  next();
}
module.exports = authenticateSuperAdmin