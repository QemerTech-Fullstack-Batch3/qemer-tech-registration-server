const express = require('express')
const router = express.Router()

const authenticateToken = require('../Middlewares/jwt_auth')
const {
  CreateCourse,
  GetCourses,
  GetCourseInfo,
  EditCourse,
  DeleteCourse,
  UpdateCourseStatus,
  DeleteCourseCollection,
} = require('../Controllers/CourseController')
const { route } = require('./RegistrationRouter')

router.post('/createcourse', authenticateToken, CreateCourse)
router.get('/getcourses', GetCourses)
router.get('/getspecificcourse/:id', GetCourseInfo)
router.patch('/editcourse/:id', authenticateToken, EditCourse)
// router.patch('/updatestatus/:courseId', UpdateCourseStatus)
// router.delete('/deletecourse/:id', DeleteCourse)
router.delete('/deletecoursecollection', DeleteCourseCollection) 

module.exports = router