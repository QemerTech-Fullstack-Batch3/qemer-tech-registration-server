const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middlewares/jwt_auth')
const {checkPermission} = require('../Middlewares/rbacMiddleware')

const {
  CreateCourse,
  GetCourses,
  GetCourseInfo,
  EditCourse,
  UpdateCourseStatus,
} = require('../Controllers/CourseController')
const { route } = require('./RegistrationRouter')

router.post('/createcourse', authenticateToken, checkPermission('create_record'),CreateCourse)
router.get('/getcourses', GetCourses)
router.get('/getspecificcourse/:id', GetCourseInfo)
router.patch('/editcourse/:id', authenticateToken, checkPermission('update_record'), EditCourse)
router.patch('/updatestatus/:courseId', UpdateCourseStatus)

module.exports = router 