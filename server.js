const express = require('express')
const cors = require('cors')
const connectDB = require('./Config/db')
require("dotenv").config()
const app = express()

const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(express.json({extended: false}))
app.use(cors())

connectDB()

// app.use('/user', require('./Routers/UserRouter'))
app.use('/course', require('./Routers/CourseRouter'))
app.use('/registration', require('./Routers/RegistrationRouter'))
// app.use('/schedule', require('./Routers/ScheduleRouter'))
// app.use('/payment', require('./Routers/PaymentRouter'))

app.listen(PORT, console.log(`Running on port ${PORT}`))