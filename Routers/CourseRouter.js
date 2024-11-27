const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middlewares/jwt_auth')
const {checkPermission} = require('../Middlewares/rbacMiddleware')
const errorMiddleware = require('../Middlewares/errorMiddleware')
const {
  CreateCourse,
  GetCourses,
  GetCourseInfo,
  EditCourse,
  UpdateCourseStatus,
} = require('../Controllers/CourseController')

const {
  CacheCourseDetail,
  CacheAllCourses
} = require('../Middlewares/caching')

const { route } = require('./RegistrationRouter')

router.post('/createcourse', authenticateToken, checkPermission('create_record'), CreateCourse, errorMiddleware)
router.get('/getcourses', CacheAllCourses, GetCourses, errorMiddleware)
router.get('/getspecificcourse/:id', CacheCourseDetail, GetCourseInfo, errorMiddleware)
router.patch('/editcourse/:id', authenticateToken, checkPermission('update_record'), EditCourse, errorMiddleware)
router.patch('/updatestatus/:courseId', UpdateCourseStatus, errorMiddleware)

module.exports = router 