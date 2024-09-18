const express = require('express')
const router = express.Router()

const {
  CreateCourse,
  GetCourses,
  GetCourseInfo,
  EditCourse,
  DeleteCourse,
} = require('../Controllers/CourseController')
const { route } = require('./RegistrationRouter')

router.post('/createcourse', CreateCourse)
router.get('/getcourses', GetCourses)
router.get('/getspecificcourse/:id', GetCourseInfo)
router.patch('/editcourse/:id', EditCourse)
router.delete('/deletecourse/:id', DeleteCourse)

module.exports = router