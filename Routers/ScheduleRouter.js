const express = require('express')
const router = express.Router()

const {
  CreateSchedule,
  GetSchedule,
  GetSchedules,
  GetScheduleOfACourse,
  DeleteScheduleCollection
} = require('../Controllers/ScheduleController')

router.post('/createschedule', CreateSchedule)
router.get('/getschedules', GetSchedules)
router.get('/getschedule/:id', GetSchedule)
router.get('/getscheduleofacourse/:id', GetScheduleOfACourse)
router.delete('/deleteschedulecollection', DeleteScheduleCollection)

module.exports = router 
