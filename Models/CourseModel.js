const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
  courseId: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  schedule: {
    type: String,
    required: true
  },
}, {timestamps: true})

const Course = mongoose.model("Course", CourseSchema)

module.exports = {CourseSchema, Course}