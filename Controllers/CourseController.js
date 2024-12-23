const Course = require('../Models/CourseModel')
const Registration = require('../Models/RegistrationModel');
const { redisClient } = require('../Middlewares/caching')

const daysOfWeekMap = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

exports.CreateCourse = async (req, res, next) => {
  try {
    if (!["Admin", "SuperAdmin"].includes(req.user.role)) {
      return res.status(403).send("Access denied. Only super admins can perform this action.")
    }

    const { courseName, duration, description, price, courseRegistrationStatus, learningMode, spotLimit, startDate, endDate, dayOfWeek, time } = req.body

    const startDateEdit = new Date(startDate)
    const endDateEdit = new Date(endDate)

    if (isNaN(startDateEdit.getTime()) || isNaN(endDateEdit.getTime())) {
      return res.status(400).send("Invalid start or end date");
    }
    if (endDate <= startDate) {
      return res.status(400).send("End date must be after start date");
    }

    //dayofweek check
    if (!Array.isArray(dayOfWeek) || dayOfWeek.length === 0) {
      return res.status(400).send("At least one day of the week is required");
    }
    if (dayOfWeek.some(day => day < 1 || day > 7)) {
      return res.status(400).send("Invalid dayOfWeek value");
    }

    //time
    let formattedTime = time;
    if (time.length === 5) {
      formattedTime = time + ':00';
    }
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (!timeRegex.test(formattedTime)) {
      return res.status(400).send("Invalid time format");
    }

    //day check 
    const currentDate = new Date()
    let courseRegistrationStatusFormatted;
    if (currentDate > endDateEdit) {
      courseRegistrationStatusFormatted = 'Ended'
    } else if (currentDate >= startDateEdit) {
      courseRegistrationStatusFormatted = 'On Progress'
    } else {
      courseRegistrationStatusFormatted = 'On Registration'
    }

    const courseStatus = courseRegistrationStatusFormatted === "Ended" ? "InActive" : "Active";

    const newCourse = new Course({ courseName, duration, description, price, courseStatus, courseRegistrationStatus: courseRegistrationStatusFormatted, learningMode, spotLimit, startDate: startDateEdit, endDate: endDateEdit, dayOfWeek, time: formattedTime })

    const savedCourse = await newCourse.save()

    res.status(201).send({ course: savedCourse })
  } catch (err) {
    console.log(`\nError handling from API
      msg: Error Creating Course
      `)
    next(err)
  }
}


exports.GetCourses = async (req, res, next) => {
  try {
    const courses = await Course.find()
    const formattedCourses = courses.map((course) => ({
      ...course.toObject(),
      startDate: formatDate(course.startDate),
      endDate: formatDate(course.endDate),
      dayOfWeek: course.dayOfWeek.map((dayNumber) => daysOfWeekMap[dayNumber])
    }))
    if (redisClient.isOpen) {
      await redisClient.setEx('formattedCourses', 3600, JSON.stringify(formattedCourses));
    }
    res.status(200).send({
      message: 'Courses from server',
      course: formattedCourses
    });
  } catch (err) {
    console.log(`\nError handling from API
      msg: Error fetching courses
      `)
    next(err)
  }
}

exports.GetCourseInfo = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send("Course not found.");
    }

    const formattedCourse = {
      ...course.toObject(),
      startDate: formatDate(course.startDate),
      endDate: formatDate(course.endDate),
      dayOfWeek: course.dayOfWeek.map((dayNumber) => daysOfWeekMap[dayNumber])
    };

    // Only cache if Redis is connected
    if (redisClient.isOpen) {
      await redisClient.setEx(courseId, 300, JSON.stringify(formattedCourse));
    }

    res.status(200).send({
      message: 'Course detail from server',
      course: formattedCourse
    });
  } catch (err) {
    console.log(`\nError handling from API
      msg: Error fetching Course detail
      `)
    next(err)
  }
}

exports.EditCourse = async (req, res, next) => {
  try {
    if (!["Admin", "SuperAdmin"].includes(req.user.role)) {
      return res.status(403).send('Access denied. Only Admins and SuperAdmin can perform this action.')
    }
    const { courseName, duration, description, price, courseRegistrationStatus, learningMode, spotLimit, startDate, endDate, dayOfWeek, time } = req.body

    const courseId = req.params.id
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).send("Course not found")
    }

    const startDateEdit = new Date(startDate)
    const endDateEdit = new Date(endDate)

    if (isNaN(startDateEdit.getTime()) || isNaN(endDateEdit.getTime())) {
      return res.status(400).send("Invalid start or end date");
    }
    if (endDate <= startDate) {
      return res.status(400).send("End date must be after start date");
    }

    //dayofweek check
    if (!Array.isArray(dayOfWeek) || dayOfWeek.length === 0) {
      return res.status(400).send("At least one day of the week is required");
    }
    if (dayOfWeek.some(day => day < 1 || day > 7)) {
      return res.status(400).send("Invalid dayOfWeek value");
    }


    //time
    let formattedTime = time;
    if (time.length === 5) {
      formattedTime = time + ':00';
    }
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (!timeRegex.test(formattedTime)) {
      return res.status(400).send("Invalid time format");
    }

    if (time) {
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
      if (!timeRegex.test(time)) {
        return res.status(400).send("Invalid time format");
      }
    }

    const currentDate = new Date()
    let courseRegistrationStatusFormatted;
    if (currentDate > endDateEdit) {
      courseRegistrationStatusFormatted = 'Ended'
    } else if (currentDate >= startDateEdit) {
      courseRegistrationStatusFormatted = 'On Progress'
    } else {
      courseRegistrationStatusFormatted = 'On Registration'
    }

    const courseStatus = courseRegistrationStatusFormatted === "Ended" ? "InActive" : "Active";


    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { courseName, duration, description, price, courseStatus, courseRegistrationStatus: courseRegistrationStatusFormatted, learningMode, spotLimit, startDate: startDateEdit, endDate: endDateEdit, dayOfWeek, time: formattedTime },
      { new: true }
    )

    res.status(200).send(updatedCourse)
  } catch (err) {
    console.log(`\nError handling from API
      msg: Error Updating a Course
      `)
    next(err)
  }
}


exports.UpdateCourseStatus = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found.");
    }

    const currentRegistrations = await Registration.countDocuments({ courseId: courseId });
    const currentDate = new Date();

    if (currentDate > new Date(course.endDate)) {
      await Course.findByIdAndUpdate(courseId, { courseRegistrationStatus: "Ended" }, { new: true });
      return res.send("Course status updated to Ended");
    } else if (currentRegistrations >= course.spotLimit || currentDate >= new Date(course.startDate)) {
      await Course.findByIdAndUpdate(courseId, { courseRegistrationStatus: "On Progress" }, { new: true });
      return res.send("Course status updated to On Progress");
    } else {
      await Course.findByIdAndUpdate(courseId, { courseRegistrationStatus: "On Registration" }, { new: true });
      return res.send("Course status updated to On Registration");
    }
  } catch (err) {
    console.log(`\nError handling from API
      msg: Error while updating course status
      `)
    next(err)
  }
};

exports.DeleteCourseCollection = async (req, res) => {
  try {
    await Course.deleteMany();
    res.status(200).send("Course collection deleted Succesfully.")
  } catch (err) {
    console.error("Error while deleting course collection")
    res.status(501).send("An error occured while deleting course collection.")
  }
}