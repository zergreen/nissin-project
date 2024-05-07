const mongoose = require('mongoose');

const TimesheetSchema = new mongoose.Schema({
  workType: {
    type: String,
    enum: ['Development', 'Test', 'Document'],
    required: true
  },
  workName: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['executed', 'completed', 'canceled'],
    required: true
  },
  recordedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
});

module.exports = mongoose.model('Timesheet', TimesheetSchema);