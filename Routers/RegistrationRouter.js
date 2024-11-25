const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middlewares/jwt_auth')
const {
  RegisterForCourse,
  GetRegisters,
  GetStudentRegistrationInfo,
  DeleteRegistration,
} = require('../Controllers/RegistrationController')

const {
  CacheAllRegisters,
  CacheRegistrationDetail
} = require('../Middlewares/caching')

router.post('/registerforcourse', RegisterForCourse)
router.get('/getregisters', authenticateToken, CacheAllRegisters, GetRegisters)
router.get('/getregistrationinfo/:id', CacheRegistrationDetail,GetStudentRegistrationInfo)
router.delete('/deleteregisters/:id', authenticateToken, DeleteRegistration)
module.exports = router 