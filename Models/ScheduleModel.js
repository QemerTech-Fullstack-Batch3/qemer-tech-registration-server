const mongoose = require('mongoose')

const ScheduleSchema = mongoose.Schema({
  
}, { timestamps: true })

const Schedule = mongoose.model("Schedule", ScheduleSchema)

module.exports = Schedule