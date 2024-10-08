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
  courseStatus: {
    type: String, 
    enum: ["Active","InActive"],
    default: "Active"
  }, 
  courseRegistrationStatus: {
    type: String,
    enum: ['On Registration', 'On Progress', 'Ended'],
    default: 'On Registration',
    required: true
  },
  learningMode: {
    type: String,
    enum: ["Online","InPerson"],
    required: true
  },
  spotLimit: {
    type: Number,
    required: function() {return this.learningMode === 'InPerson'}
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
  },
}, {timestamps: true})

const Course = mongoose.model("Course", CourseSchema)

module.exports = Course