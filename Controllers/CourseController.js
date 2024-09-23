const Course = require('../Models/CourseModel')
const Schedule = require('../Models/ScheduleModel')
const Register = require('../Models/RegistrationModel')

const daysOfWeekMap = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

exports.CreateCourse = async (req, res) => {
  try {
    if(!["Admin","SuperAdmin"].includes(req.user.role)){
      return res.status(403).send("Access denied. Only super admins can perform this action.")
    }
    
    const { courseName, duration, description, price, courseRegistrationStatus, learningMode, spotLimit, schedule } = req.body
    const course = await Course.findOne({courseName})
    if (courseRegistrationStatus === "ended") {
      courseStatus = "InActive"
    } else {
      courseStatus = "Active"
    }

    const newCourse = new Course({ courseName, duration, description, price, courseStatus, courseRegistrationStatus,learningMode, spotLimit })

    // schedule 
    const newSchedule = new Schedule({
      courseId: newCourse._id,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      dayOfWeek: schedule.dayOfWeek,
      time: schedule.time
    })
    const [savedCourse, savedSchedule] = await Promise.all([
      newCourse.save(),
      newSchedule.save()
    ])

    res.status(201).send({ course: savedCourse, schedule: savedSchedule })
  } catch (error) {
    console.error("Error creating course:", error)
    res.status(500).send("An error occured while creating a course")
  }
}
exports.GetCourses = async (req, res) => {
  try {
    const courses = await Course.find()
    res.status(200).send(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    res.status(501).send(error)
  }
}
exports.GetCourseInfo = async (req, res) => {
  try {
    const courseId = req.params.id
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).send("Course not found.")
    }

    const schedule = await Schedule.findOne({ courseId: req.params.id })
    const formattedSchedule = {
      ...schedule.toObject(),
      dayOfWeek: schedule.dayOfWeek.map(dayNumber => daysOfWeekMap[dayNumber]),
    };

    res.status(200).send({ course: course, schedule: formattedSchedule })
  } catch (error) {
    console.error('Error while fetching a specific course:', error)
    res.status(501).send("An error occured while getting a specific course info")
  }
}

exports.EditCourse = async (req, res) => {
  try {
    if (!["Admin","SuperAdmin"].includes(req.user.role)){
      res.status(403).send('Access denied. Only Admins and SuperAdmin can perform this action.')
    }
    const { courseName, duration, description, price, schedule } = req.body
    const courseId = req.params.id
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).send("Course not found")
    }

    const editCourse = await Course.findByIdAndUpdate(
      courseId,
      { courseName, duration, description, price, schedule },
      { new: true }
    )
    res.status(200).send(editCourse)
  } catch (error) {
    console.error("Error while updating a course: ", error)
    res.status(501).send("An error occured updating a course")
  }
}

// exports.DeleteCourse = async (req, res) => {
//   try {
//     const courseId = req.params.id
//     const course = Course.findById(courseId)
//     if (!course) {
//       return res.status(404).send("Course not found")
//     }

//     const schedule = Schedule.findOne({ courseId: req.params.id })
//     if (!schedule) { }
//     await Course.findByIdAndDelete(courseId)
//     await Schedule.deleteMany({ courseId })
//     res.status(200).send("Course Succesfully deleted.")
//   } catch (error) {
//     console.error("Error while deleting a course", error)
//     res.status(501).send("An error occured deleting a course")
//   }
// }

exports.UpdateCourseStatus = async (req, res) => {
  const {courseId} = req.params
  try {
    if(!["Admin","SuperAdmin"].includes(req.user.role)){
      return res.status(403).send("Access denied. Only admins can perform this action.")
    }
    const course = await Course.findById(courseId)
    if(!course){
      return res.status(404).send("Course not found.")
    }
    const currentRegistrations = await Register.countDocuments({courseId})
    // if (currentRegistrations >= course.spotLimit){
    //   return res.status(400).send("The course has reached its spot limit. No more students can register.")
    // }
    if (currentRegistrations >= course.spotLimit) {
      await Course.findByIdAndUpdate(courseId, { courseRegistrationStatus: "OnProgress" }, { new: true });
      return res.send("Course status updated to OnProgress");
    }
    res.send("Course status remain unchanged")
  } catch (error) {
    console.error("Error while updating course status", error)
    res.status(501).send("An error occured updating a course status")
  }
}

exports.DeleteCourseCollection = async (req, res) => {
  try {
    await Course.deleteMany();
    res.status(200).send("Course collection deleted Succesfully.")
  } catch (error) {
    console.error("Error while deleting course collection")
    res.status(501).send("An error occured while deleting course collection.")
  }
}