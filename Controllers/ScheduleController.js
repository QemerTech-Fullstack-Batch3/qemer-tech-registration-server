const Schedule = require('../Models/ScheduleModel')
const Course = require('../Models/CourseModel')

const daysOfWeekMap = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};


exports.CreateSchedule = async (req, res) => {
  try {
    const { courseId, startDate, endDate, dayOfWeek, time } = req.body

    const course = await Course.findById(courseId)
    if (!course) return res.status(404).send("Course not found")

    const courseInSchedule = await Schedule.findById(courseId)
    if (courseInSchedule) return res.send("This course already have a schedule.")

    if (!Array.isArray(dayOfWeek) || dayOfWeek.length === 0) {
      return res.status(400).send("At least one day of the week is required");
    }
    if (dayOfWeek.some(day => day < 1 || day > 7)) {
      return res.status(400).send("Invalid dayOfWeek value");
    }

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
exports.GetSchedule = async (req, res) => {
  try {

  } catch (error) {
    console.error("Error fetching schedule: ", error)
    res.status(500).send("An error occured while getting schedule")
  }
}
exports.CreateSchedule = async (req, res) => {
  try {

  } catch (error) {
    console.error("Error creating schedule: ", error)
    res.status(500).send("An error occured while creating schedule")
  }
}