const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middlewares/jwt_auth')
const {
  RegisterForCourse,
  GetRegisters,
  GetStudentRegistrationInfo,
  DeleteRegistration,
} = require('../Controllers/RegistrationController')

router.post('/registerforcourse', RegisterForCourse)
router.get('/getregisters', authenticateToken, GetRegisters)
router.get('/getregistrationinfo/:id', GetStudentRegistrationInfo)
router.delete('/deleteregisters/:id', authenticateToken, DeleteRegistration)
module.exports = router 