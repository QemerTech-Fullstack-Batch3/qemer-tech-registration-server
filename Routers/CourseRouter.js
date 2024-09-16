const express = require('express')
const router = express.Router()

const {
  CreateCourse,
  GetCourses,
} = require('../Controllers/CourseController')

router.post('/createcourse', CreateCourse)
router.get('/getcourses', GetCourses)

module.exports = router