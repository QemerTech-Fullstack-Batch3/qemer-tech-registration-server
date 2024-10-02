const express = require('express')
const router = express.Router()

const {
  CreateSchedule,
  GetSchedule,
  GetSchedules,
  GetScheduleOfACourse,
  DeleteScheduleCollection,
  EditSchedule,
  DeleteSchedule
} = require('../Controllers/ScheduleController')

router.post('/createschedule', CreateSchedule)
router.get('/getschedules', GetSchedules)
router.get('/getschedule/:id', GetSchedule)
router.get('/getscheduleofacourse/:id', GetScheduleOfACourse)
router.patch('/updateschedule/:id', EditSchedule)
router.delete('/deleteschedule/:id', DeleteSchedule)
router.delete('/deleteschedulecollection', DeleteScheduleCollection)

module.exports = router 
 