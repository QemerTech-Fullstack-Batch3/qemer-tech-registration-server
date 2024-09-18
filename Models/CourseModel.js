const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
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
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true
  },
}, {timestamps: true})

const Course = mongoose.model("Course", CourseSchema)

module.exports = Course