const mongoose = require('mongoose')

const ScheduleSchema = mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true 
  },
  courseName: {
    type: String
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
    type: [Number], 
    required: true,
    enum: [1,2,3,4,5,6,7],
    validate: {
      validator: (value) => {
        return value.length > 0;
      },
      message: 'At least one day of the week must be selected',
    }
  },
  time: {
    type: String,
    required: true,
    match: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/
  }
}, { timestamps: true })

const Schedule = mongoose.model("Schedule", ScheduleSchema)

module.exports = Schedule