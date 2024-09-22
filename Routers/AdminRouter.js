const express = require('express')
const router = express.Router()

const authenticateSuperAdmin = require('../Middlewares/authenticateSuperAdmin')

const {
  SignUp,
  AssignRole
} = require('../Controllers/AdminController')

router.post('/signup', SignUp)
router.patch('/assign-role:adminId', authenticateSuperAdmin, AssignRole)

module.exports = router