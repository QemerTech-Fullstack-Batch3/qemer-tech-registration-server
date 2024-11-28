const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression') 
const cors = require('cors')
const connectDB = require('./Config/db')
require("dotenv").config()

const app = express()

app.use(helmet())
morgan.token('host', (req, res) => {
  return req.hostname
})
morgan.token('param', (req, res, param) => {
  return req.params[param]
})
app.use(morgan(':method :host :status :param[id] :res[content-length] - :response-time ms'));
app.use(compression())

app.use(express.json())
app.use(express.json({extended: false}))
app.use(cors())

const PORT = process.env.PORT || 5000

connectDB()

app.use('/user', require('./Routers/AdminRouter'))
app.use('/package', require('./Routers/PackageRouter'))
app.use('/course', require('./Routers/CourseRouter'))
app.use('/registration', require('./Routers/RegistrationRouter'))
// app.use('/payment', require('./Routers/PaymentRouter'))
 
app.listen(PORT, console.log(`Running on port ${PORT}`))