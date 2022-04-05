const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please input the required fields'],
      maxlength: [30, 'First Name cannot be more than 30 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Please input the required fields'],
      maxlength: [30, 'Last Name cannot be more than 30 characters'],
    },
    contact: {
      type: Number,
      required: [true, 'Please input the required fields'],
      minlength: [10, 'Phone number must have 10 digits'],
      maxlength: [10, 'Phone number must have 10 digits'],
    },
    address: {
      type: String,
      required: [true, 'Please input the required fields'],
      maxlength: [200, 'Address cannot be more than 200 characters'],
    },
    concern: {
      type: String,
      required: [true, 'Please input the required fields'],
      maxlength: [200, 'Concern cannot be more than 200 characters'],
    },
    time: {
      type: String,
      required: [true, 'Please input the required fields'],
    },
    date: {
      type: Date,
      required: [true, 'Please input the required fields'],
    },
    monthYear: {
      type: String,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

module.exports =
  mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema)
