const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middlewares/jwt_auth')
<<<<<<< HEAD
const {checkPermission} = require('../Middlewares/rbacMiddleware')

=======
const errorMiddleware = require('../Middlewares/errorMiddleware')
>>>>>>> Error-Handling-Middleware
const {
  CreateCourse,
  GetCourses,
  GetCourseInfo,
  EditCourse,
  UpdateCourseStatus,
} = require('../Controllers/CourseController')
const { route } = require('./RegistrationRouter')

<<<<<<< HEAD
router.post('/createcourse', authenticateToken, checkPermission('create_record'),CreateCourse)
router.get('/getcourses', GetCourses)
router.get('/getspecificcourse/:id', GetCourseInfo)
router.patch('/editcourse/:id', authenticateToken, checkPermission('update_record'), EditCourse)
router.patch('/updatestatus/:courseId', UpdateCourseStatus)
=======
router.post('/createcourse', authenticateToken, CreateCourse, errorMiddleware)
router.get('/getcourses', GetCourses, errorMiddleware)
router.get('/getspecificcourse/:id', GetCourseInfo, errorMiddleware)
router.patch('/editcourse/:id', authenticateToken, EditCourse, errorMiddleware)
router.patch('/updatestatus/:courseId', UpdateCourseStatus, errorMiddleware)
>>>>>>> Error-Handling-Middleware

module.exports = router 