const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middlewares/jwt_auth')
const {
  RegisterForCourse,
  GetRegisters,
  GetStudentRegistrationInfo,
  DeleteRegistration,
  DeleteRegistrationCollection
} = require('../Controllers/RegistrationController')

router.post('/registerforcourse', RegisterForCourse)
router.get('/getregisters', authenticateToken, GetRegisters)
router.get('/getregistrationinfo/:id', GetStudentRegistrationInfo)
router.delete('/deleteregisters/:id', authenticateToken, DeleteRegistration)
router.delete('/deleteregistrationcollection', authenticateToken, DeleteRegistrationCollection)

module.exports = router 