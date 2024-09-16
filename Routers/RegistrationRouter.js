const express = require('express')
const router = express.Router()

const {
  Register
} = require('../Controllers/RegistrationController')

router.post('/register', Register)

module.exports = router