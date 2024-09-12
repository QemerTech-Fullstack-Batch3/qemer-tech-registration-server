const mongoose = require('mongoose')

const ScheduleSchema = mongoose.Schema({
  courseId: {
    type: String,
    required: true 
  },
  startDate: {
    type: Date,
    required: true 
  },
  endDate: {
    type: Date,
    required: true 
  },
  dayOfWeek: {
    type: Array,
    required: true 
  },
  time: {
    type: String,
    required: true 
  },
}, { timestamps: true })

const Schedule = mongoose.model("Schedule", ScheduleSchema)

module.exports = Schedule