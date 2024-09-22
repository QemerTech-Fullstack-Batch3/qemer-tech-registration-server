const express = require('express')
const router = express.Router()

const authenticateSuperAdmin = require('../Middlewares/authenticateSuperAdmin')
const authenticateToken = require('../Middlewares/jwt_auth')

const {
  SignUp,
  AssignRole,
  GetAdmins,
  Login,
  LogInSuperAdmin,
  GetUsersInPending,
  GetRegistrars
} = require('../Controllers/AdminController')

router.post('/loginSuperAdmin', LogInSuperAdmin)
router.post('/signup', SignUp) // users other than SuperAdmin
router.post('/login', Login)  // users other than SuperAdmin
router.get('/getuserinpending', authenticateToken, GetUsersInPending)
router.patch('/assignrole/:adminId', authenticateToken, AssignRole)
router.get('/getadmins', authenticateToken, GetAdmins)
router.get('/getregistrars', authenticateToken, GetRegistrars)

module.exports = router