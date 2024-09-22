const express = require('express')
const router = express.Router()

const authenticateSuperAdmin = require('../Middlewares/authenticateSuperAdmin')

const {
  SignUp,
  AssignRole,
  GetAdmins,
  Login,
  LogInSuperAdmin
} = require('../Controllers/AdminController')
const { GetRegisters } = require('../Controllers/RegistrationController')

router.post('/loginSuperAdmin', LogInSuperAdmin)
router.post('/signup', SignUp) // users other than SuperAdmin
router.post('/login', Login)  // users other than SuperAdmin
router.patch('/assign-role:adminId', authenticateSuperAdmin, AssignRole)
router.get('/getadmins', authenticateSuperAdmin, GetAdmins)
router.get('/getregistrar', authenticateSuperAdmin, GetRegisters)

module.exports = router