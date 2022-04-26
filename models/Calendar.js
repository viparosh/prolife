const mongoose = require('mongoose')

const CalendarSchema = new mongoose.Schema({
  date: {
    type: Date,
    unique: true,
  },
  midWife_schedule: [
    { from: { type: Date }, to: { type: Date }, status: { type: Boolean } },
  ],
  obgyn_schedule: [
    { from: { type: Date }, to: { type: Date }, status: { type: Boolean } },
  ],
})

module.exports =
  mongoose.models.Calendar || mongoose.model('Calendar', CalendarSchema)
