const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middlewares/jwt_auth')
const {
  CreateCourse,
  GetCourses,
  GetCourseInfo,
  EditCourse,
  UpdateCourseStatus,
} = require('../Controllers/CourseController')

const {
  CacheCourseDetail
} = require('../Middlewares/caching')

const { route } = require('./RegistrationRouter')
  
router.post('/createcourse', authenticateToken, CreateCourse)
router.get('/getcourses', GetCourses)
router.get('/getspecificcourse/:id', CacheCourseDetail, GetCourseInfo)
router.patch('/editcourse/:id', authenticateToken, EditCourse)
router.patch('/updatestatus/:courseId', UpdateCourseStatus)

module.exports = router 