const express = require('express')
const router = express.Router()

const {
  RegisterForCourse,
  GetRegisters,
  GetStudentRegistrationInfo,
  DeleteRegistration
} = require('../Controllers/RegistrationController')

router.post('/registerforcourse', RegisterForCourse)
router.get('/getregisters', GetRegisters)
router.get('/getregistrationinfo/:id', GetStudentRegistrationInfo)
router.delete('/deleteregisters/:id', DeleteRegistration)

module.exports = router