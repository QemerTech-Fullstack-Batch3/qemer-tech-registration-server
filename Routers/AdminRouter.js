  const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middlewares/jwt_auth')

const {
  GetAdmins,
  Login,
  GetRegistrars,
  CreateAdmin,
  ChangePassword
} = require('../Controllers/AdminController')


router.post('/login', Login)  
router.post('/createadmin', authenticateToken, CreateAdmin)
router.patch('/changepassword', authenticateToken, ChangePassword)
router.get('/getadmins', authenticateToken, GetAdmins)
router.get('/getregistrars', authenticateToken, GetRegistrars)

module.exports = router 