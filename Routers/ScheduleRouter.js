const express = require('express')
const router = express.Router()

const {
  CreateSchedule,
  GetSchedule
} = require('../Controllers/ScheduleController')

router.post('/createschedule', CreateSchedule)
router.get('/getschedule', GetSchedule)

module.exports = router 
