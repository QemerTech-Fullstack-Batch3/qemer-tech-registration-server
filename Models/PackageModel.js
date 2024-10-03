const mongoose = require('mongoose')

const PackageSchema = mongoose.Schema({
  packageName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }]
}, {timestamps: true})

const Package = mongoose.model('Package', PackageSchema)

module.exports = Package