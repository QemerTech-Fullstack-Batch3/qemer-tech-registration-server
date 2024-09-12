const mongoose = require('mongoose')
const config = require('./keys')
const db = config.mongoURI

const connectDB = async() => {
  try {
    await mongoose.connect(db)
    console.log("Succesfully Conneced!!")
  } catch (error) {
    console.log("It isn't Connected!!")
    process.exit(1)
  }
}
module.exports = connectDB