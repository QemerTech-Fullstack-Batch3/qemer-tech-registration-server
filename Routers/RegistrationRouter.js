const express = require('express')
const router = express.Router()

const {
  Register,
  RegisterForCourse,
  GetRegisters
} = require('../Controllers/RegistrationController')

router.post('/register', Register)
router.post('/registerforcourse', RegisterForCourse)
router.get('/getregisters', GetRegisters)

module.exports = router