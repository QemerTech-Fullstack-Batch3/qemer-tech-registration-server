const express = require('express')
const router = express.Router()

const {
  Register,
  RegisterForCourse,
  GetRegisters,
  DeleteRegistration
} = require('../Controllers/RegistrationController')

router.post('/register', Register)
router.post('/registerforcourse', RegisterForCourse)
router.get('/getregisters', GetRegisters)
router.delete('/deleteregisters/:id', DeleteRegistration)

module.exports = router