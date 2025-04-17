const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middlewares/jwt_auth')
const {checkPermission} = require('../Middlewares/rbacMiddleware')
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
router.get('/getregisters', checkPermission('read_record'), authenticateToken, GetRegisters)
router.get('/getregistrationinfo/:id', GetStudentRegistrationInfo)
router.delete('/deleteregisters/:id', authenticateToken, checkPermission('delete_record'), DeleteRegistration)
module.exports = router 