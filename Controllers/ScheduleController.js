const Schedule = require('../Models/ScheduleModel')
const Course = require('../Models/CourseModel')

exports.CreateSchedule = async (req, res) => {
  try {
    const {courseId, startDate, endDate, dayOfWeek, time} = req.body
    const course = await Course.findById(courseId)
    const courseInSchedule = await Schedule.findById(courseId)

    if(!course) return res.status(404).send("Course not found")
    if(courseInSchedule) return res.send("This course have a schedule already.")
    
    const schedule = new Schedule({
      courseId,
      startDate,
      endDate,
      dayOfWeek,
      time
    })
    await schedule.save()
  } catch (error) {
    console.error("Error creating schedule: ", error)    
    res.status(500).send("An error occured while creating schedule")
  }
}
exports.CreateSchedule = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}
exports.CreateSchedule = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}