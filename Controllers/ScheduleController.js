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

    // course check
    const courseIdObj = mongoose.Types.ObjectId(courseId);
    const course = await Course.findById(courseIdObj)
    if (!course) return res.status(404).send("Course not found")
    const courseInSchedule = await Schedule.findById(courseId)
    if (courseInSchedule) return res.send("This course already have a schedule.")

    // start and end date check
    const startDateEdit = new Date(startDate)
    const endDateEdit = new Date(endDate)
    if(isNaN(startDateEdit.getTime()) || isNaN(endDateEdit.getTime())){
      return res.status(400).send("Invalid start or end date");
    }
    if (endDate <= startDate) {
      return res.status(400).send("End date must be after start date");
    }
    // dayofweek check
    if (!Array.isArray(dayOfWeek) || dayOfWeek.length === 0) {
      return res.status(400).send("At least one day of the week is required");
    }
    if (dayOfWeek.some(day => day < 1 || day > 7)) {
      return res.status(400).send("Invalid dayOfWeek value");
    }

    // time
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      return res.status(400).send("Invalid time format");
    }
    const schedule = new Schedule({
      courseId: courseIdObj,
      startDate: startDateEdit,
      endDate: endDateEdit,
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
    const schedule = await Schedule.findById(req.params.id);

    // Convert dayOfWeek numbers to strings
    const formattedSchedule = {
      ...schedule.toObject(),
      dayOfWeek: schedule.dayOfWeek.map(dayNumber => daysOfWeekMap[dayNumber]),
    };

    res.status(200).json(formattedSchedule);
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