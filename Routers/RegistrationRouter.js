const express = require('express')
const router = express.Router()

const {
  Register,
  RegisterForCourse
} = require('../Controllers/RegistrationController')

router.post('/register', Register)
router.post('/registerforcourse', RegisterForCourse)

module.exports = router